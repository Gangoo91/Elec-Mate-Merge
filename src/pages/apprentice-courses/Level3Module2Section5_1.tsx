/**
 * Level 3 Module 2 Section 5.1
 * Connection to Consumer Units & Distribution Boards
 *
 * Design follows: Level3ContentTemplate.tsx
 * Mobile optimised with touch targets and dark theme
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Connection to Consumer Units & Distribution Boards - Level 3 Module 2 Section 5.1";
const DESCRIPTION = "Understanding how to integrate renewable energy systems with consumer units and distribution boards, including connection methods and protection requirements.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "When connecting a PV inverter to a consumer unit, where should the dedicated circuit be positioned?",
    options: [
      "At the top of the busbar, nearest the main switch",
      "At the bottom of the busbar, furthest from the main switch",
      "Next to the cooker circuit",
      "On a separate sub-board only"
    ],
    correctIndex: 1,
    explanation: "The inverter circuit should connect furthest from the main switch. This ensures generation feeds through all other MCBs first, minimising the busbar section carrying both grid and generated current."
  },
  {
    id: "check-2",
    question: "What is the purpose of a dedicated AC isolator between an inverter and the consumer unit?",
    options: [
      "To reduce harmonics in the system",
      "To provide a visible isolation point for safe maintenance",
      "To limit the export to the grid",
      "To prevent reverse current flow at night"
    ],
    correctIndex: 1,
    explanation: "The AC isolator provides a clear, accessible isolation point. This allows safe maintenance work on both the inverter and the AC wiring without needing to operate the main switch."
  },
  {
    id: "check-3",
    question: "For a three-phase property with single-phase PV, which connection arrangement helps balance generation across phases?",
    options: [
      "Connect all generation to L1 only",
      "Use a three-phase inverter regardless of array size",
      "Consider the existing load distribution when choosing the connection phase",
      "Always connect to the phase with lowest voltage"
    ],
    correctIndex: 2,
    explanation: "Connecting generation to the phase with highest existing load helps balance the overall system. This reduces neutral current and improves efficiency across the three-phase supply."
  },
  {
    id: "check-4",
    question: "What documentation must be completed when connecting generation to an existing consumer unit?",
    options: [
      "Minor works certificate only",
      "Electrical Installation Certificate with Schedule of Test Results",
      "Building regulations notification only",
      "DNO notification only"
    ],
    correctIndex: 1,
    explanation: "An Electrical Installation Certificate with full Schedule of Test Results is required. This documents the new circuit, proves compliance with BS 7671, and forms part of the MCS documentation."
  }
];

// ============================================
// QUIZ QUESTIONS (10 minimum)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the maximum prospective fault current consideration when connecting generation to a consumer unit?",
    options: [
      "The PFC must not exceed the consumer unit's rated fault level",
      "Only the grid PFC matters, generation doesn't contribute",
      "Generation reduces the overall PFC so it's always safer",
      "PFC is only relevant for commercial installations"
    ],
    correctAnswer: 0,
    explanation: "Both grid supply and local generation can contribute to fault current. The combined prospective fault current must not exceed the consumer unit's rated fault level, typically 10kA for domestic boards."
  },
  {
    id: 2,
    question: "When installing a dedicated circuit for a PV inverter, what is the minimum recommended cable size for a typical 4kW domestic system?",
    options: [
      "1.0mm² twin and earth",
      "1.5mm² twin and earth",
      "2.5mm² twin and earth",
      "4.0mm² twin and earth"
    ],
    correctAnswer: 2,
    explanation: "2.5mm² is typically used for up to 5kW systems on a 20A or 25A MCB. This provides adequate current-carrying capacity and acceptable volt drop for the expected cable run lengths."
  },
  {
    id: 3,
    question: "Why is a Type B RCBO often preferred for inverter circuits rather than a Type A?",
    options: [
      "Type B is cheaper than Type A",
      "Type A cannot detect DC fault components that inverters may produce",
      "Type B trips faster than Type A",
      "Type A is not suitable for outdoor use"
    ],
    correctAnswer: 1,
    explanation: "Some inverters can produce DC fault components during certain fault conditions. Type A RCDs only detect AC and pulsating DC, while Type B can detect smooth DC components, providing more comprehensive protection."
  },
  {
    id: 4,
    question: "What is the significance of the '712' requirements in BS 7671 for PV installations?",
    options: [
      "It specifies maximum array voltages only",
      "It contains specific requirements for solar PV electrical installations",
      "It applies only to commercial PV systems",
      "It covers battery storage but not PV"
    ],
    correctAnswer: 1,
    explanation: "Section 712 of BS 7671 contains specific requirements for photovoltaic power supply systems. This includes isolation, protection, and installation requirements that supplement the general regulations."
  },
  {
    id: 5,
    question: "When connecting a battery storage system to an existing installation, what additional consideration applies to the switchgear?",
    options: [
      "The switchgear must be IP68 rated",
      "All circuits must be on RCBOs",
      "The isolation arrangements must disconnect all sources of supply",
      "Only DC rated switches are acceptable"
    ],
    correctAnswer: 2,
    explanation: "With battery storage, isolation becomes more complex as there are multiple supply sources. The main switch must isolate all supplies, and clear labelling is essential so anyone isolating knows about all energy sources."
  },
  {
    id: 6,
    question: "What labelling is required at the consumer unit when generation is connected?",
    options: [
      "No additional labelling is required",
      "Warning labels indicating dual supply and isolation locations",
      "The inverter make and model only",
      "The system owner's contact details"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires warning labels at the consumer unit indicating that multiple sources of supply are present. Labels must identify isolation point locations so anyone working on the installation can safely isolate all supplies."
  },
  {
    id: 7,
    question: "For a heat pump installation, what determines whether it connects to the consumer unit or requires a separate supply?",
    options: [
      "The heat pump colour",
      "The available spare ways and supply capacity",
      "Heat pumps always need a separate supply",
      "The property's EPC rating"
    ],
    correctAnswer: 1,
    explanation: "Heat pump connection depends on the existing supply capacity and consumer unit space. Smaller units may connect to the existing board, but larger units (especially three-phase) often require supply upgrades and dedicated distribution."
  },
  {
    id: 8,
    question: "What is the purpose of an Energy CT clamp typically installed at the meter tails?",
    options: [
      "To measure earth fault current",
      "To monitor grid import/export for smart systems and battery management",
      "To limit maximum current draw",
      "To provide surge protection"
    ],
    correctAnswer: 1,
    explanation: "Current transformer clamps monitor power flow direction and magnitude. This data enables smart inverters and batteries to manage export, maximise self-consumption, and comply with export limitations."
  },
  {
    id: 9,
    question: "When should a separate distribution board be considered for renewable systems instead of adding to the existing consumer unit?",
    options: [
      "Never, always use the existing board",
      "When installing solar panels over 1kW",
      "When the existing board lacks space or adequate fault rating, or for larger systems",
      "Only for commercial properties"
    ],
    correctAnswer: 2,
    explanation: "A separate board may be needed if the existing unit lacks spare ways, has inadequate fault rating, or for larger/more complex systems. This can also simplify isolation and future maintenance."
  },
  {
    id: 10,
    question: "What protection is required between an EV charger and the consumer unit in a typical domestic installation?",
    options: [
      "Type AC RCD and MCB",
      "MCB only, no RCD required",
      "Type A RCD minimum, Type B often recommended due to DC components",
      "Fuse only is acceptable"
    ],
    correctAnswer: 2,
    explanation: "EV chargers can produce DC fault components during charging. A Type A RCD is the minimum requirement, but Type B is often recommended. Many chargers have built-in DC protection allowing Type A RCDs."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I connect a PV inverter to any spare way in the consumer unit?",
    answer: "The inverter should connect to a dedicated circuit, ideally positioned furthest from the main switch on the busbar. This minimises the section of busbar carrying combined grid and generated current. The circuit must be protected by an appropriately rated MCB or RCBO, and the board's fault rating must accommodate the installation."
  },
  {
    question: "Do I need to upgrade the consumer unit when adding solar PV?",
    answer: "Not always. If the existing board has adequate spare ways, correct fault rating, and complies with current regulations (particularly regarding RCD protection), you can add to it. However, older boards may need upgrading, and you must assess whether the board meets Amendment 2 requirements for the new circuit."
  },
  {
    question: "Why does my inverter need its own dedicated isolator as well as the MCB?",
    answer: "The dedicated AC isolator provides a visible means of isolation specifically for the inverter circuit. This allows maintenance without operating the main switch, keeping other circuits live. It's typically located adjacent to the inverter for clear identification and accessibility."
  },
  {
    question: "What happens if the grid fails - will my solar still work?",
    answer: "Standard grid-tied inverters include anti-islanding protection and will shut down within milliseconds of grid failure. This is a safety requirement to protect network workers. Battery hybrid systems can provide backup power during outages if specifically designed and installed for this purpose."
  },
  {
    question: "Can a single consumer unit have both import and export connections?",
    answer: "Yes. The consumer unit connects to the grid supply as normal for import. Export from generation feeds through the same connection point but in the opposite direction. The metering arrangement (often smart meter) measures bidirectional flow to record both import and export."
  },
  {
    question: "How do I know if the existing supply can handle added generation or loads like heat pumps?",
    answer: "Check the incoming supply capacity with the DNO if unsure. For standard domestic supplies, 100A is typical. Calculate total maximum demand including new equipment. If demand exceeds supply capacity, a supply upgrade through the DNO may be necessary before installation."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section5_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* ========================================
          STICKY HEADER
          ======================================== */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* ========================================
          MAIN ARTICLE CONTENT
          ======================================== */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Connection to Consumer Units & Distribution Boards
          </h1>
          <p className="text-white/80">
            Integrating renewable technologies with existing electrical distribution systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Position:</strong> Connect generation furthest from main switch on busbar</li>
              <li><strong>Protection:</strong> Dedicated MCB/RCBO, consider Type B for inverters</li>
              <li><strong>Isolation:</strong> AC isolator provides visible maintenance point</li>
              <li><strong>Labelling:</strong> Warn of multiple supplies, mark isolation locations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Warning labels at consumer units with generation</li>
              <li><strong>Use:</strong> Check board fault rating before adding circuits</li>
              <li><strong>Apply:</strong> Install CT clamps for smart energy management</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Correct connection positions for generation on busbars",
              "Protection device selection for inverter circuits",
              "Isolation requirements for renewable systems",
              "Labelling requirements under BS 7671",
              "When to upgrade or add distribution boards",
              "Integration of monitoring equipment like CT clamps"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Connection Principles for Generation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When connecting any generation source to a consumer unit, the fundamental principle is about managing current flow through the busbar. Unlike standard circuits that only draw current from the supply, generation feeds current into the system, creating bidirectional flow that must be carefully managed.
            </p>

            <p>
              The key reason for connecting generation furthest from the main switch is busbar loading. Current from the grid enters through the main switch and flows along the busbar. If generation connects near this point, the busbar section between them carries both grid current and generated current travelling in opposite directions. By positioning generation at the far end, current flows from generation through each circuit's MCB before reaching the main switch, reducing stress on any single busbar section.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Connection Considerations:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Busbar continuous current rating versus combined currents</li>
                <li>Fault level rating of the consumer unit (typically 10kA domestic)</li>
                <li>Available spare ways and physical space</li>
                <li>Grouping of circuits for RCD protection</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Always verify the consumer unit's fault rating can handle the installation. Generation contributes to prospective fault current, and older boards may not meet current standards.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Protection Device Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the correct protection for generation circuits requires understanding both the electrical characteristics of the generation equipment and the specific requirements of BS 7671 Section 712 for PV systems and other relevant sections for different technologies.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Standard Protection (Type A RCD)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Detects AC fault currents</li>
                  <li>Detects pulsating DC up to 6mA</li>
                  <li>Suitable where inverter provides DC fault protection</li>
                  <li>Lower cost option</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Enhanced Protection (Type B RCD)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Detects smooth DC fault currents</li>
                  <li>Required where DC components possible</li>
                  <li>Recommended for transformerless inverters</li>
                  <li>Higher cost but more comprehensive</li>
                </ul>
              </div>
            </div>

            <p>
              The MCB or RCBO rating must suit the cable size and inverter output. A typical 4kW domestic PV system with 2.5mm² cable uses a 20A or 25A device. The breaking capacity must meet or exceed the prospective fault current at that point in the installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Isolation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective isolation is critical for any installation with generation. Unlike a standard installation where turning off the main switch removes all power, a property with generation has multiple potential energy sources. Safe isolation must address all of them.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Required Isolation Points:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Main switch:</strong> Isolates grid supply from the installation</li>
                <li><strong>DC isolator (PV):</strong> Isolates the array from the inverter</li>
                <li><strong>AC isolator:</strong> Isolates inverter output from the consumer unit</li>
                <li><strong>Battery isolator:</strong> Isolates battery bank from hybrid inverter</li>
              </ul>
            </div>

            <p>
              The AC isolator should be installed adjacent to the inverter, providing a visible break point. This allows maintenance on the inverter AC connections without needing to operate the main switch, keeping other circuits in the property live. For external inverters, the isolator must be suitable for the environmental conditions.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A solar installer needs to replace an inverter. They isolate the DC side using the array isolator, then the AC side using the dedicated isolator near the inverter. The property's other circuits remain energised, so the occupants aren't disrupted.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Labelling and Warning Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 requires specific labelling wherever generation connects to an installation. This isn't bureaucracy - it's about ensuring anyone who works on the installation in future understands the risks and can isolate all supplies safely.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Consumer Unit</p>
                <p className="text-white/90 text-xs">Warning of dual supply, isolation point locations</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Meter Point</p>
                <p className="text-white/90 text-xs">Warning that isolating meter doesn't isolate all supplies</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Inverter Location</p>
                <p className="text-white/90 text-xs">Identification of DC and AC isolation points</p>
              </div>
            </div>

            <p>
              Labels must be durable and legible - self-adhesive labels that fade or peel don't meet requirements. Use proper electrical warning labels that will remain readable for the life of the installation. The wording must clearly state the presence of multiple supplies and where to find all isolation points.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Future workers may include emergency services or other trades. Labels must be clear to anyone, not just electricians familiar with renewable systems.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Installing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Survey the existing consumer unit before ordering materials</li>
                <li>Verify fault level rating and available spare ways</li>
                <li>Plan cable route for generation circuit to far end of busbar</li>
                <li>Allow space for CT clamps at meter tails if smart monitoring needed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Fault Finding</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always isolate both grid and generation before working in consumer unit</li>
                <li>Check for voltage at inverter terminals even with main switch off</li>
                <li>Verify anti-islanding protection operates within required time</li>
                <li>Test RCD operation on generation circuits annually</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Connecting generation on first spare way</strong> - This maximises busbar stress</li>
                <li><strong>Omitting AC isolator</strong> - Creates maintenance safety issues</li>
                <li><strong>Using Type AC RCDs</strong> - Cannot detect DC components from inverters</li>
                <li><strong>Missing warning labels</strong> - Non-compliant and dangerous for future workers</li>
              </ul>
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

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Connection Position</p>
                <ul className="space-y-0.5">
                  <li>Generation: furthest from main switch</li>
                  <li>Purpose: minimise busbar stress</li>
                  <li>Current flows through other MCBs first</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Protection Selection</p>
                <ul className="space-y-0.5">
                  <li>Type A RCD: minimum for most inverters</li>
                  <li>Type B RCD: where DC faults possible</li>
                  <li>MCB rating: match cable and load</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section5-2">
              Next: Exporting to Grid
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section5_1;
