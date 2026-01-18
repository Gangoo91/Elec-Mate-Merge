import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Battery Management Systems (BMS) - Renewable Energy Module 4";
const DESCRIPTION = "Learn about Battery Management Systems including cell balancing, state of charge monitoring, thermal management, and safety protection for energy storage.";

const quickCheckQuestions = [
  {
    id: "bms-primary-function",
    question: "What is the primary function of a Battery Management System?",
    options: ["Increase battery capacity", "Monitor and protect battery cells", "Convert DC to AC power", "Connect batteries to the grid"],
    correctIndex: 1,
    explanation: "The primary function of a BMS is to monitor and protect battery cells by managing voltage, current, temperature, and state of charge to ensure safe operation and maximise battery lifespan."
  },
  {
    id: "bms-cell-balancing",
    question: "Why is cell balancing important in battery systems?",
    options: ["To increase total capacity", "To prevent weak cells limiting system performance", "To reduce charging time", "To improve inverter efficiency"],
    correctIndex: 1,
    explanation: "Cell balancing ensures all cells in a battery pack operate at similar voltage levels. Without balancing, the weakest cell limits the entire pack's usable capacity and can lead to premature failure."
  },
  {
    id: "bms-soc-importance",
    question: "Why is accurate State of Charge (SoC) estimation critical?",
    options: ["Only for display purposes", "To prevent over-discharge and over-charge damage", "To calculate electricity bills", "To match grid frequency"],
    correctIndex: 1,
    explanation: "Accurate SoC estimation prevents harmful over-discharge and over-charge conditions that can permanently damage cells, reduce capacity, or create safety hazards."
  },
  {
    id: "bms-thermal-management",
    question: "What happens if battery temperature exceeds safe limits?",
    options: ["Efficiency improves", "Charging speeds up", "Accelerated degradation and potential thermal runaway", "No significant effect"],
    correctIndex: 2,
    explanation: "Excessive temperature causes accelerated chemical degradation, capacity loss, and in severe cases can trigger thermal runaway in lithium batteries, leading to fire or explosion."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What parameters does a BMS typically monitor?",
    options: [
      "Only voltage",
      "Voltage, current, and temperature of each cell",
      "Only total pack voltage",
      "Only charging current"
    ],
    correctAnswer: 1,
    explanation: "A comprehensive BMS monitors voltage, current, and temperature at the cell level, plus pack-level parameters, to ensure safe operation within specified limits."
  },
  {
    id: 2,
    question: "What is passive cell balancing?",
    options: [
      "Transferring energy between cells",
      "Dissipating excess energy as heat from higher cells",
      "Adding extra capacity to weak cells",
      "Bypassing faulty cells"
    ],
    correctAnswer: 1,
    explanation: "Passive balancing dissipates excess energy from higher-voltage cells as heat through resistors, bringing them down to match lower cells. It is simpler but wastes energy."
  },
  {
    id: 3,
    question: "What advantage does active cell balancing offer over passive?",
    options: [
      "Lower cost",
      "Simpler design",
      "Energy transfer rather than dissipation",
      "No electronics required"
    ],
    correctAnswer: 2,
    explanation: "Active balancing transfers energy from higher cells to lower cells rather than wasting it as heat, improving overall system efficiency, though at higher cost and complexity."
  },
  {
    id: 4,
    question: "What is Coulomb counting used for in BMS?",
    options: [
      "Measuring battery weight",
      "Estimating State of Charge by tracking current flow",
      "Counting battery cycles",
      "Measuring cell temperature"
    ],
    correctAnswer: 1,
    explanation: "Coulomb counting integrates current flow over time to estimate State of Charge. It requires periodic recalibration as small measurement errors accumulate."
  },
  {
    id: 5,
    question: "What does State of Health (SoH) indicate?",
    options: [
      "Current charge level",
      "Battery temperature",
      "Remaining capacity compared to original rated capacity",
      "Charging speed capability"
    ],
    correctAnswer: 2,
    explanation: "State of Health indicates the battery's current maximum capacity compared to its original rated capacity, showing how much the battery has degraded over its lifetime."
  },
  {
    id: 6,
    question: "What protection does a BMS provide against short circuits?",
    options: [
      "No protection required",
      "Rapid disconnection via contactors or MOSFETs",
      "Slow fuse protection only",
      "Manual disconnection"
    ],
    correctAnswer: 1,
    explanation: "BMS systems provide rapid electronic disconnection using contactors or MOSFETs to interrupt short circuit currents within milliseconds, preventing damage and fire."
  },
  {
    id: 7,
    question: "Why do lithium batteries require thermal management?",
    options: [
      "They generate no heat",
      "Performance and safety are highly temperature-dependent",
      "Only for aesthetics",
      "Thermal management is optional"
    ],
    correctAnswer: 1,
    explanation: "Lithium battery performance, safety, and lifespan are highly dependent on operating temperature. Both high and low temperatures cause problems requiring active thermal management."
  },
  {
    id: 8,
    question: "What communication protocol is commonly used for BMS in energy storage?",
    options: [
      "WiFi only",
      "CAN bus, Modbus, or RS485",
      "Bluetooth only",
      "No communication required"
    ],
    correctAnswer: 1,
    explanation: "CAN bus, Modbus, and RS485 are commonly used industrial protocols for BMS communication with inverters and monitoring systems due to their reliability and standardisation."
  },
  {
    id: 9,
    question: "What is the purpose of pre-charge circuits in battery systems?",
    options: [
      "Speed up charging",
      "Limit inrush current when connecting to inverter",
      "Increase battery capacity",
      "Balance cells during charging"
    ],
    correctAnswer: 1,
    explanation: "Pre-charge circuits limit the initial inrush current when connecting batteries to capacitive loads like inverters, preventing damage to contactors and electronic components."
  },
  {
    id: 10,
    question: "How does a BMS communicate fault conditions?",
    options: [
      "No fault reporting",
      "Through alarm outputs, communication protocols, and LED indicators",
      "Manual inspection only",
      "Only through physical disconnection"
    ],
    correctAnswer: 1,
    explanation: "BMS systems report faults through multiple channels including digital alarm outputs, communication protocols (CAN/Modbus), LED indicators, and data logging for diagnostics."
  }
];

const faqs = [
  {
    question: "Can different battery brands with different BMS systems be mixed?",
    answer: "Generally no. Different BMS systems have different communication protocols, voltage thresholds, and balancing strategies. Mixing brands can cause charging issues, safety problems, and voided warranties. Always use matched batteries from the same manufacturer and production batch."
  },
  {
    question: "How often should BMS firmware be updated?",
    answer: "Check manufacturer recommendations, typically annually or when issues arise. Updates may improve safety parameters, compatibility with new inverters, or fix bugs. Always follow manufacturer procedures and verify compatibility before updating."
  },
  {
    question: "What causes BMS communication errors with inverters?",
    answer: "Common causes include incorrect protocol settings, cable issues, termination resistor problems, EMI interference, and incompatible firmware versions. Check physical connections first, then verify protocol settings match between BMS and inverter."
  },
  {
    question: "How can I tell if cell balancing is working correctly?",
    answer: "Monitor individual cell voltages during charging - they should converge as the pack approaches full charge. Persistent voltage differences greater than 50mV between cells after balancing may indicate cell issues or balancing circuit problems."
  },
  {
    question: "What happens when the BMS disconnects the battery?",
    answer: "The BMS opens contactors to isolate the battery from the system, stopping all current flow. This protects against over-voltage, under-voltage, over-current, over-temperature, and short circuit conditions. The system typically requires manual reset or automatic recovery once conditions normalise."
  },
  {
    question: "Is it possible to reset or recalibrate a BMS?",
    answer: "Yes, most BMS systems allow SoC recalibration through full charge/discharge cycles. Some advanced systems allow parameter adjustment through software. Always follow manufacturer procedures as incorrect settings can create safety hazards."
  }
];

const RenewableEnergyModule4Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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

      <article className="px-4 sm:px-6 py-8 sm:py-12 max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 4 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Battery Management Systems
          </h1>
          <p className="text-white/80">
            Monitoring, protection, and control systems for safe battery operation
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">Core Functions</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Monitor:</strong> Voltage, current, temperature</li>
              <li><strong>Protect:</strong> Over/under voltage and current</li>
              <li><strong>Balance:</strong> Equalise cell voltages</li>
              <li><strong>Communicate:</strong> CAN, Modbus, RS485</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Parameters</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>SoC:</strong> State of Charge (0-100%)</li>
              <li><strong>SoH:</strong> State of Health (capacity)</li>
              <li><strong>DoD:</strong> Depth of Discharge</li>
              <li><strong>Cycle count:</strong> Lifetime tracking</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand BMS architecture and components",
              "Compare cell balancing methods",
              "Interpret SoC and SoH measurements",
              "Identify protection features and limits",
              "Configure BMS communication protocols",
              "Troubleshoot common BMS issues"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            BMS Architecture and Components
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Battery Management System is the brain of any battery energy storage system, responsible for monitoring, protecting, and optimising battery performance throughout its operational life.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Hardware Components:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Cell monitoring boards:</strong> Measure individual cell voltage and temperature</li>
                <li><strong>Current sensors:</strong> Hall effect or shunt-based current measurement</li>
                <li><strong>Temperature sensors:</strong> NTC thermistors distributed throughout pack</li>
                <li><strong>Main controller:</strong> Central processor for calculations and decisions</li>
                <li><strong>Contactors/relays:</strong> High-current switches for disconnection</li>
                <li><strong>Pre-charge circuit:</strong> Limits inrush current on connection</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BMS Topologies:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Centralised:</strong> Single controller monitors all cells directly</li>
                <li><strong>Distributed:</strong> Local modules communicate to master controller</li>
                <li><strong>Modular:</strong> Scalable slave boards per module with central master</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-white mb-2">Typical Monitoring Accuracy:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Voltage:</strong> +/- 2-5mV per cell</li>
                <li><strong>Current:</strong> +/- 1-2% of reading</li>
                <li><strong>Temperature:</strong> +/- 1-2 degrees C</li>
                <li><strong>SoC estimation:</strong> +/- 3-5% typical</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Cell Balancing Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cell balancing ensures all cells in a battery pack operate at similar voltage levels, maximising usable capacity and preventing premature failure of individual cells.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Passive Balancing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Method:</strong> Dissipates excess energy through resistors as heat</li>
                <li><strong>Operation:</strong> Typically active during charging near full charge</li>
                <li><strong>Balancing current:</strong> Usually 50-200mA per cell</li>
                <li><strong>Advantages:</strong> Simple, low cost, reliable</li>
                <li><strong>Disadvantages:</strong> Wastes energy, slow balancing, heat generation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Active Balancing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Method:</strong> Transfers energy from high cells to low cells</li>
                <li><strong>Technologies:</strong> Capacitor-based, inductor-based, or transformer-based</li>
                <li><strong>Balancing current:</strong> 1-5A possible for faster balancing</li>
                <li><strong>Advantages:</strong> Higher efficiency, faster balancing, bidirectional</li>
                <li><strong>Disadvantages:</strong> Higher cost, more complex, potential EMI</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">When Balancing is Critical</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>High cell count:</strong> More cells means more variation</li>
                <li><strong>Deep cycling:</strong> Regular deep discharge amplifies imbalance</li>
                <li><strong>Temperature gradients:</strong> Uneven temperatures cause drift</li>
                <li><strong>Aged batteries:</strong> Cell degradation rates vary</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            State Estimation Methods
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate estimation of battery state parameters is essential for safe operation, optimal performance, and reliable capacity information for system operators.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">State of Charge (SoC) Methods:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Coulomb counting:</strong> Integrates current over time, requires calibration</li>
                <li><strong>Voltage-based:</strong> Uses OCV-SoC lookup tables at rest</li>
                <li><strong>Model-based:</strong> Kalman filters combine multiple methods</li>
                <li><strong>Impedance-based:</strong> Uses internal resistance characteristics</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">State of Health (SoH) Indicators:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Capacity fade:</strong> Maximum capacity vs original rated capacity</li>
                <li><strong>Resistance increase:</strong> Internal resistance growth over time</li>
                <li><strong>Cycle count:</strong> Total charge/discharge cycles completed</li>
                <li><strong>Calendar age:</strong> Time since manufacture</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">SoC Recalibration:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Full charge:</strong> Reset to 100% at absorption voltage completion</li>
                <li><strong>Full discharge:</strong> Reset to 0% at low voltage cutoff</li>
                <li><strong>Rest periods:</strong> OCV measurement after extended rest</li>
                <li><strong>Frequency:</strong> Monthly full cycle recommended for accuracy</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Protection Functions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The BMS provides multiple layers of protection to prevent battery damage, ensure safety, and extend operational life through continuous monitoring and automatic intervention.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Voltage Protection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-voltage:</strong> Stops charging to prevent cell damage</li>
                <li><strong>Under-voltage:</strong> Stops discharge to prevent deep discharge</li>
                <li><strong>Cell imbalance:</strong> Alerts if cell voltages diverge excessively</li>
                <li><strong>Typical limits:</strong> 3.65V max, 2.5V min for LFP cells</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Current Protection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Over-current charge:</strong> Limits charging rate</li>
                <li><strong>Over-current discharge:</strong> Limits discharge rate</li>
                <li><strong>Short circuit:</strong> Rapid disconnection within milliseconds</li>
                <li><strong>Sustained overload:</strong> Time-based current limiting</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Temperature Protection:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>High temperature charge:</strong> Typically &gt;45C stops charging</li>
                <li><strong>High temperature discharge:</strong> Typically &gt;55C stops discharge</li>
                <li><strong>Low temperature charge:</strong> Typically &lt;0C stops charging</li>
                <li><strong>Low temperature discharge:</strong> May allow reduced current</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <p className="text-sm font-medium text-elec-yellow mb-2">Protection Response Times</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Short circuit:</strong> Less than 1ms disconnection</li>
                <li><strong>Over-current:</strong> 1-100ms depending on severity</li>
                <li><strong>Voltage limits:</strong> 100ms to 1s typical</li>
                <li><strong>Temperature:</strong> 1-10s response time</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Communication and Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective communication between the BMS and other system components is essential for coordinated operation, monitoring, and control of the complete energy storage system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Communication Protocols:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>CAN bus:</strong> Fast, reliable, common in automotive and industrial</li>
                <li><strong>Modbus RTU:</strong> Serial protocol widely used in energy systems</li>
                <li><strong>Modbus TCP:</strong> Ethernet-based version for network integration</li>
                <li><strong>RS485:</strong> Physical layer for serial communication</li>
                <li><strong>Proprietary:</strong> Manufacturer-specific protocols</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Data Parameters Communicated:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Pack voltage and current:</strong> Real-time measurements</li>
                <li><strong>SoC and SoH:</strong> Capacity and health status</li>
                <li><strong>Charge/discharge limits:</strong> Dynamic current limits</li>
                <li><strong>Cell voltages:</strong> Individual cell monitoring data</li>
                <li><strong>Temperatures:</strong> Multiple sensor readings</li>
                <li><strong>Alarms and faults:</strong> Warning and error codes</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Inverter Integration:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Charge voltage control:</strong> BMS sets target voltage</li>
                <li><strong>Current limiting:</strong> BMS communicates safe limits</li>
                <li><strong>Shutdown commands:</strong> BMS can request system stop</li>
                <li><strong>Compatibility:</strong> Protocol matching essential</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Commissioning BMS Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify all cell voltage readings match within specifications</li>
                <li>Confirm communication protocol settings match inverter</li>
                <li>Check temperature sensor readings are reasonable</li>
                <li>Test protection functions before connecting load</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When Troubleshooting Issues</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Check cell voltage balance first - large differences indicate problems</li>
                <li>Review fault history logs for patterns</li>
                <li>Verify physical connections and cable integrity</li>
                <li>Compare readings against independent multimeter measurements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Mixing batteries</strong> - different BMS systems will not coordinate properly</li>
                <li><strong>Ignoring communication errors</strong> - can lead to uncontrolled operation</li>
                <li><strong>Bypassing protection</strong> - never disable BMS safety functions</li>
                <li><strong>Wrong protocol settings</strong> - causes inverter/BMS mismatch issues</li>
              </ul>
            </div>
          </div>
        </section>

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

        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default RenewableEnergyModule4Section2;
