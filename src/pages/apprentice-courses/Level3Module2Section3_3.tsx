/**
 * Level 3 Module 2 Section 3.3 - Integration with PV and Grid
 * Battery storage integration with solar PV systems and grid connections
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
const TITLE = "Battery Integration with PV and Grid - Level 3 Module 2 Section 3.3";
const DESCRIPTION = "Understanding battery storage integration with solar PV systems, grid connection requirements, and hybrid inverter configurations.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the main advantage of DC-coupled battery systems over AC-coupled systems?",
    options: [
      "Lower installation cost",
      "Higher efficiency when storing PV-generated power",
      "Simpler wiring requirements",
      "Better grid export capability"
    ],
    correctIndex: 1,
    explanation: "DC-coupled systems connect the battery directly to the PV array via the DC bus, avoiding the DC-AC-DC conversion losses that occur in AC-coupled systems. This can improve overall system efficiency by 3-5% when storing solar energy for later use."
  },
  {
    id: "check-2",
    question: "What is 'self-consumption' in a solar-battery system?",
    options: [
      "The energy used by the inverter itself",
      "Using stored or generated energy on-site rather than exporting to grid",
      "The battery's standby power draw",
      "Energy lost to heat in the system"
    ],
    correctIndex: 1,
    explanation: "Self-consumption refers to using the energy you generate (from solar PV) or store (in batteries) to power your own loads, rather than exporting it to the grid. Maximising self-consumption is often the primary economic driver for domestic battery systems."
  },
  {
    id: "check-3",
    question: "What standard governs the connection of battery storage systems to the UK distribution network?",
    options: [
      "BS 7671 only",
      "G98/G99 (Engineering Recommendation)",
      "Part P only",
      "IEC 61851"
    ],
    correctIndex: 1,
    explanation: "G98 (for systems up to 16A per phase) and G99 (for larger systems) are the Engineering Recommendations that set out requirements for connecting energy storage and generation to the UK distribution network. BS 7671 covers the electrical installation aspects but G98/G99 addresses grid interface requirements."
  },
  {
    id: "check-4",
    question: "What is 'islanding' and why must it be prevented in grid-connected systems?",
    options: [
      "Operating the battery at full capacity, allowed for efficiency",
      "Energising the grid when it should be dead, dangerous for line workers",
      "Connecting multiple batteries together, required for large systems",
      "Exporting excess power to the grid, encouraged by tariffs"
    ],
    correctIndex: 1,
    explanation: "Islanding occurs when a generator or battery system continues to energise the local grid during a power cut. This is extremely dangerous for utility workers who may be working on lines they believe are dead. Anti-islanding protection is mandatory in all grid-connected systems."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "In an AC-coupled system, where is the battery connected?",
    options: [
      "Directly to the solar panels",
      "To the AC side of the system via its own inverter",
      "Between the solar panels and the main inverter",
      "Only to the consumer unit"
    ],
    correctAnswer: 1,
    explanation: "AC-coupled batteries connect to the AC side of the system via a separate battery inverter (or hybrid inverter AC port). The battery charges and discharges through AC conversion, allowing retrofit to existing PV systems but with some conversion losses."
  },
  {
    id: 2,
    question: "What is a hybrid inverter?",
    options: [
      "An inverter that only works with hybrid vehicles",
      "An inverter combining solar PV and battery management in one unit",
      "An inverter that works on both single and three-phase",
      "An inverter with built-in grid isolation"
    ],
    correctAnswer: 1,
    explanation: "A hybrid inverter integrates solar PV string inputs, battery connections, and grid interface in a single unit. It manages power flow between PV, battery, loads, and grid, simplifying installation and typically offering DC-coupled battery connection for higher efficiency."
  },
  {
    id: 3,
    question: "What determines whether a battery installation requires G98 or G99 notification?",
    options: [
      "The battery chemistry type",
      "The system's export capability per phase (16A threshold)",
      "The age of the property",
      "Whether it's residential or commercial"
    ],
    correctAnswer: 1,
    explanation: "Systems with export capability up to 16A per phase (approximately 3.68kW single-phase) fall under G98 and require notification to the DNO. Above this threshold, G99 applies, requiring application and approval before connection. This includes battery storage systems."
  },
  {
    id: 4,
    question: "What is 'time-of-use' tariff optimisation with battery storage?",
    options: [
      "Only using the battery during certain hours",
      "Charging from grid during cheap periods and discharging during expensive periods",
      "Scheduling battery maintenance at specific times",
      "Limiting export to certain times of day"
    ],
    correctAnswer: 1,
    explanation: "Time-of-use optimisation involves charging the battery from the grid during off-peak cheap rate periods (e.g., overnight) and using that stored energy during peak expensive rate periods. This arbitrage can significantly improve the economics of battery storage."
  },
  {
    id: 5,
    question: "Why might a system include an Energy Management System (EMS)?",
    options: [
      "It's required by law for all battery systems",
      "To optimise power flows between generation, storage, loads, and grid",
      "To replace the BMS",
      "Only for systems over 100kWh"
    ],
    correctAnswer: 1,
    explanation: "An EMS intelligently controls power flow to maximise self-consumption, respond to tariff signals, manage peak demand, and optimise system economics. While not legally required, an EMS significantly improves the value of battery storage investments."
  },
  {
    id: 6,
    question: "What is 'peak shaving' in commercial battery applications?",
    options: [
      "Reducing battery capacity over time",
      "Using battery power to reduce maximum demand charges",
      "Limiting solar generation during peak sun",
      "Smoothing voltage fluctuations"
    ],
    correctAnswer: 1,
    explanation: "Peak shaving uses battery storage to reduce maximum demand spikes, which can significantly reduce electricity bills for commercial users who pay demand charges based on their highest power draw. The battery discharges during peak demand periods to keep grid draw below a threshold."
  },
  {
    id: 7,
    question: "What happens to a grid-tied battery system during a power cut (without backup capability)?",
    options: [
      "It continues to power the house normally",
      "It shuts down to prevent islanding",
      "It switches to island mode automatically",
      "It exports all stored energy to help the grid"
    ],
    correctAnswer: 1,
    explanation: "Standard grid-tied systems without backup capability shut down during power cuts to prevent islanding. Even with a full battery, no power is available until grid supply returns. Systems designed for backup include additional switchgear to safely island essential circuits."
  },
  {
    id: 8,
    question: "What additional equipment is typically needed for battery backup during power cuts?",
    options: [
      "A larger battery only",
      "Automatic transfer switch and separate backup circuit",
      "A diesel generator",
      "Additional solar panels"
    ],
    correctAnswer: 1,
    explanation: "Backup capability typically requires an automatic transfer switch (or integrated backup box) that disconnects the property from the grid and creates a safe island for selected circuits. This prevents backfeed to the grid while allowing the battery and PV to power essential loads."
  },
  {
    id: 9,
    question: "What is the purpose of export limiting in battery/PV systems?",
    options: [
      "To increase the amount exported to grid",
      "To comply with DNO limits or zero-export requirements",
      "To speed up battery charging",
      "To reduce system efficiency"
    ],
    correctAnswer: 1,
    explanation: "Export limiting restricts or eliminates power flow to the grid. This may be required by the DNO for network management, by the customer to avoid unfavourable export tariffs, or in zero-export installations. The battery absorbs excess generation that would otherwise be curtailed."
  },
  {
    id: 10,
    question: "How does a CT clamp at the grid connection point help battery system operation?",
    options: [
      "It measures temperature of the main cable",
      "It monitors power flow to optimise charging/discharging decisions",
      "It provides backup power measurement",
      "It's only used for metering export payments"
    ],
    correctAnswer: 1,
    explanation: "A CT (Current Transformer) clamp at the grid connection monitors real-time power import/export. The EMS uses this data to decide whether to charge the battery (during excess PV generation) or discharge it (when importing from grid), maximising self-consumption."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can I add a battery to my existing solar PV system?",
    answer: "Yes, batteries can be retrofitted to existing PV systems using AC-coupling. A separate battery inverter connects to your existing AC system. Alternatively, some existing PV inverters can be replaced with hybrid inverters. Check compatibility and ensure the combined system meets G98/G99 requirements."
  },
  {
    question: "Do I need DNO permission to install a battery?",
    answer: "For systems up to 16A per phase export capability (about 3.68kW single-phase), you need to notify the DNO under G98 within 28 days. Larger systems require G99 application and approval before installation. Zero-export systems have reduced requirements but should still be notified."
  },
  {
    question: "Will my battery work during a power cut?",
    answer: "Only if your system includes backup functionality with appropriate switchgear. Standard grid-tied systems shut down during power cuts to prevent dangerous backfeed. Backup-capable systems use transfer switches to safely island selected circuits, allowing continued operation from battery and PV."
  },
  {
    question: "What's the difference between backup and off-grid capability?",
    answer: "Backup systems provide temporary power during grid outages but primarily operate grid-connected. Off-grid systems are designed for permanent operation without any grid connection, requiring larger batteries, more sophisticated inverters, and typically a backup generator for extended poor weather periods."
  },
  {
    question: "How do I maximise the benefit from my battery system?",
    answer: "Maximise self-consumption by programming the system to store excess PV generation and discharge during high-usage periods. If on a time-of-use tariff, charge from cheap overnight rates. An EMS can automate this optimisation. Monitor performance regularly to ensure the system operates as expected."
  },
  {
    question: "Can batteries participate in grid services?",
    answer: "Yes, aggregated domestic batteries can provide grid services like frequency response through Virtual Power Plant (VPP) schemes. Participants receive payments for allowing their batteries to respond to grid signals. Check if your battery manufacturer or energy supplier offers such programs."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section3_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.3.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Integration with PV and Grid
          </h1>
          <p className="text-white/80">
            Connecting battery storage to solar systems and the electricity network
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>AC-coupled:</strong> Battery on AC side, suits retrofits, some conversion losses</li>
              <li><strong>DC-coupled:</strong> Battery on DC bus, higher efficiency, needs compatible inverter</li>
              <li><strong>Hybrid inverter:</strong> Combines PV, battery, and grid interface in one unit</li>
              <li><strong>G98/G99:</strong> Grid connection requirements based on export capacity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> System architecture (hybrid inverter vs separate units)</li>
              <li><strong>Use:</strong> CT clamp position to understand monitoring capability</li>
              <li><strong>Apply:</strong> G98/G99 requirements based on system export capacity</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Differences between AC-coupled and DC-coupled systems",
              "How hybrid inverters manage power flow",
              "Grid connection requirements (G98/G99)",
              "Self-consumption optimisation strategies",
              "Backup power functionality and requirements",
              "Energy management system basics"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Content Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            System Architectures: AC vs DC Coupling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Battery storage systems can be integrated with solar PV in two fundamental ways: AC-coupled, where the battery connects on the alternating current side of the system, or DC-coupled, where it connects to the direct current bus shared with the PV array.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">AC-Coupled Systems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Battery has its own inverter/charger, separate from PV inverter</li>
                <li>Ideal for retrofitting batteries to existing PV systems</li>
                <li>Each component can be from different manufacturers</li>
                <li>Power flows: PV DC → AC → Battery charger DC → Battery (conversion losses)</li>
                <li>Typical round-trip efficiency: 85-90%</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">DC-Coupled Systems:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Battery connects to same DC bus as PV, typically via hybrid inverter</li>
                <li>Only one DC-AC conversion needed when storing PV energy</li>
                <li>Higher efficiency for solar-to-battery charging</li>
                <li>Requires compatible hybrid inverter; less flexible for mixing brands</li>
                <li>Typical round-trip efficiency: 90-95%</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> For new installations, DC-coupled hybrid systems often offer the best efficiency. For retrofits to existing PV, AC-coupling avoids replacing the existing inverter.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Content Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Power Flow and Self-Consumption
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The primary economic benefit of domestic battery storage comes from maximising self-consumption - using your own generated or stored energy rather than exporting it cheaply and importing expensive grid power later.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Daily Cycle</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Morning:</strong> Battery powers early loads, PV starting</li>
                  <li><strong>Midday:</strong> PV exceeds demand, charges battery</li>
                  <li><strong>Afternoon:</strong> Battery full, excess exported</li>
                  <li><strong>Evening:</strong> PV drops, battery powers loads</li>
                  <li><strong>Night:</strong> Battery depletes, grid import</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Optimisation Factors</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Battery capacity vs daily consumption</li>
                  <li>PV generation vs battery size match</li>
                  <li>Load shifting capability</li>
                  <li>Time-of-use tariff availability</li>
                  <li>Weather forecast integration</li>
                </ul>
              </div>
            </div>

            <p>
              CT clamps monitor power flow at the grid connection point, telling the system when to charge (excess generation) or discharge (importing from grid). This real-time monitoring is essential for effective self-consumption optimisation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Content Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Grid Connection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All grid-connected battery storage systems must comply with engineering recommendations that ensure safe, stable connection to the distribution network. In the UK, this means G98 or G99 depending on system size.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">G98 vs G99 requirements:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>G98 (up to 16A/phase):</strong> Notification to DNO required, no approval needed. Single-phase limit ~3.68kW export. Must notify within 28 days of commissioning.</li>
                <li><strong>G99 (above 16A/phase):</strong> Application required before installation. DNO must approve connection. May require grid studies and protection settings coordination.</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key protection requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Anti-islanding:</strong> System must disconnect within specified time if grid fails</li>
                <li><strong>Voltage protection:</strong> Disconnect for over/under voltage conditions</li>
                <li><strong>Frequency protection:</strong> Disconnect if frequency outside 47-52Hz range</li>
                <li><strong>Rate of change of frequency (RoCoF):</strong> Rapid disconnect for grid disturbances</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A domestic system with 5kW hybrid inverter limited to 3.68kW export would fall under G98 notification. The same inverter configured for full 5kW export would require G99 application.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Content Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Backup Power and Islanding
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Many homeowners expect their battery to provide power during grid outages. However, standard grid-tied systems cannot do this without additional equipment - anti-islanding protection shuts the system down to protect utility workers.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Standard Grid-Tied</p>
                <p className="text-white/90 text-xs">No backup capability. Shuts down during outages.</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Backup Capable</p>
                <p className="text-white/90 text-xs">Transfer switch isolates and powers selected circuits.</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Off-Grid</p>
                <p className="text-white/90 text-xs">Never grid-connected. Requires generator backup.</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Backup system requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Automatic Transfer Switch (ATS):</strong> Disconnects from grid and creates safe island</li>
                <li><strong>Backup circuit:</strong> Separate consumer unit or selected ways for essential loads</li>
                <li><strong>Inverter capability:</strong> Must support backup/off-grid mode</li>
                <li><strong>Adequate battery capacity:</strong> Sized for essential loads duration</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Anti-islanding protection is not optional - it's a safety requirement. Backup capability requires proper engineering to maintain this protection while enabling safe islanded operation of selected circuits.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Designing Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Match battery capacity to daily consumption minus PV self-use</li>
                <li>Consider DC-coupling for new installs, AC-coupling for retrofits</li>
                <li>Check DNO requirements early - G99 applications take time</li>
                <li>Clarify backup requirements with customer before specifying</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify CT clamp position and polarity for correct power flow measurement</li>
                <li>Test all operating modes including grid failure response</li>
                <li>Submit G98 notification (or verify G99 approval)</li>
                <li>Configure EMS for customer's tariff and preferences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Assuming backup works</strong> - most systems don't include it without specific design</li>
                <li><strong>Incorrect CT installation</strong> - wrong position or polarity causes poor optimisation</li>
                <li><strong>Missing DNO notification</strong> - can result in forced disconnection</li>
                <li><strong>Oversized battery</strong> - large batteries may never fully cycle, wasting investment</li>
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
                <p className="font-medium text-white mb-1">Grid Connection (UK)</p>
                <ul className="space-y-0.5">
                  <li>G98: Up to 16A per phase (~3.68kW 1-phase)</li>
                  <li>G98: Notification within 28 days</li>
                  <li>G99: Above 16A per phase</li>
                  <li>G99: Application and approval required</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">System Efficiency (Typical)</p>
                <ul className="space-y-0.5">
                  <li>DC-coupled: 90-95% round-trip</li>
                  <li>AC-coupled: 85-90% round-trip</li>
                  <li>Inverter efficiency: 95-98%</li>
                  <li>Battery efficiency: 92-96%</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section3-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Battery Management Systems
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section3-4">
              Next: Safety and Installation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section3_3;
