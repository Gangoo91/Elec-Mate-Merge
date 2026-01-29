import { ArrowLeft, Droplets, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "System Curves and Operating Points - HNC Module 2 Section 2.6";
const DESCRIPTION = "Master system resistance curves, pump-system matching, parallel and series pump operation, and variable speed drive applications for building services HVAC systems.";

const quickCheckQuestions = [
  {
    id: "system-curve-shape",
    question: "What is the general shape of a system resistance curve?",
    options: ["Straight line", "Parabolic (H ∝ Q²)", "Exponential", "Inverse"],
    correctIndex: 1,
    explanation: "System resistance curves are parabolic because friction head loss is proportional to velocity squared (and therefore flow squared). The equation is H = H_static + KQ², creating a characteristic parabolic shape."
  },
  {
    id: "operating-point",
    question: "Where is the operating point on a pump-system diagram?",
    options: ["At maximum pump head", "Where pump curve intersects system curve", "At maximum pump flow", "At the pump BEP"],
    correctIndex: 1,
    explanation: "The operating point is where the pump curve intersects the system curve. At this point, the pump delivers exactly the head required by the system at that flow rate - the system is in equilibrium."
  },
  {
    id: "pumps-parallel",
    question: "What is the effect of running two identical pumps in parallel?",
    options: ["Head doubles, flow unchanged", "Flow doubles at any head", "Flow increases but less than doubles at the operating point", "No change in performance"],
    correctIndex: 2,
    explanation: "In parallel, flows add at the same head. However, because the system curve is parabolic, the actual flow increase at the operating point is less than double - typically 40-60% more flow, not 100%."
  },
  {
    id: "vsd-benefits",
    question: "Why are variable speed drives (VSDs) energy efficient for pumps?",
    options: ["They increase pump efficiency", "Power reduces with cube of speed (P ∝ N³)", "They eliminate friction losses", "They increase system head"],
    correctIndex: 1,
    explanation: "The affinity laws show P ∝ N³. Reducing pump speed by 20% reduces power by nearly 50%. VSDs match pump output to actual demand, avoiding wasteful throttling or bypass control methods."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A system has 5m static head and requires 15m total head at 10 l/s design flow. What is the system constant K?",
    options: ["0.1", "1.0", "1.5", "10"],
    correctAnswer: 1,
    explanation: "Using H = H_static + KQ²: 15 = 5 + K(10)². Therefore K = (15-5)/100 = 0.1. The friction component is 10m at 10 l/s."
  },
  {
    id: 2,
    question: "If flow through a system doubles, by what factor does the friction head loss increase?",
    options: ["2 times", "4 times", "8 times", "Stays the same"],
    correctAnswer: 1,
    explanation: "Friction head is proportional to Q². If Q doubles, friction head increases by 2² = 4 times. This is why system curves are parabolic - doubling flow quadruples the friction loss."
  },
  {
    id: 3,
    question: "Two identical pumps are connected in series. What happens to the combined performance?",
    options: [
      "Flow doubles, head unchanged",
      "Head doubles, flow unchanged",
      "Both flow and head double",
      "Head approximately doubles at any given flow"
    ],
    correctAnswer: 3,
    explanation: "In series, heads add at the same flow rate. Two identical pumps in series approximately double the available head at any given flow rate, useful for high-rise buildings requiring high lift."
  },
  {
    id: 4,
    question: "A variable volume HVAC system uses 2-port control valves. As valves close, what happens to the system curve?",
    options: [
      "It shifts left (steeper)",
      "It shifts right (flatter)",
      "It stays the same",
      "It becomes a straight line"
    ],
    correctAnswer: 0,
    explanation: "Closing control valves increases system resistance. The system curve becomes steeper (shifts left), reducing flow. Without VSD control, the pump would ride up its curve, increasing head and wasting energy."
  },
  {
    id: 5,
    question: "What is the main advantage of differential pressure control on a VSD pump?",
    options: [
      "Maintains constant flow rate",
      "Maintains constant head across the system, matching pump speed to demand",
      "Maximises pump efficiency",
      "Prevents cavitation"
    ],
    correctAnswer: 1,
    explanation: "Differential pressure control maintains constant head across the hydraulic circuit (e.g., across the index circuit). As control valves modulate, the VSD adjusts pump speed to maintain the setpoint, saving energy."
  },
  {
    id: 6,
    question: "A pump operates at duty point 15 l/s, 20m head. Using a VSD, speed is reduced until the pump delivers 12 l/s. What is the approximate new head?",
    options: ["12.8m", "16m", "20m", "25m"],
    correctAnswer: 0,
    explanation: "Using affinity laws: speed ratio = 12/15 = 0.8, H₂ = H₁ × (N₂/N₁)² = 20 × 0.64 = 12.8m. The pump moves along an affinity law line, not the system curve."
  },
  {
    id: 7,
    question: "What problem can occur if a pump operates at very low flow (far left of its curve)?",
    options: [
      "Cavitation only",
      "Motor overheating due to reduced cooling flow through pump",
      "Excessive flow noise",
      "Low discharge pressure"
    ],
    correctAnswer: 1,
    explanation: "At low flows, less water passes through the pump to cool the motor (especially for wet-rotor designs). Additionally, recirculation within the pump generates heat. Minimum flow valves or VSDs with minimum speed settings prevent this."
  },
  {
    id: 8,
    question: "In a primary-secondary pumping system, what is the purpose of the bypass (common) pipe?",
    options: [
      "To increase total system flow",
      "To hydraulically decouple primary and secondary circuits",
      "To reduce pump head requirement",
      "To eliminate the need for control valves"
    ],
    correctAnswer: 1,
    explanation: "The bypass pipe hydraulically decouples the circuits. Primary pumps maintain constant boiler/chiller flow regardless of secondary demand. Secondary pumps independently control building distribution, enabling variable flow without affecting plant equipment."
  },
  {
    id: 9,
    question: "When should you consider parallel pumps rather than a single larger pump?",
    options: [
      "When space is limited",
      "For variable demand systems, redundancy, and better part-load efficiency",
      "When NPSH is critical",
      "For constant flow systems only"
    ],
    correctAnswer: 1,
    explanation: "Parallel pumps provide: redundancy (N+1 design), better part-load efficiency (one pump at high efficiency vs. oversized pump at low efficiency), staged capacity, and flexibility. Common in HVAC where loads vary significantly."
  },
  {
    id: 10,
    question: "A system curve passes through the origin. What does this indicate?",
    options: [
      "The system has no friction losses",
      "The system has no static head - friction losses only",
      "The pump cannot operate in this system",
      "The system has maximum efficiency"
    ],
    correctAnswer: 1,
    explanation: "A system curve through the origin (H = KQ²) indicates zero static head - only friction losses. This is typical of closed-loop heating/cooling systems where supply and return are at the same level (pressurised circuits)."
  },
  {
    id: 11,
    question: "What happens to the pump operating point if the system develops an air lock or blockage?",
    options: [
      "Moves to higher flow, lower head",
      "Moves to lower flow, higher head (towards shutoff)",
      "Stays at the same point",
      "Moves along the system curve"
    ],
    correctAnswer: 1,
    explanation: "A blockage or air lock increases system resistance dramatically. The system curve shifts left, causing the operating point to move up the pump curve towards shutoff - low flow, high head, potential pump damage."
  },
  {
    id: 12,
    question: "In a VSD-controlled pump system, what is the typical minimum speed limit and why?",
    options: [
      "10% - to save maximum energy",
      "30-40% - to ensure adequate motor cooling and prevent recirculation",
      "50% - for constant pressure",
      "80% - to maintain efficiency"
    ],
    correctAnswer: 1,
    explanation: "Minimum speed is typically 30-40% of full speed. Below this: motor cooling may be inadequate, pump efficiency drops significantly, recirculation causes heating, and bearings may not be properly lubricated. Some systems use minimum flow valves."
  }
];

const faqs = [
  {
    question: "What is the difference between static head and friction head?",
    answer: "Static head is the elevation difference between suction and discharge levels - it's constant regardless of flow. Friction head is the energy lost to pipe friction, fittings, and equipment - it increases with the square of flow rate. Total system head = static head + friction head. Closed loops have minimal static head; open systems (cooling towers, boosters) have significant static head."
  },
  {
    question: "How do I determine if my pump is oversized?",
    answer: "Signs of an oversized pump: operating point far left of BEP, control valves frequently nearly closed, high differential pressure across balancing valves, excessive noise and vibration, motor running cool (underloaded). Solutions: trim the impeller, install a VSD, or replace with a correctly sized pump. Check commissioning records against actual operating conditions."
  },
  {
    question: "When should I use pumps in series vs. parallel?",
    answer: "Use series for high head requirements (high-rise buildings, long distribution runs) where one pump cannot achieve the required lift. Use parallel for variable demand (HVAC), redundancy requirements (N+1), staged capacity, and when floor space suits multiple smaller pumps. Most HVAC systems use parallel pumps for flexibility and efficiency."
  },
  {
    question: "What is the minimum flow requirement for a pump?",
    answer: "Pumps require minimum flow (typically 10-25% of BEP flow) to prevent overheating, recirculation damage, and bearing wear. Methods to ensure minimum flow: bypass valve (wastes energy), VSD with minimum speed setting, proper system design with adequate base load. Check manufacturer's data for specific requirements."
  },
  {
    question: "How do variable speed drives save energy compared to throttling valves?",
    answer: "Throttling valves increase system resistance, moving the operating point up the pump curve - the pump still consumes significant power while flow reduces. VSDs reduce pump speed, moving down affinity law lines - power reduces with the cube of speed. A 20% flow reduction by throttling might save 10% power; with VSD, it saves nearly 50%."
  },
  {
    question: "What control strategy should I use for a VSD pump?",
    answer: "Common strategies: Constant pressure (setpoint at pump discharge) - simple but wastes energy at low loads. Differential pressure (setpoint across index circuit) - better efficiency, maintains control valve authority. Sensorless (estimates differential pressure) - good efficiency, simpler installation. Proportional pressure (setpoint reduces with flow) - best efficiency for variable volume systems."
  }
];

const HNCModule2Section2_6 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Droplets className="h-4 w-4" />
            <span>Module 2.2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            System Curves and Operating Points
          </h1>
          <p className="text-white/80">
            Matching pumps to systems, parallel/series operation, and variable speed control
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>System Curve:</strong> H = H_static + KQ² (parabolic)</li>
              <li className="pl-1"><strong>Operating Point:</strong> Pump curve meets system curve</li>
              <li className="pl-1"><strong>Parallel:</strong> Flows add at same head</li>
              <li className="pl-1"><strong>Series:</strong> Heads add at same flow</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Variable volume:</strong> VSD control saves 50%+ energy</li>
              <li className="pl-1"><strong>Redundancy:</strong> Parallel pumps for N+1 backup</li>
              <li className="pl-1"><strong>High-rise:</strong> Series pumps or booster sets</li>
              <li className="pl-1"><strong>Closed loops:</strong> Zero static head systems</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Construct and interpret system resistance curves",
              "Determine pump-system operating points",
              "Analyse parallel and series pump configurations",
              "Apply variable speed drive control strategies",
              "Understand primary-secondary pumping systems",
              "Optimise pump selection for energy efficiency"
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

        {/* Section 1: System Resistance Curves */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            System Resistance Curves
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A system resistance curve shows the head required to move fluid through a piping system
              at various flow rates. Understanding this curve is essential for pump selection and control.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Curve Equation</p>
              <p className="font-mono text-center text-lg mb-2">H<sub>system</sub> = H<sub>static</sub> + KQ²</p>
              <div className="text-xs text-white/70 mt-3">
                <p><strong>H<sub>static</sub></strong> = Elevation difference (constant, independent of flow)</p>
                <p><strong>K</strong> = System resistance coefficient (depends on pipe size, length, fittings)</p>
                <p><strong>Q</strong> = Volumetric flow rate</p>
                <p><strong>KQ²</strong> = Friction head loss (increases with square of flow)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key characteristics:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Parabolic shape:</strong> Friction loss proportional to Q²</li>
                <li className="pl-1"><strong>Y-intercept:</strong> Static head (zero for closed loops)</li>
                <li className="pl-1"><strong>Steepness:</strong> Indicates system resistance - steeper = more resistance</li>
                <li className="pl-1"><strong>Shifts:</strong> Valve positions change the system curve</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">System Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Static Head</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Curve Shape</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Closed loop</td>
                      <td className="border border-white/10 px-3 py-2">Zero</td>
                      <td className="border border-white/10 px-3 py-2">Through origin (H = KQ²)</td>
                      <td className="border border-white/10 px-3 py-2">HVAC heating/cooling</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open - lifting</td>
                      <td className="border border-white/10 px-3 py-2">Positive</td>
                      <td className="border border-white/10 px-3 py-2">Offset above origin</td>
                      <td className="border border-white/10 px-3 py-2">Booster sets, cooling towers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open - gravity assist</td>
                      <td className="border border-white/10 px-3 py-2">Negative</td>
                      <td className="border border-white/10 px-3 py-2">Starts below zero</td>
                      <td className="border border-white/10 px-3 py-2">Drainage from elevated tank</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> For closed-loop HVAC systems, static head is zero - the pump only needs to overcome friction losses. This simplifies pump selection significantly.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Operating Point Analysis */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Operating Point Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The operating point is where the pump curve intersects the system curve. At this point,
              the pump delivers exactly the head the system requires - the system is in equilibrium.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Finding the operating point:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Plot the pump H-Q curve from manufacturer data</li>
                <li className="pl-1">Plot the system curve using H = H_static + KQ²</li>
                <li className="pl-1">The intersection is the operating point</li>
                <li className="pl-1">Check this point falls within 70-120% of pump BEP</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operating Point Shifts</p>
              <p className="text-sm text-white mb-3">
                Changes to the system affect where the operating point falls:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Change</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Effect on System Curve</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Operating Point Moves</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Valves close</td>
                      <td className="border border-white/10 px-3 py-2">Curve becomes steeper</td>
                      <td className="border border-white/10 px-3 py-2">Left and up (less flow, more head)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Valves open</td>
                      <td className="border border-white/10 px-3 py-2">Curve becomes flatter</td>
                      <td className="border border-white/10 px-3 py-2">Right and down (more flow, less head)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Blockage/air lock</td>
                      <td className="border border-white/10 px-3 py-2">Curve much steeper</td>
                      <td className="border border-white/10 px-3 py-2">Far left towards shutoff</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Pump speed reduced</td>
                      <td className="border border-white/10 px-3 py-2">Pump curve shifts down</td>
                      <td className="border border-white/10 px-3 py-2">Left along system curve</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-red-400/80 mb-2">Poor Operating Point Consequences</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Too far left:</strong> Low flow, overheating, recirculation damage</li>
                <li className="pl-1"><strong>Too far right:</strong> Motor overload, cavitation risk, low head</li>
                <li className="pl-1"><strong>Away from BEP:</strong> Poor efficiency, increased vibration and noise</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection rule:</strong> Choose a pump where the design operating point falls on the pump curve within 80-110% of the BEP flow rate for optimal efficiency and reliability.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Parallel and Series Pump Operation */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Parallel and Series Pump Operation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multiple pumps can be arranged in parallel or series to achieve performance beyond
              a single pump's capability, or to provide redundancy and flexibility.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pumps in Parallel</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Principle:</strong> Flows add at any given head</li>
                <li className="pl-1"><strong>Combined curve:</strong> Add Q values horizontally at each H</li>
                <li className="pl-1"><strong>Applications:</strong> Variable demand, redundancy, staged capacity</li>
                <li className="pl-1"><strong>Caution:</strong> Flow increase less than double due to parabolic system curve</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Parallel Pump Reality Check</p>
              <p className="text-sm text-white mb-3">
                Due to the parabolic system curve, adding a second identical pump does NOT double the flow:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">One pump operating: 100% design flow at 100% head</li>
                <li className="pl-1">Two pumps operating: typically 140-160% flow (not 200%)</li>
                <li className="pl-1">Each pump operates at a different point on its curve</li>
                <li className="pl-1">Ensure both pumps have non-return valves to prevent backflow</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pumps in Series</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Principle:</strong> Heads add at any given flow</li>
                <li className="pl-1"><strong>Combined curve:</strong> Add H values vertically at each Q</li>
                <li className="pl-1"><strong>Applications:</strong> High-rise buildings, booster sets, long pipework runs</li>
                <li className="pl-1"><strong>Caution:</strong> Second pump casing must withstand combined pressure</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Configuration Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Parallel</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Series</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flow increase</td>
                      <td className="border border-white/10 px-3 py-2">Yes (40-60% more)</td>
                      <td className="border border-white/10 px-3 py-2">No (same flow)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Head increase</td>
                      <td className="border border-white/10 px-3 py-2">No (same head)</td>
                      <td className="border border-white/10 px-3 py-2">Yes (nearly double)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Redundancy</td>
                      <td className="border border-white/10 px-3 py-2">Excellent (N+1)</td>
                      <td className="border border-white/10 px-3 py-2">None (both required)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical use</td>
                      <td className="border border-white/10 px-3 py-2">HVAC variable load</td>
                      <td className="border border-white/10 px-3 py-2">High-rise boosters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>HVAC practice:</strong> Most building services use duty/standby or duty/assist parallel pump arrangements. Series pumps are mainly found in high-rise pressure boosting applications.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Variable Speed Drives */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Variable Speed Drives (VSDs)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Variable speed drives adjust pump speed to match system demand, following the affinity laws
              for dramatic energy savings compared to throttling or bypass control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Energy Savings</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Throttling</p>
                  <p className="text-white/70 text-xs">Pump at full speed</p>
                  <p className="text-red-400 text-xs">Poor efficiency</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">Bypass</p>
                  <p className="text-white/70 text-xs">Constant flow pump</p>
                  <p className="text-red-400 text-xs">Wastes energy</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-bold text-elec-yellow mb-1">VSD</p>
                  <p className="text-white/70 text-xs">Speed matches load</p>
                  <p className="text-green-400 text-xs">P ∝ N³ savings</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">VSD Control Strategies:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Strategy</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Setpoint</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Energy Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Constant pressure</td>
                      <td className="border border-white/10 px-3 py-2">Fixed at pump discharge</td>
                      <td className="border border-white/10 px-3 py-2">Good</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Differential pressure</td>
                      <td className="border border-white/10 px-3 py-2">Across index circuit</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Better</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Proportional pressure</td>
                      <td className="border border-white/10 px-3 py-2">Varies with flow</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Best</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sensorless</td>
                      <td className="border border-white/10 px-3 py-2">Estimated from pump data</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">Very good</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">VSD Operating Limits</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Minimum speed:</strong> 30-40% to ensure motor cooling and pump stability</li>
                <li className="pl-1"><strong>Maximum speed:</strong> Typically 50Hz/60Hz nameplate, some allow 10% overspeed</li>
                <li className="pl-1"><strong>Minimum flow:</strong> Use bypass valve if system can close off completely</li>
                <li className="pl-1"><strong>NPSH:</strong> Check NPSHa at all operating points, not just design</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary-Secondary Systems</p>
              <p className="text-sm text-white mb-3">
                Modern HVAC often uses primary-secondary pumping with VSD on secondary:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Primary:</strong> Constant flow through boiler/chiller (fixed speed)</li>
                <li className="pl-1"><strong>Secondary:</strong> Variable flow to building (VSD controlled)</li>
                <li className="pl-1"><strong>Bypass:</strong> Hydraulically decouples the two circuits</li>
                <li className="pl-1"><strong>Benefit:</strong> Variable building flow without affecting plant equipment</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Energy saving:</strong> A VSD pump operating at 50% load for 50% of the time saves approximately 75% of the energy compared to a fixed-speed pump with throttling control.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: System Curve Construction</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A closed-loop HVAC system requires 25m head at 20 l/s design flow. Construct the system curve equation and find the head at 15 l/s.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Closed loop: H_static = 0 (no elevation head)</p>
                <p className="mt-2">Using H = KQ² at design point:</p>
                <p>25 = K × (20)²</p>
                <p>K = 25/400 = <strong>0.0625</strong></p>
                <p className="mt-2">System curve: H = 0.0625Q²</p>
                <p className="mt-2">At Q = 15 l/s:</p>
                <p>H = 0.0625 × (15)² = 0.0625 × 225 = <strong>14.1m</strong></p>
                <p className="mt-2 text-white/60">→ Head reduces with square of flow reduction</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Parallel Pump Operation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A single pump delivers 18 l/s at its operating point with this system. If an identical second pump is started in parallel, estimate the new total flow.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>System: H = 0.0625Q² (from Example 1)</p>
                <p className="mt-2">Two identical pumps: combined flow = Q₁ + Q₂ at same head</p>
                <p>At operating point, both pumps operate at same head</p>
                <p className="mt-2">If each pump gives 18 l/s at H = 20.25m with single pump:</p>
                <p>Two pumps can deliver more, but system curve limits actual increase</p>
                <p className="mt-2">Approximate: total flow ≈ 18 × 1.4 to 1.5 = <strong>25-27 l/s</strong></p>
                <p className="mt-2">New head: H = 0.0625 × (26)² ≈ <strong>42m</strong></p>
                <p className="mt-2 text-white/60">→ 44% flow increase, not 100% (due to parabolic system curve)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: VSD Energy Savings</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A pump runs at full speed consuming 4 kW. The system only requires 60% of design flow. Compare power with throttling vs. VSD control.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Throttling control:</strong></p>
                <p>Pump still runs at full speed</p>
                <p>Power reduction from reduced flow ≈ 10-15%</p>
                <p>Estimated power ≈ 3.4-3.6 kW</p>
                <p className="mt-2"><strong>VSD control:</strong></p>
                <p>Speed ratio = 0.6 (to achieve 60% flow)</p>
                <p>Power ratio = (0.6)³ = 0.216</p>
                <p>Power = 4 × 0.216 = <strong>0.86 kW</strong></p>
                <p className="mt-2 text-green-400">✓ VSD saves 4.0 - 0.86 = 3.14 kW (78% reduction)</p>
                <p className="text-green-400">✓ Throttling saves only ~0.5 kW (12% reduction)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>H = H_static + KQ²</strong> — System curve equation</li>
                <li className="pl-1"><strong>K = (H - H_static) / Q²</strong> — Find system constant</li>
                <li className="pl-1"><strong>Parallel:</strong> Q_total = Q₁ + Q₂ at same H</li>
                <li className="pl-1"><strong>Series:</strong> H_total = H₁ + H₂ at same Q</li>
                <li className="pl-1"><strong>P ∝ N³</strong> — VSD power savings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Design Values</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Operating point: <strong>80-110%</strong> of BEP flow</li>
                <li className="pl-1">Parallel flow increase: <strong>40-60%</strong> (not 100%)</li>
                <li className="pl-1">VSD minimum speed: <strong>30-40%</strong></li>
                <li className="pl-1">Closed loop static head: <strong>Zero</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Assuming doubled flow:</strong> Parallel pumps do not double flow</li>
                <li className="pl-1"><strong>Ignoring system curve:</strong> Must plot both pump and system</li>
                <li className="pl-1"><strong>VSD too slow:</strong> Minimum speed limits prevent damage</li>
                <li className="pl-1"><strong>No NRVs:</strong> Parallel pumps need non-return valves</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">System Curves</p>
                <ul className="space-y-0.5">
                  <li>H = H_static + KQ² (parabolic)</li>
                  <li>Closed loop: H_static = 0</li>
                  <li>Operating point: pump meets system</li>
                  <li>Valve closing: curve steepens</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Pump Arrangements</p>
                <ul className="space-y-0.5">
                  <li>Parallel: flows add (same head)</li>
                  <li>Series: heads add (same flow)</li>
                  <li>VSD: P ∝ N³ (cube law savings)</li>
                  <li>Min speed: 30-40% for cooling</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section2-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Pump Characteristics
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module2-section3">
              Next: Section 3
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule2Section2_6;
