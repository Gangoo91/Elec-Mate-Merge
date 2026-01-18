import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Loop Design and Load Calculations - Instrumentation Module 7";
const DESCRIPTION = "Master loop design principles including voltage drop calculations, compliance voltage, maximum loop resistance, and power supply requirements for reliable 4-20mA instrumentation systems.";

const quickCheckQuestions = [
  {
    id: "loop-calc-check-1",
    question: "What is the formula for calculating voltage drop in a loop?",
    options: [
      "V = P / I",
      "V = I x R (Ohm's Law)",
      "V = R / I",
      "V = I / R"
    ],
    correctIndex: 1,
    explanation: "Voltage drop is calculated using Ohm's Law: V = I x R, where voltage drop equals the loop current multiplied by the resistance of the component."
  },
  {
    id: "loop-calc-check-2",
    question: "Why is compliance voltage important in loop design?",
    options: [
      "It determines the cable colour",
      "It determines the maximum allowable loop resistance",
      "It sets the signal range",
      "It affects calibration only"
    ],
    correctIndex: 1,
    explanation: "Compliance voltage is the minimum voltage required across a transmitter for proper operation. It determines the maximum allowable loop resistance using the formula R_max = (V_supply - V_compliance) / I_max."
  },
  {
    id: "loop-calc-check-3",
    question: "What is the typical power supply voltage for a 4-20mA loop?",
    options: [
      "12VDC",
      "24VDC with plus or minus 10% tolerance",
      "48VDC",
      "5VDC"
    ],
    correctIndex: 1,
    explanation: "The industry standard power supply voltage for 4-20mA loops is 24VDC with plus or minus 10% tolerance (21.6V to 26.4V) with good voltage regulation and low ripple."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the formula for calculating voltage drop in a loop?",
    options: [
      "V = I x R (Ohm's Law) - voltage drop equals current times resistance",
      "V = P / I",
      "V = R / I",
      "V = I / R"
    ],
    correctAnswer: 0,
    explanation: "Voltage drop is calculated using Ohm's Law: V = I x R, where voltage drop equals the loop current multiplied by the resistance of the component."
  },
  {
    id: 2,
    question: "Why is it important to know the compliance voltage?",
    options: [
      "It determines the cable colour",
      "It determines the maximum allowable loop resistance - the transmitter needs minimum voltage to operate properly",
      "It sets the current range",
      "It affects the signal accuracy only"
    ],
    correctAnswer: 1,
    explanation: "Compliance voltage is the minimum voltage required across a transmitter for proper operation. It determines the maximum allowable loop resistance using the formula R_max = (V_supply - V_compliance) / I_max."
  },
  {
    id: 3,
    question: "What happens when total loop resistance is too high?",
    options: [
      "The signal becomes stronger",
      "Nothing significant occurs",
      "The transmitter cannot reach full scale (20mA), causing signal loss and potential measurement errors",
      "The loop automatically compensates"
    ],
    correctAnswer: 2,
    explanation: "When total loop resistance exceeds the maximum allowable value, the transmitter cannot reach full scale output (20mA) because insufficient voltage remains for proper operation."
  },
  {
    id: 4,
    question: "How can you reduce loop load without losing signal?",
    options: [
      "Increase the current",
      "Use shorter cables, larger cable cross-section, or high-impedance receivers in parallel configurations",
      "Decrease the voltage",
      "Use more transmitters"
    ],
    correctAnswer: 1,
    explanation: "Loop load can be reduced by using shorter cable runs, larger cable cross-sections (lower resistance), or connecting high-impedance receivers in parallel rather than series."
  },
  {
    id: 5,
    question: "What is a typical power supply voltage for a 4-20mA loop?",
    options: [
      "12VDC",
      "24VDC with plus or minus 10% tolerance with good regulation and low ripple",
      "48VDC",
      "5VDC"
    ],
    correctAnswer: 1,
    explanation: "The industry standard power supply voltage for 4-20mA loops is 24VDC with plus or minus 10% tolerance (21.6V to 26.4V) with good voltage regulation and low ripple."
  },
  {
    id: 6,
    question: "What is the maximum loop resistance formula?",
    options: [
      "R_max = V_supply x I_max",
      "R_max = (V_supply - V_compliance) / I_max",
      "R_max = I_max / V_supply",
      "R_max = V_supply + V_compliance"
    ],
    correctAnswer: 1,
    explanation: "Maximum loop resistance equals the available voltage (supply voltage minus compliance voltage) divided by maximum current (20mA)."
  },
  {
    id: 7,
    question: "What safety factor should be applied to loop resistance calculations?",
    options: [
      "No safety factor needed",
      "Design for 75% of calculated maximum resistance",
      "Double the calculated resistance",
      "Add 10 ohms"
    ],
    correctAnswer: 1,
    explanation: "Designing for 75% of calculated maximum provides adequate safety margin for component ageing, temperature effects, and connection degradation."
  },
  {
    id: 8,
    question: "What is the typical compliance voltage for HART-enabled transmitters?",
    options: [
      "5-8V",
      "10.5-16V (higher than basic transmitters)",
      "24V",
      "Same as basic transmitters"
    ],
    correctAnswer: 1,
    explanation: "HART-enabled smart transmitters typically require 10.5-16V compliance voltage, higher than basic transmitters (8-12V), due to digital communication circuitry power requirements."
  },
  {
    id: 9,
    question: "How do you calculate cable resistance for loop design?",
    options: [
      "Cable length only",
      "Cable length x 2 x resistance per metre (accounting for both conductors)",
      "Cable length x resistance per metre",
      "Cable length / resistance per metre"
    ],
    correctAnswer: 1,
    explanation: "Cable resistance equals cable length multiplied by 2 (for both conductors in the loop) multiplied by resistance per metre for the specific cable gauge."
  },
  {
    id: 10,
    question: "What is the purpose of a load resistor in a 4-20mA loop?",
    options: [
      "To increase current",
      "To convert the current signal to a voltage signal for high-impedance inputs",
      "To reduce noise",
      "To power the transmitter"
    ],
    correctAnswer: 1,
    explanation: "A load resistor (typically 250 ohms) converts the 4-20mA current signal to a 1-5V voltage signal for connection to high-impedance voltage inputs like data loggers."
  }
];

const faqs = [
  {
    question: "What if my calculated loop resistance exceeds the maximum?",
    answer: "You have several options: use larger cross-section cable to reduce resistance, choose a transmitter with lower compliance voltage, increase the power supply voltage (if devices permit), use a signal isolator/repeater to split the loop, or relocate equipment to reduce cable length."
  },
  {
    question: "How do parallel receivers affect loop resistance?",
    answer: "Parallel receivers reduce total loop resistance compared to series connection. Calculate using: 1/R_total = 1/R1 + 1/R2 + 1/R3. For example, three 500 ohm receivers in parallel give 166.7 ohms total, much less than 1500 ohms in series."
  },
  {
    question: "What cable resistance value should I use for calculations?",
    answer: "Use the resistance per metre from cable specifications. Typical values: 1.5mm squared copper is approximately 0.011 ohms/metre, 1.0mm squared is approximately 0.017 ohms/metre. Remember to multiply by 2 for both conductors and by the cable length."
  },
  {
    question: "Do I need to consider temperature effects on loop resistance?",
    answer: "Yes, copper resistance increases approximately 0.4% per degree Celsius. For outdoor or high-temperature installations, calculate resistance at maximum expected temperature. A 50 degree Celsius temperature rise increases resistance by approximately 20%."
  },
  {
    question: "What power supply features are important for instrumentation loops?",
    answer: "Key features include voltage regulation (plus or minus 0.1% line and load), low ripple (less than 50mV peak-to-peak), overcurrent protection, input/output isolation (minimum 1500VAC), and adequate current capacity (125% of maximum load with all loops at 20mA)."
  }
];

const InstrumentationModule7Section3 = () => {
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link to="/electrician/upskilling/instrumentation-module-7">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <span className="text-white font-medium truncate">Loop Design and Load Calculations</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 py-6 text-center">
        <div className="inline-flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 rounded-full px-3 py-1 mb-3">
          <Zap className="w-4 h-4 text-elec-yellow" />
          <span className="text-elec-yellow text-sm font-medium">Module 7 - Section 3</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Loop Design and Load Calculations
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
          Engineering reliable 4-20mA instrumentation loops
        </p>
      </div>

      {/* Quick Summary */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Voltage Drop:</span> V = I x R (Ohm's Law applies throughout)
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Compliance:</span> Minimum voltage needed for transmitter operation
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Max Resistance:</span> R_max = (V_supply - V_compliance) / 20mA
            </p>
          </div>
          <div className="bg-elec-yellow/5 border-l-2 border-elec-yellow/50 rounded-r-lg p-3">
            <p className="text-white text-sm">
              <span className="font-semibold text-elec-yellow">Safety Margin:</span> Design for 75% of calculated maximum
            </p>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-white mb-3">What You Will Learn</h2>
        <div className="space-y-2">
          {[
            "Calculate loop loads and voltage drops accurately",
            "Understand compliance voltage and its impact on design",
            "Determine maximum loop resistance for reliable operation",
            "Select appropriate power supplies for instrumentation loops",
            "Apply design rules with proper safety margins"
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
            <h2 className="text-xl font-semibold text-white">Voltage Drop Calculations</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Understanding voltage drops across loop components is fundamental to successful loop design. Every component in the loop consumes voltage, and the sum must not exceed what the power supply can provide.
            </p>
            <p>
              <span className="text-white font-medium">Basic Formula:</span> V = I x R (Ohm's Law). The voltage drop across any component equals the loop current multiplied by that component's resistance.
            </p>
            <p>
              <span className="text-white font-medium">Current Dependency:</span> Voltage drops vary with loop current. At 4mA minimum, drops are low. At 20mA maximum, drops are highest. Always design for the worst case (20mA) condition.
            </p>
            <p>
              <span className="text-white font-medium">Component Contributions:</span> Total drop includes transmitter drop, cable resistance (both conductors), and receiver input resistance. Each must be calculated and summed.
            </p>
            <p>
              <span className="text-white font-medium">Example Calculation:</span> For a 500 ohm total loop resistance at 20mA: V_drop = 0.020A x 500 ohms = 10V. This 10V must be available from the power supply after allowing for transmitter compliance voltage.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[0]]} />

        {/* Section 02 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">02</span>
            <h2 className="text-xl font-semibold text-white">Compliance Voltage and Maximum Resistance</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Compliance voltage is the minimum voltage required across a transmitter for proper operation. This critical parameter determines the maximum allowable loop resistance.
            </p>
            <p>
              <span className="text-white font-medium">Compliance Requirements:</span> Basic transmitters typically require 8-12V, smart transmitters need 10.5-16V, and HART devices often require 11-16V. Always check manufacturer specifications.
            </p>
            <p>
              <span className="text-white font-medium">Maximum Resistance Formula:</span> R_max = (V_supply - V_compliance) / I_max. For a 24V supply and 12V compliance at 20mA: R_max = (24-12) / 0.02 = 600 ohms.
            </p>
            <p>
              <span className="text-white font-medium">Available Resistance:</span> This maximum includes all loop components except the transmitter itself: cable resistance, receiver resistance, any isolators or barriers, and connection resistances.
            </p>
            <p>
              <span className="text-white font-medium">Smart Transmitter Impact:</span> Higher compliance voltage requirements of smart transmitters reduce available resistance. A 16V compliance transmitter on 24V allows only 400 ohms maximum versus 600 ohms for a 12V compliance device.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[1]]} />

        {/* Section 03 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">03</span>
            <h2 className="text-xl font-semibold text-white">Power Supply Requirements</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Selecting the correct power supply ensures reliable loop operation across all conditions. Key parameters include voltage, current capacity, regulation, and protection features.
            </p>
            <p>
              <span className="text-white font-medium">Voltage Requirements:</span> Standard is 24VDC with plus or minus 10% tolerance (21.6V to 26.4V). Ensure minimum voltage is adequate for compliance requirements at maximum temperature.
            </p>
            <p>
              <span className="text-white font-medium">Current Capacity:</span> Calculate total current for all loops at 20mA maximum. Add 125% safety margin. For 8 loops: 8 x 25mA = 200mA minimum capacity, specify 250mA or higher.
            </p>
            <p>
              <span className="text-white font-medium">Regulation:</span> Specify plus or minus 0.1% line and load regulation. Poor regulation causes measurement errors as supply voltage varies with load changes.
            </p>
            <p>
              <span className="text-white font-medium">Ripple:</span> Specify less than 50mV peak-to-peak. Excessive ripple superimposes noise on the 4-20mA signal, degrading measurement accuracy.
            </p>
            <p>
              <span className="text-white font-medium">Protection Features:</span> Include overcurrent limiting, overvoltage protection, reverse polarity protection, and input/output isolation (minimum 1500VAC) for safety and reliability.
            </p>
          </div>
        </section>

        <InlineCheck questions={[quickCheckQuestions[2]]} />

        {/* Section 04 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-elec-yellow/30">04</span>
            <h2 className="text-xl font-semibold text-white">Practical Design Examples</h2>
          </div>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Working through practical examples reinforces loop design principles and builds confidence for real-world applications.
            </p>
            <p>
              <span className="text-white font-medium">Example 1 - Simple Pressure Loop:</span> 150m cable run (1.5mm squared), 250 ohm PLC input, 12V compliance transmitter, 24V supply. Cable: 150 x 2 x 0.011 = 3.3 ohms. Total: 3.3 + 250 = 253.3 ohms. Maximum: (24-12)/0.02 = 600 ohms. Margin: 57.8%. Design acceptable.
            </p>
            <p>
              <span className="text-white font-medium">Example 2 - Multi-Drop Configuration:</span> Three parallel receivers (250, 500, 1000 ohms). Parallel resistance: 1/(1/250 + 1/500 + 1/1000) = 142.9 ohms. This is much lower than 1750 ohms if connected in series, demonstrating the advantage of parallel connections.
            </p>
            <p>
              <span className="text-white font-medium">Example 3 - Load Resistor Sizing:</span> To convert 4-20mA to 1-5V for a data logger: R = delta V / delta I = (5-1) / (0.02-0.004) = 250 ohms. Power: I squared x R = 0.02 squared x 250 = 0.1W. Use 0.25W or higher rated resistor.
            </p>
            <p>
              <span className="text-white font-medium">Safety Factors:</span> Always design for 75% of calculated maximum resistance to allow for component ageing, temperature effects, and connection degradation over the system lifetime.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/20 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-elec-yellow" />
            Practical Guidance
          </h3>
          <div className="space-y-2 text-white/80 text-sm">
            <p>
              <span className="text-white font-medium">Documentation:</span> Record all calculations in design documents. Future modifications require knowing existing loop loading before adding devices.
            </p>
            <p>
              <span className="text-white font-medium">Verification:</span> After installation, verify loop operation at both 4mA and 20mA. Measure voltage across the transmitter to confirm adequate compliance voltage is available.
            </p>
            <p>
              <span className="text-white font-medium">Temperature Consideration:</span> For outdoor installations, calculate cable resistance at maximum expected temperature. Copper resistance increases approximately 0.4% per degree Celsius.
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
          title="Loop Design and Load Calculations Quiz"
          questions={quizQuestions}
        />

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link to="../section-2">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Button>
          </Link>
          <Link to="../section-4">
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

export default InstrumentationModule7Section3;
