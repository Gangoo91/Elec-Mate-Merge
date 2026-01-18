/**
 * Level 3 Module 1 Section 3.4 - Earthing and Bonding in Temporary Works
 *
 * Covers: Earthing systems, protective bonding, temporary installations, construction site requirements
 * Following Level3ContentTemplate.tsx design pattern
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
const TITLE = "Earthing and Bonding in Temporary Works - Level 3 Module 1 Section 3.4";
const DESCRIPTION = "Learn about earthing systems, protective bonding, and specific requirements for temporary electrical installations on construction sites and events.";

// ============================================
// INLINE CHECK QUESTIONS (4 per page)
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Why is earthing particularly critical in temporary installations?",
    options: [
      "It looks more professional",
      "Higher risk of damage, wet conditions, and less robust connections make fault currents more likely",
      "It's only required for permanent installations",
      "Temporary installations don't need earthing"
    ],
    correctIndex: 1,
    explanation: "Temporary installations face harsher conditions: exposure to weather, mechanical damage, frequent connections/disconnections, and use by multiple workers. These factors increase the risk of faults occurring and earth connections becoming compromised. Robust earthing is therefore even more critical."
  },
  {
    id: "check-2",
    question: "What is the purpose of protective bonding in a temporary installation?",
    options: [
      "To make the installation look tidy",
      "To ensure all metalwork is at the same potential, preventing touch voltages during faults",
      "To improve power factor",
      "To reduce electricity bills"
    ],
    correctIndex: 1,
    explanation: "Protective bonding connects exposed conductive parts (like scaffolding) to ensure they are at the same potential as earth. If a fault energises metalwork, bonding limits the voltage difference you could experience when touching both the faulty part and earth simultaneously."
  },
  {
    id: "check-3",
    question: "On a construction site, what additional protection is typically required alongside earthing?",
    options: [
      "Nothing additional is needed",
      "RCD protection, typically 30mA for socket outlets and hand-held equipment",
      "Only MCB protection",
      "Fuses only"
    ],
    correctIndex: 1,
    explanation: "Construction sites require additional RCD protection - typically 30mA for socket outlets and hand-held equipment. This provides backup protection if earthing is compromised. RCDs detect earth leakage current and disconnect within milliseconds."
  },
  {
    id: "check-4",
    question: "A temporary distribution board is being set up on a building site. What earth electrode resistance should you aim for?",
    options: [
      "Any value is acceptable",
      "As low as reasonably practicable, typically below 200 ohms and often much lower",
      "Exactly 100 ohms",
      "Earth electrodes aren't needed on construction sites"
    ],
    correctIndex: 1,
    explanation: "Earth electrode resistance should be as low as practicable. While BS 7671 allows up to 200 ohms in some circumstances, lower is better for effective fault current flow. On TT systems (common on construction sites), resistance affects RCD operation and should typically be well below 200 ohms."
  }
];

// ============================================
// QUIZ QUESTIONS (10 questions)
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What earthing system is most commonly used for temporary construction site supplies?",
    options: [
      "TN-S with supplier's earth",
      "TN-C-S (PME) from the supplier",
      "TT system with local earth electrode",
      "IT system with no earth"
    ],
    correctAnswer: 2,
    explanation: "TT systems with local earth electrodes are most common for temporary construction supplies. The DNO often won't provide a PME earth for temporary supplies due to risks if the PEN conductor is damaged. A local earth electrode combined with RCD protection provides the necessary safety."
  },
  {
    id: 2,
    question: "What minimum CSA (cross-sectional area) is typically required for the main protective bonding conductor on a site?",
    options: [
      "1.5mm2",
      "2.5mm2",
      "6mm2",
      "10mm2 minimum, or in accordance with BS 7671 Table 54.8"
    ],
    correctAnswer: 3,
    explanation: "Main protective bonding conductors must be sized according to BS 7671 Table 54.8, with a minimum of 6mm2 for copper (10mm2 in many practical applications). They must be capable of carrying prospective fault current for the required disconnection time."
  },
  {
    id: 3,
    question: "When should you test the earth electrode resistance on a temporary installation?",
    options: [
      "Only once when first installed",
      "Before energisation, periodically during use, and after any disturbance to the electrode",
      "Never, it's self-checking",
      "Only when there's a fault"
    ],
    correctAnswer: 1,
    explanation: "Earth electrode resistance should be tested before first energisation, periodically during use (soil conditions change with weather), and after any work near the electrode or disturbance. This ensures the earthing system remains effective throughout the installation's life."
  },
  {
    id: 4,
    question: "What colour is the earth conductor in a flexible cable?",
    options: [
      "Brown",
      "Blue",
      "Green and yellow striped",
      "Black"
    ],
    correctAnswer: 2,
    explanation: "The protective conductor (earth) is identified by green and yellow stripes in accordance with BS 7671. This colour coding is mandatory and helps identify conductors correctly during installation, maintenance, and fault-finding."
  },
  {
    id: 5,
    question: "A scaffold structure is within arm's reach of a temporary distribution board. What should be done?",
    options: [
      "Nothing, scaffolds don't need earthing",
      "The scaffold should be bonded to the protective system (supplementary bonding)",
      "Move the distribution board only",
      "Use wooden planks to separate them"
    ],
    correctAnswer: 1,
    explanation: "Scaffolding and other conductive structures within arm's reach of electrical equipment should be supplementary bonded to the protective system. This ensures both are at the same potential, preventing dangerous touch voltages if a fault occurs."
  },
  {
    id: 6,
    question: "Why might a PME (TN-C-S) earth not be provided for a temporary construction supply?",
    options: [
      "It costs more",
      "Risk of dangerous voltages on metalwork if the PEN conductor is damaged during construction activities",
      "It's not powerful enough",
      "PME systems don't exist"
    ],
    correctAnswer: 1,
    explanation: "PME systems rely on the combined PEN conductor for earthing. If this conductor is broken (possible during construction activities), dangerous voltages can appear on all bonded metalwork. DNOs typically don't provide PME earths for temporary supplies to avoid this risk."
  },
  {
    id: 7,
    question: "What is the maximum disconnection time for a 230V circuit in a TT system?",
    options: [
      "5 seconds",
      "0.4 seconds",
      "0.2 seconds",
      "No time limit"
    ],
    correctAnswer: 1,
    explanation: "For TT systems at 230V, the maximum disconnection time is 0.2 seconds for circuits up to 32A (per BS 7671 Table 41.1). This requires RCD protection as overcurrent devices alone typically cannot achieve this speed with TT earth loop impedances."
  },
  {
    id: 8,
    question: "An extension lead for a power tool on site has a damaged earth conductor inside. What is the risk?",
    options: [
      "No risk if the tool is Class II",
      "The tool case could become live and not trip the protection",
      "It will use more electricity",
      "The cable will overheat"
    ],
    correctAnswer: 1,
    explanation: "If the earth conductor is damaged and the tool has a Class I construction, a fault to the metal case would energise it without tripping the protection. Anyone touching the tool could receive a fatal shock. This is why earth continuity must be verified."
  },
  {
    id: 9,
    question: "What is the purpose of an earth electrode on a TT construction site supply?",
    options: [
      "To improve voltage stability",
      "To provide a path for fault current to return to the source via the earth",
      "To reduce electricity costs",
      "Just for testing purposes"
    ],
    correctAnswer: 1,
    explanation: "In a TT system, fault current returns to the source through the general mass of earth (soil). The earth electrode provides the connection point to earth for the installation's protective system. This path, combined with RCD protection, ensures faults are cleared quickly."
  },
  {
    id: 10,
    question: "What test should be performed to verify the integrity of protective conductors in a temporary installation?",
    options: [
      "Insulation resistance only",
      "Continuity of protective conductors (R1+R2 or Ring continuity)",
      "Voltage drop test only",
      "Visual inspection only"
    ],
    correctAnswer: 1,
    explanation: "Continuity testing of protective conductors verifies that earth paths are intact and have acceptably low resistance. This ensures fault current can flow and protective devices will operate. Test both at the origin and at the furthest points of circuits."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I use the site's metal water pipe as an earth electrode?",
    answer: "No. Metal water pipes are no longer reliable as earth electrodes because much pipework is now plastic. Additionally, using someone else's services as your earth creates risks and may not comply with regulations. Install a proper earth electrode (rod, plate, or foundation electrode) for temporary supplies."
  },
  {
    question: "How deep should an earth rod be driven?",
    answer: "Earth rods should be driven until satisfactory resistance is achieved (typically below 200 ohms for TT systems with 30mA RCDs). This often requires 2-3 metres depth, but varies significantly with soil type. In rocky or dry conditions, multiple rods or different electrode types may be needed. Always test after installation."
  },
  {
    question: "Do temporary installations need periodic inspection and testing?",
    answer: "Yes. BS 7671 requires periodic inspection at intervals not exceeding 3 months for construction site installations. This should include visual inspection and relevant testing. The harsh environment and frequent changes on sites mean problems develop quickly."
  },
  {
    question: "What if I can't achieve acceptable earth electrode resistance?",
    answer: "Options include: multiple earth rods connected in parallel, using a different electrode type (plate, foundation), treating the soil with bentonite or similar, or relocating to better soil. Do NOT simply accept inadequate resistance - it compromises safety. Consult with the DNO if problems persist."
  },
  {
    question: "Is supplementary bonding always required on construction sites?",
    answer: "Supplementary bonding should be provided where simultaneously accessible metalwork (like scaffolding and electrical equipment) creates a shock risk. BS 7671 Section 704 (construction sites) requires bonding where 30mA RCD protection isn't provided, but good practice often includes it regardless."
  },
  {
    question: "How do I know if a temporary supply is TT or TN system?",
    answer: "Check with the DNO or supply provider. For builder's temporary supplies, TT is most common (local earth electrode). If there's a connection to the supply cable's earth/sheath, it may be TN-S. The system type determines testing requirements and protection coordination. Never assume - verify."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module1Section3_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

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
            <Link to="/study-centre/apprentice/level3-module1-section3">
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

        {/* ----------------------------------------
            HEADER
            ---------------------------------------- */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1 Section 3.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Earthing and Bonding in Temporary Works
          </h1>
          <p className="text-white/80">
            Ensuring fault protection in construction sites and temporary installations
          </p>
        </header>

        {/* ----------------------------------------
            QUICK SUMMARY BOXES
            ---------------------------------------- */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>TT systems:</strong> Most common for temp supplies - local earth electrode required</li>
              <li><strong>RCDs:</strong> Essential backup - 30mA for socket outlets and hand-held tools</li>
              <li><strong>Bonding:</strong> Connect scaffolding and metalwork to protective system</li>
              <li><strong>Testing:</strong> Earth electrode and continuity before use, regular checks</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Earth electrode location, bonding connections, RCD labels</li>
              <li><strong>Use:</strong> Earth loop tester, continuity tester, RCD tester</li>
              <li><strong>Check:</strong> Green/yellow conductors intact, connections tight, RCDs trip</li>
            </ul>
          </div>
        </div>

        {/* ----------------------------------------
            LEARNING OUTCOMES
            ---------------------------------------- */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand earthing systems used in temporary installations",
              "Explain why TT systems are common for construction sites",
              "Apply supplementary bonding requirements",
              "Test earth electrode resistance and continuity",
              "Coordinate earthing with RCD protection",
              "Identify common earthing problems in temporary works"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* ----------------------------------------
            CONTENT SECTION 01
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Why Earthing Matters More in Temporary Works
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Temporary installations face unique challenges that make earthing even more critical than in permanent installations. Construction sites are harsh environments: cables get damaged, connections are made and remade, equipment is dragged across wet and rough surfaces, and multiple trades work in close proximity.
            </p>
            <p>
              The purpose of earthing remains the same - to provide a low-impedance path for fault current so protective devices can operate quickly. But in temporary installations, faults are more likely to occur, and the consequences of inadequate earthing are potentially more severe.
            </p>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Higher Risk Factors:</p>
              <ul className="text-sm text-white/90 space-y-1">
                <li>Mechanical damage to cables from construction activities</li>
                <li>Wet conditions increasing earth leakage and shock risk</li>
                <li>Frequent connection/disconnection loosening terminals</li>
                <li>Use by non-electrical workers who may misuse equipment</li>
                <li>Temporary earth connections may deteriorate over time</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Principle:</strong> Because faults are more likely in temporary works, the earthing system must be robust and regularly verified. Never assume - always test.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* ----------------------------------------
            CONTENT SECTION 02
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Earthing Systems for Temporary Supplies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Most temporary construction site supplies use TT earthing - where the installation has its own earth electrode rather than relying on the supplier's earth. This is because Distribution Network Operators (DNOs) typically won't provide a PME earth for temporary supplies.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">TT System (Most Common)</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>Local earth electrode (rod, plate, etc.)</li>
                  <li>Fault current returns via general mass of earth</li>
                  <li>Higher earth impedance than TN systems</li>
                  <li>RCD protection essential for fast disconnection</li>
                  <li>Earth electrode resistance must be tested</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Why Not PME (TN-C-S)?</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>PEN conductor could be damaged by excavation</li>
                  <li>If broken, dangerous voltages appear on metalwork</li>
                  <li>Construction activities create high risk of cable damage</li>
                  <li>DNOs typically refuse PME for temporary supplies</li>
                  <li>TT with RCDs is safer in this environment</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
              <p className="text-sm font-medium text-elec-yellow mb-2">Earth Electrodes</p>
              <p className="text-sm text-white/90">
                Common types include earth rods (driven into soil), earth plates (buried), and foundation electrodes (concrete-encased). Earth rods are most practical for temporary installations. Drive until acceptable resistance is achieved - soil type greatly affects results. In poor soil, multiple rods connected in parallel may be needed.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Trade Tip:</strong> Always test earth electrode resistance before energising and periodically throughout the installation's life. Soil conditions change with weather - an electrode that tested fine in summer may have higher resistance after a dry spell.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* ----------------------------------------
            CONTENT SECTION 03
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Protective Bonding on Site
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Protective bonding connects metalwork to the installation's protective system to ensure everything is at the same potential. This is crucial on construction sites where workers touch scaffolding while using electrical equipment - if the scaffold and the tool case are at different potentials during a fault, the worker becomes the path between them.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Main Protective Bonding</p>
                <p className="text-sm text-white/90">
                  Connects main services (water, gas where metallic) and structural metalwork to the main earthing terminal. On construction sites, this includes the main metalwork of the installation and any services entering the distribution area. Minimum 10mm2 copper conductor typically required.
                </p>
              </div>

              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Supplementary Bonding</p>
                <p className="text-sm text-white/90">
                  Connects simultaneously accessible metalwork within arm's reach. On construction sites, scaffold poles near electrical equipment, metal work platforms, and structural steelwork may need supplementary bonding. Uses 4mm2 minimum conductor if mechanically protected.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-red-500/10 border border-red-500/20">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Scenario:</p>
              <p className="text-sm text-white/90">
                A worker stands on steel scaffolding while drilling with a Class I power tool. A fault develops in the drill, energising its metal case. Without bonding, the scaffold is at earth potential while the drill case is at mains potential. The worker, touching both, becomes the fault path. With proper bonding, scaffold and drill case rise to the same potential - no current flows through the worker.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Bonding doesn't prevent faults - it limits the voltage difference between touchable surfaces during a fault. Combined with RCDs, it provides effective protection.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* ----------------------------------------
            CONTENT SECTION 04
            ---------------------------------------- */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            RCD Protection and Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              In TT systems, RCD protection is essential because the earth loop impedance is typically too high for overcurrent devices alone to provide fast disconnection. BS 7671 requires 0.2 second disconnection for 230V circuits - this is only achievable with RCDs when using earth electrodes.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">30mA RCDs (Required)</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>All socket outlets up to 32A</li>
                  <li>All circuits supplying hand-held equipment</li>
                  <li>Provides additional shock protection</li>
                  <li>Must trip test regularly (quarterly minimum)</li>
                </ul>
              </div>
              <div className="p-4 rounded bg-white/5">
                <p className="text-sm font-medium text-elec-yellow mb-2">Time-Delayed RCDs</p>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>100mA or 300mA at origin for fire protection</li>
                  <li>Time delay allows downstream 30mA to trip first</li>
                  <li>Provides discrimination (selective tripping)</li>
                  <li>Prevents total loss of supply for single fault</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded bg-white/5 border-l-2 border-elec-yellow">
              <p className="text-sm font-medium text-elec-yellow mb-2">Earth Electrode and RCD Coordination</p>
              <p className="text-sm text-white/90">
                For a 30mA RCD to provide shock protection, the earth electrode resistance should ensure the touch voltage doesn't exceed 50V. The formula Ra x Ia less than or equal to 50V gives Ra less than or equal to 1667 ohms for a 30mA RCD. In practice, much lower values are desirable for reliable operation under all conditions.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Trade Tip:</strong> Test RCDs at every inspection. Press the test button quarterly at minimum. Perform instrument tests (at various percentages of rated current) at formal inspection intervals. RCDs can fail - a failed RCD with a high-impedance earth leaves users unprotected.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* ----------------------------------------
            PRACTICAL GUIDANCE
            ---------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Setting Up a Temporary Supply</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>1. Determine earthing system type (usually TT for temp supplies)</li>
                <li>2. Install earth electrode - drive rod until resistance is acceptable</li>
                <li>3. Test earth electrode resistance (aim for less than 200 ohms, lower better)</li>
                <li>4. Install main earthing terminal and bonding conductors</li>
                <li>5. Connect main protective bonding to metalwork</li>
                <li>6. Verify protective conductor continuity throughout</li>
                <li>7. Install RCDs - 30mA for final circuits, time-delayed at origin</li>
                <li>8. Test RCD operation before energising</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Points</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Earth electrode secure and connections tight</li>
                <li>All bonding conductors in place and unbroken</li>
                <li>Green/yellow conductors visible in all flexible cables</li>
                <li>No bare earth conductors where they could contact live parts</li>
                <li>RCDs labeled and test buttons functional</li>
                <li>Extension leads and adaptors in good condition</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Problems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Damaged extension leads</strong> - earth conductors break before line/neutral</li>
                <li><strong>Loose connections</strong> - vibration and handling loosen terminals</li>
                <li><strong>Corroded electrodes</strong> - buried connections deteriorate</li>
                <li><strong>Removed bonding</strong> - trades remove bonds for access and don't replace</li>
                <li><strong>RCDs bypassed</strong> - nuisance tripping leads to dangerous modifications</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            FAQs
            ---------------------------------------- */}
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

        {/* ----------------------------------------
            QUICK REFERENCE
            ---------------------------------------- */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Temporary Earthing</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">TT System Essentials</p>
                <ul className="space-y-0.5">
                  <li>Local earth electrode (rod/plate)</li>
                  <li>Test resistance before energising</li>
                  <li>RCDs essential (30mA for sockets)</li>
                  <li>Maximum 200 ohms (lower better)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Bonding Requirements</p>
                <ul className="space-y-0.5">
                  <li>Main bonding: 10mm2 minimum</li>
                  <li>Supplementary: 4mm2 if protected</li>
                  <li>Scaffolding within arm's reach</li>
                  <li>All connections accessible and tight</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            QUIZ
            ---------------------------------------- */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* ----------------------------------------
            NAVIGATION
            ---------------------------------------- */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section3-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Live Working
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module1-section3-5">
              Next: GS38 Test Equipment
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module1Section3_4;
