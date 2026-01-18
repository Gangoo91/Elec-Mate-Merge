/**
 * Level 3 Module 2 Section 3.2 - Battery Management Systems (BMS)
 * Understanding BMS functions, cell balancing, and protection mechanisms
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
const TITLE = "Battery Management Systems (BMS) - Level 3 Module 2 Section 3.2";
const DESCRIPTION = "Understanding BMS functions, cell balancing, protection features, and communication protocols in battery storage systems.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary purpose of a Battery Management System (BMS)?",
    options: [
      "To convert DC to AC power",
      "To monitor, protect, and optimise battery performance",
      "To charge the battery from solar panels",
      "To display energy usage to the homeowner"
    ],
    correctIndex: 1,
    explanation: "The BMS monitors cell voltages, temperatures, and currents to protect the battery from damage, optimise performance, and extend lifespan. It controls charging/discharging and provides safety protection against overcharge, over-discharge, and thermal events."
  },
  {
    id: "check-2",
    question: "Why is cell balancing necessary in a lithium-ion battery pack?",
    options: [
      "To make the battery lighter",
      "To ensure all cells have equal state of charge",
      "To reduce the number of cells needed",
      "To increase the charging speed"
    ],
    correctIndex: 1,
    explanation: "Manufacturing variations mean cells have slightly different capacities. Without balancing, some cells reach full charge before others, limiting total usable capacity. Cell balancing equalises state of charge across all cells, maximising the battery's usable capacity and lifespan."
  },
  {
    id: "check-3",
    question: "What happens when the BMS detects a cell over-temperature condition?",
    options: [
      "It increases charging current to finish faster",
      "It does nothing - temperature is not monitored",
      "It reduces or stops charging/discharging to protect the cells",
      "It only logs the event for later review"
    ],
    correctIndex: 2,
    explanation: "When the BMS detects temperatures exceeding safe limits, it will derate (reduce) or completely stop charging and/or discharging to prevent thermal damage or runaway. This protection is critical for safety and extends battery life by preventing heat-related degradation."
  },
  {
    id: "check-4",
    question: "Which communication protocol is commonly used between battery systems and inverters?",
    options: [
      "WiFi only",
      "CAN bus or RS485",
      "Bluetooth exclusively",
      "Infrared"
    ],
    correctIndex: 1,
    explanation: "CAN bus and RS485 are industrial communication protocols commonly used for battery-inverter communication. They provide reliable, real-time data exchange including state of charge, voltage, current limits, and fault conditions. WiFi may be used for monitoring but not typically for critical control communication."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What parameters does a BMS typically monitor for each cell?",
    options: [
      "Voltage only",
      "Voltage and temperature",
      "Voltage, temperature, and current",
      "Only the total pack voltage"
    ],
    correctAnswer: 2,
    explanation: "A comprehensive BMS monitors individual cell voltages, temperatures (often multiple sensors per module), and current flow. This data enables accurate state-of-charge calculations, cell balancing decisions, and protection against unsafe operating conditions."
  },
  {
    id: 2,
    question: "What is 'passive cell balancing' in battery systems?",
    options: [
      "Balancing that occurs automatically without any electronics",
      "Dissipating excess energy from higher-charged cells as heat",
      "Transferring energy from higher to lower charged cells",
      "Balancing only when the battery is disconnected"
    ],
    correctAnswer: 1,
    explanation: "Passive balancing uses resistors to bleed off excess charge from cells with higher voltage, dissipating it as heat. It's simpler and cheaper than active balancing but wastes energy. It typically only operates during charging when cell voltage differences are detected."
  },
  {
    id: 3,
    question: "What advantage does active cell balancing have over passive balancing?",
    options: [
      "It's cheaper to implement",
      "It transfers energy between cells rather than wasting it",
      "It doesn't require any monitoring",
      "It only works with lead-acid batteries"
    ],
    correctAnswer: 1,
    explanation: "Active balancing uses DC-DC converters to transfer charge from higher to lower voltage cells, preserving energy that passive systems would waste as heat. While more expensive and complex, it improves efficiency and can balance faster, particularly beneficial in high-capacity systems."
  },
  {
    id: 4,
    question: "What is 'State of Charge' (SoC) in battery terminology?",
    options: [
      "The physical condition of the battery",
      "The percentage of available capacity currently stored",
      "The charging current being applied",
      "The number of cycles completed"
    ],
    correctAnswer: 1,
    explanation: "State of Charge (SoC) indicates how full the battery is as a percentage, similar to a fuel gauge. The BMS calculates SoC using voltage measurements, coulomb counting (integrating current over time), and temperature compensation. Accurate SoC is essential for system operation and user information."
  },
  {
    id: 5,
    question: "What does 'State of Health' (SoH) indicate about a battery?",
    options: [
      "The current temperature of the battery",
      "Whether the battery is currently charging",
      "The remaining capacity compared to when new",
      "The state of charge percentage"
    ],
    correctAnswer: 2,
    explanation: "State of Health (SoH) indicates the battery's current maximum capacity as a percentage of its original rated capacity. A battery with 85% SoH can only store 85% of its original capacity. SoH decreases over time due to cycling and calendar ageing."
  },
  {
    id: 6,
    question: "Why does a BMS limit charging current when cells are nearly full?",
    options: [
      "To save electricity",
      "To prevent overcharging which damages cells and creates safety risks",
      "Because the inverter cannot supply higher current",
      "To extend the charging time for billing purposes"
    ],
    correctAnswer: 1,
    explanation: "As lithium cells approach full charge, continuing at high current risks overcharging, which causes lithium plating, gas generation, and potential thermal runaway. The BMS reduces charging current (constant voltage phase) to allow cells to reach full charge safely."
  },
  {
    id: 7,
    question: "What is a 'contactor' in a battery system?",
    options: [
      "A type of battery cell",
      "The communication interface",
      "A high-current relay that connects/disconnects the battery",
      "A temperature sensor"
    ],
    correctAnswer: 2,
    explanation: "Contactors are heavy-duty electromagnetic relays capable of switching high DC currents. The BMS controls the contactors to connect or disconnect the battery from the system. They open automatically during fault conditions to isolate the battery for safety."
  },
  {
    id: 8,
    question: "What happens during BMS 'precharge'?",
    options: [
      "The battery is topped up before first use",
      "A resistor limits inrush current when connecting to capacitive loads",
      "The BMS firmware is updated",
      "Cell balancing is performed"
    ],
    correctAnswer: 1,
    explanation: "Precharge uses a resistor to limit the initial current surge when connecting the battery to a system with large capacitors (like inverters). Without precharge, closing the main contactor could cause damaging inrush currents and contact welding."
  },
  {
    id: 9,
    question: "How does a BMS communicate fault conditions to the inverter?",
    options: [
      "By flashing LED lights only",
      "Through communication protocols (CAN/RS485) and/or contact signals",
      "It cannot communicate with the inverter",
      "By email notification only"
    ],
    correctAnswer: 1,
    explanation: "The BMS communicates with the inverter via digital protocols (CAN bus, RS485) transmitting detailed status and fault information. It may also use simple contact signals (dry contacts) for basic fault indication. This allows the inverter to respond appropriately to battery conditions."
  },
  {
    id: 10,
    question: "What is the purpose of temperature sensors distributed throughout a battery pack?",
    options: [
      "To display room temperature",
      "To detect hotspots and ensure safe operating temperature across all cells",
      "To measure ambient temperature only",
      "They are only for warranty documentation"
    ],
    correctAnswer: 1,
    explanation: "Distributed temperature sensors detect hotspots that could indicate cell problems or cooling issues. Temperature variations across the pack affect cell performance and ageing. The BMS uses this data to ensure no cell exceeds safe limits and to optimise performance."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Can a battery operate without a BMS?",
    answer: "Lithium-ion batteries should never operate without a BMS due to safety risks. Unlike lead-acid batteries that can tolerate some overcharge, lithium cells can enter thermal runaway if overcharged, over-discharged, or operated outside temperature limits. The BMS provides essential protection that prevents dangerous conditions and extends battery life."
  },
  {
    question: "What causes BMS faults and how are they cleared?",
    answer: "Common BMS faults include over/under voltage, over temperature, communication errors, and cell imbalance. Many faults auto-clear when conditions return to normal (e.g., temperature drops). Persistent faults may require manual reset via the inverter interface or BMS itself. Always investigate the root cause before simply resetting faults."
  },
  {
    question: "How does the BMS know the battery's state of charge?",
    answer: "The BMS calculates SoC using multiple methods: voltage-based estimation (comparing cell voltage to known discharge curves), coulomb counting (integrating charge in/out over time), and temperature compensation. Advanced systems combine these methods with algorithms that learn battery behaviour over time for improved accuracy."
  },
  {
    question: "Why do battery warranties often specify cycle counts and throughput?",
    answer: "Battery degradation depends on both cycles (times charged/discharged) and total energy throughput (total kWh processed). A warranty might specify '6,000 cycles or 10 years, whichever first' because heavy daily cycling degrades the battery faster than light use over the same calendar time."
  },
  {
    question: "What's the difference between BMS and Battery Energy Storage System (BESS)?",
    answer: "The BMS is the electronic management system within a battery. A BESS refers to the complete energy storage system including batteries, BMS, inverter, enclosure, and controls. The BMS is a component of the BESS. In product marketing, 'battery system' often means the BESS while 'battery' may refer to just the cells and BMS."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module2Section3_2 = () => {
  useSEO(TITLE, DESCRIPTION);

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
            <span>Module 2.3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Battery Management Systems
          </h1>
          <p className="text-white/80">
            The intelligent control centre protecting and optimising battery performance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>BMS role:</strong> Monitor, protect, balance, and communicate</li>
              <li><strong>Cell balancing:</strong> Ensures all cells charge/discharge equally</li>
              <li><strong>Protection:</strong> Over-voltage, under-voltage, over-temperature, over-current</li>
              <li><strong>Communication:</strong> CAN bus or RS485 to inverter for coordinated operation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> BMS display showing SoC, voltage, temperature, faults</li>
              <li><strong>Use:</strong> Check BMS status during commissioning and troubleshooting</li>
              <li><strong>Apply:</strong> Ensure inverter-BMS communication is established</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Core functions of a Battery Management System",
              "How cell balancing works and why it matters",
              "BMS protection mechanisms and fault handling",
              "Communication between BMS and inverter systems",
              "Understanding State of Charge (SoC) and State of Health (SoH)",
              "Practical troubleshooting of BMS-related issues"
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
            Core BMS Functions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Battery Management System (BMS) is the critical electronic control system that makes lithium-ion batteries safe and practical. Without a BMS, the cells within a battery pack would be at risk of damage, shortened lifespan, and potentially dangerous failures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Primary BMS functions:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Monitoring:</strong> Continuously measures cell voltages, pack current, and temperatures</li>
                <li><strong>Protection:</strong> Prevents operation outside safe limits for voltage, current, and temperature</li>
                <li><strong>Balancing:</strong> Equalises charge levels across all cells in the pack</li>
                <li><strong>Communication:</strong> Exchanges data with inverters and monitoring systems</li>
                <li><strong>Estimation:</strong> Calculates State of Charge and State of Health</li>
              </ul>
            </div>

            <p>
              Modern BMS units are sophisticated microcontroller-based systems with multiple sensing channels, safety relays (contactors), and communication interfaces. They represent a significant portion of a battery system's cost and complexity.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> A failed or misconfigured BMS can render an otherwise healthy battery pack unusable or unsafe. Always verify BMS operation during installation and maintenance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Content Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cell Balancing Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Even cells from the same production batch have slight variations in capacity and internal resistance. Over time and cycles, these differences become more pronounced. Cell balancing corrects these imbalances to maximise usable capacity and ensure safe operation.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Passive Balancing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Uses resistors to discharge higher-voltage cells</li>
                  <li>Energy is dissipated as heat</li>
                  <li>Simpler and lower cost</li>
                  <li>Typically only active during charging</li>
                  <li>Balancing current usually 50-200mA per cell</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active Balancing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Transfers charge between cells using DC-DC conversion</li>
                  <li>Energy is conserved rather than wasted</li>
                  <li>More complex and expensive</li>
                  <li>Can balance during charging and discharging</li>
                  <li>Faster balancing with higher currents possible</li>
                </ul>
              </div>
            </div>

            <p>
              Most domestic battery systems use passive balancing due to lower cost. For these systems, regular full charge cycles help maintain cell balance. Active balancing is more common in high-value applications like electric vehicles where maximising every bit of capacity matters.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Content Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Protection Functions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The BMS continuously monitors operating parameters and intervenes when limits are exceeded. Protection responses range from reducing power (derating) to complete disconnection via the contactors for serious faults.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key protection functions:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Over-voltage protection:</strong> Stops charging when any cell exceeds maximum voltage (typically 3.65V for LFP, 4.2V for NMC)</li>
                <li><strong>Under-voltage protection:</strong> Stops discharging when any cell falls below minimum voltage (typically 2.5-2.8V)</li>
                <li><strong>Over-temperature protection:</strong> Reduces or stops operation when temperatures exceed limits (typically 45-55°C)</li>
                <li><strong>Under-temperature protection:</strong> Prevents charging below safe limits (typically 0°C) to avoid lithium plating</li>
                <li><strong>Over-current protection:</strong> Limits or disconnects for currents exceeding safe levels</li>
                <li><strong>Short-circuit protection:</strong> Rapid disconnection for detected short circuits</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> On a cold winter morning, the BMS may prevent or heavily limit charging until the battery warms above 0°C. Attempting to fast-charge lithium cells below freezing can cause permanent damage from lithium plating on the anode.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Content Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Communication and Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective communication between the BMS and inverter is essential for safe, efficient operation. The BMS tells the inverter what the battery can accept or deliver at any moment, and the inverter adjusts its operation accordingly.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">CAN Bus</p>
                <p className="text-white/90 text-xs">Robust automotive-grade protocol, real-time bidirectional communication</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">RS485</p>
                <p className="text-white/90 text-xs">Industrial serial protocol, common in commercial systems, Modbus compatible</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Dry Contacts</p>
                <p className="text-white/90 text-xs">Simple relay signals for basic fault/ready status indication</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Data exchanged between BMS and inverter:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>State of Charge:</strong> How full the battery is (percentage)</li>
                <li><strong>Charge/discharge current limits:</strong> Maximum safe current the battery can accept/deliver now</li>
                <li><strong>Voltage limits:</strong> Maximum and minimum pack voltage</li>
                <li><strong>Temperature status:</strong> Current temperatures and any alarms</li>
                <li><strong>Fault codes:</strong> Active faults requiring attention</li>
                <li><strong>State of Health:</strong> Battery capacity compared to when new</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Incompatible BMS-inverter communication is a common commissioning issue. Always verify the battery and inverter are compatible and properly configured to communicate.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify communication between BMS and inverter is established</li>
                <li>Check all cell voltages are within expected range and reasonably balanced</li>
                <li>Confirm temperature sensors are reading sensible values</li>
                <li>Test that the inverter respects BMS charge/discharge limits</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Troubleshooting</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check BMS fault codes via inverter interface or battery display</li>
                <li>Compare individual cell voltages - large variations indicate problems</li>
                <li>Review communication settings if inverter shows 'no battery' or similar</li>
                <li>Check for loose connections at communication cables and power terminals</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Ignoring BMS faults</strong> - they indicate real issues requiring investigation</li>
                <li><strong>Mismatched protocols</strong> - ensure battery and inverter use compatible communication</li>
                <li><strong>Incorrect termination</strong> - RS485 may need termination resistors at end of cable run</li>
                <li><strong>Bypassing protection</strong> - never disable BMS protection functions</li>
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
                <p className="font-medium text-white mb-1">BMS Protection Limits (Typical LFP)</p>
                <ul className="space-y-0.5">
                  <li>Max cell voltage: 3.65V</li>
                  <li>Min cell voltage: 2.5-2.8V</li>
                  <li>Max charge temp: 45-55°C</li>
                  <li>Min charge temp: 0°C</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Communication Protocols</p>
                <ul className="space-y-0.5">
                  <li>CAN bus: Real-time, automotive-grade</li>
                  <li>RS485: Industrial, Modbus compatible</li>
                  <li>Dry contacts: Simple fault/ready signals</li>
                  <li>WiFi/Ethernet: Monitoring (non-critical)</li>
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
            <Link to="/study-centre/apprentice/level3-module2-section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Battery Chemistry
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module2-section3-3">
              Next: PV and Grid Integration
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module2Section3_2;
