import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Loop-Powered vs Externally Powered Devices - Instrumentation Module 7";
const DESCRIPTION = "Learn the differences between loop-powered and externally powered instrumentation devices, their advantages, limitations, and proper application in 4-20mA systems.";

const quickCheckQuestions = [
  {
    id: "loop-power-check-1",
    question: "What is the main advantage of loop-powered devices?",
    options: [
      "Higher accuracy",
      "Simple 2-wire installation requiring only signal wires",
      "More features and diagnostics",
      "Higher power output"
    ],
    correctIndex: 1,
    explanation: "Loop-powered devices use a simple 2-wire configuration where the same wires carry both power and signal, reducing installation complexity and cost significantly."
  },
  {
    id: "loop-power-check-2",
    question: "Why might externally powered devices be preferred for complex applications?",
    options: [
      "They are cheaper",
      "They provide more power for advanced features like displays, HART communication, and diagnostics",
      "They use fewer wires",
      "They work better in hazardous areas"
    ],
    correctIndex: 1,
    explanation: "Externally powered devices have a separate power supply that provides adequate power for advanced features such as backlit displays, full HART communication, data logging, and relay outputs."
  },
  {
    id: "loop-power-check-3",
    question: "What happens if a loop has too many loads?",
    options: [
      "The signal becomes stronger",
      "Nothing happens",
      "Voltage insufficiency prevents proper transmitter operation",
      "The loop automatically compensates"
    ],
    correctIndex: 2,
    explanation: "Excessive loop loading causes voltage insufficiency where the power supply cannot maintain adequate voltage for proper transmitter operation, resulting in erratic operation or failure to reach full scale."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the main difference between loop-powered and externally powered devices?",
    options: [
      "Loop-powered devices are more accurate",
      "Loop-powered devices get their operating power from the 4-20mA loop current, while externally powered devices have separate power supply connections",
      "Externally powered devices use AC power",
      "There is no significant difference"
    ],
    correctAnswer: 1,
    explanation: "Loop-powered devices derive their operating power directly from the 4-20mA loop current using only two wires, while externally powered devices have separate power supply connections independent of the signal loop."
  },
  {
    id: 2,
    question: "Which configuration uses fewer wires?",
    options: [
      "Externally powered uses fewer wires",
      "Loop-powered uses fewer wires (2-wire vs 4-wire configuration)",
      "Both use the same number of wires",
      "It depends on the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "Loop-powered devices use a 2-wire configuration where the same two wires carry both power and signal, while externally powered devices typically require 4 wires (2 for power, 2 for signal)."
  },
  {
    id: 3,
    question: "What is the typical power limitation of loop-powered devices at 4mA?",
    options: [
      "No power limitation",
      "Approximately 40mW when operating at minimum current with typical 10V drop",
      "Over 1 watt available",
      "Power is constant regardless of current"
    ],
    correctAnswer: 1,
    explanation: "At 4mA with a typical 10V device drop, available power is approximately 40mW (4mA x 10V = 40mW), which limits features like backlit displays and advanced processing."
  },
  {
    id: 4,
    question: "When would you choose an externally powered transmitter?",
    options: [
      "For remote locations with no power infrastructure",
      "When advanced features, diagnostics, displays, or multiple outputs are required",
      "When cost is the primary concern",
      "For all basic temperature measurements"
    ],
    correctAnswer: 1,
    explanation: "Externally powered transmitters are chosen when applications require features that demand more power than the loop can provide, such as backlit displays, HART communication, data logging, or relay outputs."
  },
  {
    id: 5,
    question: "What is the risk of excessive loop loading?",
    options: [
      "The signal becomes stronger",
      "Nothing happens",
      "The transmitter may operate erratically, fail to reach full scale, or stop working entirely",
      "The loop automatically compensates"
    ],
    correctAnswer: 2,
    explanation: "Excessive loop loading causes voltage insufficiency where the power supply cannot maintain adequate voltage for proper transmitter operation, resulting in erratic operation, inability to reach 20mA full scale, or complete failure."
  },
  {
    id: 6,
    question: "What is the maximum loop resistance formula?",
    options: [
      "R_max = V_supply x I_max",
      "R_max = (V_supply - V_transmitter_min) / I_max",
      "R_max = I_max / V_supply",
      "R_max = V_supply + V_transmitter_min"
    ],
    correctAnswer: 1,
    explanation: "The maximum loop resistance is calculated by dividing the available voltage (supply voltage minus minimum transmitter operating voltage) by the maximum current (20mA)."
  },
  {
    id: 7,
    question: "Which applications are best suited for loop-powered devices?",
    options: [
      "Complex process control with multiple outputs",
      "Remote locations, hazardous areas, and basic measurements where simplicity is valued",
      "Applications requiring backlit displays",
      "High-speed data logging applications"
    ],
    correctAnswer: 1,
    explanation: "Loop-powered devices excel in remote locations, hazardous areas (simpler intrinsic safety), and basic measurement applications where installation simplicity and cost savings are priorities."
  },
  {
    id: 8,
    question: "What is hybrid configuration in instrumentation?",
    options: [
      "Using AC and DC power together",
      "Devices that can operate in either loop-powered or externally powered mode",
      "Combining analogue and digital signals",
      "Using multiple transmitters in one loop"
    ],
    correctAnswer: 1,
    explanation: "Some modern smart transmitters can operate in both 2-wire loop-powered and 4-wire externally powered configurations, selectable via jumper or software settings."
  },
  {
    id: 9,
    question: "Why is hazardous area design simpler with loop-powered devices?",
    options: [
      "They use higher voltage",
      "Fewer intrinsic safety barriers are required due to the simpler 2-wire configuration",
      "They are explosion-proof",
      "They do not require certification"
    ],
    correctAnswer: 1,
    explanation: "Loop-powered devices require fewer intrinsic safety barriers because the simpler 2-wire configuration has less energy in the circuit, making intrinsic safety design more straightforward."
  },
  {
    id: 10,
    question: "What is a common cause of wiring configuration faults?",
    options: [
      "Using the correct cable",
      "Wiring an externally powered device as loop-powered or vice versa",
      "Using proper terminations",
      "Following the wiring diagram"
    ],
    correctAnswer: 1,
    explanation: "A common fault is incorrectly wiring externally powered devices as loop-powered (or vice versa), which can result in no output, device damage, or incorrect polarity issues."
  }
];

const faqs = [
  {
    question: "Can I convert a loop-powered device to externally powered?",
    answer: "Not typically. The power circuitry is fundamentally different. Loop-powered devices are designed to operate on minimal power from the loop current, while externally powered devices have separate power input circuits. You would need to replace the device entirely."
  },
  {
    question: "What happens if I connect a 4-wire device with only 2 wires?",
    answer: "The device will not operate. Externally powered (4-wire) devices require their separate power supply connection to function. Without power on the dedicated power terminals, the device cannot generate any output signal."
  },
  {
    question: "How do I know if my device is loop-powered or externally powered?",
    answer: "Check the device specifications or terminal markings. Loop-powered devices typically have only two terminals marked + and - for the loop connection. Externally powered devices have separate power terminals (often marked PWR+ and PWR-) plus signal output terminals."
  },
  {
    question: "Can loop-powered devices support HART communication?",
    answer: "Yes, many loop-powered devices support HART communication, though functionality may be limited at low currents (near 4mA) due to power constraints. Full HART functionality is typically available above 3.5mA where sufficient power exists for the digital communication."
  },
  {
    question: "What is the typical compliance voltage for smart transmitters?",
    answer: "Smart transmitters with HART capability typically require 10.5V to 16V compliance voltage, compared to 8-12V for basic transmitters. This higher requirement reduces the maximum allowable loop resistance."
  }
];

const InstrumentationModule7Section2 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="..">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Loop-Powered vs Externally Powered</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 7 - Section 2</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Loop-Powered vs Externally Powered Devices
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Understanding power configurations for instrumentation systems
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Loop-Powered:</span> 2-wire, power from signal loop, simple installation
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Externally Powered:</span> 4-wire, separate power supply, more features
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Trade-off:</span> Simplicity vs capability and features
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Key Risk:</span> Excessive loop loading causes signal failure
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Distinguish between loop-powered and externally powered devices",
            "Identify the advantages and limitations of each configuration",
            "Select the appropriate power configuration for different applications",
            "Understand fault risks with incorrect power configurations",
            "Calculate loop loading and power requirements"
          ].map((outcome, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-elec-yellow mt-0.5 shrink-0" />
              <span className="text-white/80 text-sm">{outcome}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-6 pb-8">
        {/* Section 01 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">01</span>
            <h2 className="text-xl font-semibold text-white">Loop-Powered Devices (2-Wire)</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Loop-powered devices derive their operating power directly from the 4-20mA current loop itself. This elegant design means only two wires are required for both power and signal transmission.
            </p>
            <p>
              <span className="text-white font-medium">Power Source:</span> The loop current provides operating power. At 4mA with a typical 10V device voltage drop, approximately 40mW is available. At 20mA, up to 200mW can be extracted.
            </p>
            <p>
              <span className="text-white font-medium">Design Constraint:</span> The device must operate reliably at minimum power (4mA condition), which limits features like backlit displays and extensive signal processing.
            </p>
            <p>
              <span className="text-white font-medium">Wiring Simplicity:</span> With only two terminals for the loop connection, installation is straightforward. The same cable carries both power to the device and the measurement signal back to the control system.
            </p>
            <p>
              <span className="text-white font-medium">Typical Applications:</span> Basic transmitters, simple indicators, remote locations without power infrastructure, hazardous area installations where simplicity aids intrinsic safety.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Externally Powered Devices (4-Wire)</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Externally powered devices have separate power supply connections independent of the signal loop. This provides unlimited power for advanced features and processing.
            </p>
            <p>
              <span className="text-white font-medium">Power Configuration:</span> Typically requires 24VDC on dedicated power terminals (2 wires), plus signal output terminals (2 wires), totalling a 4-wire configuration.
            </p>
            <p>
              <span className="text-white font-medium">Enhanced Capabilities:</span> With dedicated power, these devices can support backlit LCD displays, full HART communication, extensive diagnostics, data logging, multiple outputs, and relay contacts.
            </p>
            <p>
              <span className="text-white font-medium">Current Sourcing:</span> The device actively sources the 4-20mA signal to the loop rather than modulating current passing through it. This allows more precise signal generation.
            </p>
            <p>
              <span className="text-white font-medium">Isolation Options:</span> Power and signal circuits can be galvanically isolated, preventing ground loops and improving noise immunity in complex installations.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Applications and Selection Criteria</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Selecting between loop-powered and externally powered devices requires evaluating application requirements, installation constraints, and total cost of ownership.
            </p>
            <p>
              <span className="text-white font-medium">Choose Loop-Powered When:</span> Installation simplicity is valued, remote locations lack power infrastructure, hazardous area requirements favour minimal energy, basic measurements suffice, or cable costs are significant over long runs.
            </p>
            <p>
              <span className="text-white font-medium">Choose Externally Powered When:</span> Advanced features are required (displays, diagnostics, HART), multiple outputs needed, high-accuracy measurements critical, local operator interface required, or data logging functionality needed.
            </p>
            <p>
              <span className="text-white font-medium">Cost Considerations:</span> Loop-powered devices save on cable costs and installation labour but may have higher device costs. Externally powered devices require power distribution infrastructure but offer greater functionality.
            </p>
            <p>
              <span className="text-white font-medium">Hybrid Devices:</span> Some smart transmitters offer configurable operation in either 2-wire or 4-wire mode, providing flexibility during design and future expansion.
            </p>
          </div>
        </section>

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Fault Risks and Prevention</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Incorrect power configurations can cause serious operational problems ranging from erratic readings to complete system failure.
            </p>
            <p>
              <span className="text-white font-medium">Excessive Loop Loading:</span> Adding too many devices or loads to a loop-powered system causes voltage insufficiency. Symptoms include erratic transmitter operation, inability to reach 20mA full scale, or complete failure.
            </p>
            <p>
              <span className="text-white font-medium">Power Supply Mismatch:</span> Under-voltage prevents full-scale operation whilst over-voltage risks device damage. Poor regulation causes signal accuracy problems.
            </p>
            <p>
              <span className="text-white font-medium">Wiring Configuration Errors:</span> Connecting externally powered devices as loop-powered (or vice versa) results in no output, potential damage from incorrect polarity, or ground loop issues.
            </p>
            <p>
              <span className="text-white font-medium">Load Calculation:</span> Always calculate total loop resistance before installation. R_max = (V_supply - V_transmitter_min) / I_max. Design for 75% of calculated maximum to provide safety margin.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Practical Guidance */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-elec-yellow" />
            Practical Guidance
          </h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <span className="text-white font-medium">Verification:</span> Always check device specifications for power requirements before installation. Look for compliance voltage ratings and power consumption figures.
            </p>
            <p>
              <span className="text-white font-medium">Loop testing:</span> When troubleshooting, measure voltage across the transmitter at both 4mA and 20mA conditions to verify adequate power availability across the full range.
            </p>
            <p>
              <span className="text-white font-medium">Documentation:</span> Record power configuration details in loop diagrams to prevent future maintenance errors when devices are replaced.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz
          title="Loop-Powered vs Externally Powered Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-1">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-3">
            <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstrumentationModule7Section2;
