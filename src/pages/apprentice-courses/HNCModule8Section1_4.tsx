import { ArrowLeft, Gauge, CheckCircle, Thermometer, Droplets, Settings2, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Radiator Systems - HNC Module 8 Section 1.4";
const DESCRIPTION = "Master radiator system design for building services: radiator sizing and heat output calculations, pipe sizing methods, system balancing using lockshield valves, TRV operation, index circuit identification, and pump sizing for two-pipe systems.";

const quickCheckQuestions = [
  {
    id: "delta-t-correction",
    question: "A radiator is rated at 2000W at Delta T 50K. The system operates at flow 70 degrees C, return 50 degrees C with room temperature 20 degrees C. What correction factor applies?",
    options: ["0.79 (reduced output)", "1.00 (no correction needed)", "1.26 (increased output)", "0.63 (significantly reduced)"],
    correctIndex: 0,
    explanation: "Mean water temperature = (70+50)/2 = 60 degrees C. Delta T = 60 - 20 = 40K. Correction factor for Delta T 40K compared to rated Delta T 50K is approximately 0.79. The radiator will only deliver about 1580W."
  },
  {
    id: "pipe-sizing",
    question: "What is the primary consideration when sizing pipework for a two-pipe heating system?",
    options: ["Minimising material cost", "Keeping velocity below 1.5 m/s and pressure drop within pump capacity", "Using the largest available pipe size", "Matching existing pipework sizes"],
    correctIndex: 1,
    explanation: "Pipe sizing must balance acceptable water velocity (typically &lt;1.5 m/s to avoid noise) with total system pressure drop that the pump can overcome. Too small causes noise and high pressure drop; too large wastes material and slows response."
  },
  {
    id: "index-circuit",
    question: "What is the index circuit in a heating system?",
    options: ["The circuit with the smallest radiator", "The circuit closest to the pump", "The circuit with the greatest resistance to flow", "The circuit serving the living room"],
    correctIndex: 2,
    explanation: "The index circuit is the flow path with the highest total resistance (longest run or most restrictive). The pump must be sized to overcome this resistance whilst providing adequate flow to all radiators."
  },
  {
    id: "trv-function",
    question: "How does a thermostatic radiator valve (TRV) regulate room temperature?",
    options: ["By switching the boiler on and off", "By sensing water temperature and adjusting flow", "By sensing air temperature and modulating flow through the radiator", "By controlling the pump speed"],
    correctIndex: 2,
    explanation: "TRVs contain a wax or liquid-filled sensor that expands/contracts with room air temperature. As room temperature rises, the valve closes to reduce flow through the radiator, maintaining the set temperature."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A room has a calculated heat loss of 2.4kW. Selecting a radiator rated at Delta T 50K, what minimum output rating should you specify?",
    options: [
      "2.0kW - allow for system efficiency",
      "2.4kW - match the heat loss exactly",
      "2.4kW plus 10-15% margin for design safety",
      "3.6kW - always oversize by 50%"
    ],
    correctAnswer: 2,
    explanation: "Best practice is to add a 10-15% margin to the calculated heat loss to account for exposed walls, intermittent heating, and thermal bridging. A 2.4kW room would typically specify 2.6-2.8kW radiator output."
  },
  {
    id: 2,
    question: "What is the standard test condition Delta T for radiator output ratings in the UK?",
    options: ["Delta T 30K", "Delta T 40K", "Delta T 50K", "Delta T 60K"],
    correctAnswer: 2,
    explanation: "UK radiator outputs are rated at Delta T 50K (mean water temperature 75 degrees C minus room temperature 20 degrees C = 55K, but the industry standard uses 50K for calculations). Heat pump systems typically operate at Delta T 30-35K."
  },
  {
    id: 3,
    question: "In a two-pipe system, where should TRVs NOT be installed?",
    options: [
      "In bedrooms",
      "In the room containing the room thermostat",
      "On towel radiators",
      "In north-facing rooms"
    ],
    correctAnswer: 1,
    explanation: "The room containing the main room thermostat should not have a TRV on its radiator. The room stat controls the boiler; if a TRV closed that radiator, the room would cool and the boiler would run continuously trying to satisfy the thermostat."
  },
  {
    id: 4,
    question: "Calculate the water flow rate for a radiator with 3kW output at a 20K temperature drop.",
    options: ["0.036 litres/second", "0.072 litres/second", "0.144 litres/second", "0.216 litres/second"],
    correctAnswer: 0,
    explanation: "Flow rate = Heat output / (specific heat x temp drop) = 3000 / (4186 x 20) = 0.0358 L/s or approximately 0.036 L/s. This equates to about 2.2 litres per minute or 129 litres per hour."
  },
  {
    id: 5,
    question: "What is the typical maximum recommended water velocity in copper pipework for domestic heating systems?",
    options: ["0.5 m/s", "1.0 m/s", "1.5 m/s", "2.5 m/s"],
    correctAnswer: 2,
    explanation: "Water velocity should be kept below 1.5 m/s to avoid noise from turbulence and erosion of fittings. Higher velocities also increase pressure drop significantly, requiring larger pumps."
  },
  {
    id: 6,
    question: "When balancing a two-pipe heating system, which valve is adjusted?",
    options: ["The TRV head", "The lockshield valve", "The motorised zone valve", "The pump speed control"],
    correctAnswer: 1,
    explanation: "Lockshield valves are adjusted during commissioning to balance flow rates between radiators. They are set once and locked. TRVs modulate automatically; lockshields provide the base restriction for balanced flow."
  },
  {
    id: 7,
    question: "A heating system has an index circuit pressure drop of 15 kPa. What pump head is required?",
    options: ["10 kPa - pumps are oversized", "15 kPa minimum", "15-20 kPa - include safety margin", "30 kPa - double for safety"],
    correctAnswer: 2,
    explanation: "Pump head should exceed the index circuit resistance by 15-25% to ensure adequate flow at design conditions and account for fouling over time. A 15 kPa index circuit needs approximately 17-19 kPa pump head."
  },
  {
    id: 8,
    question: "Why are double panel radiators (Type 22) popular in modern installations?",
    options: [
      "They are cheaper than single panels",
      "They provide high output from a compact size",
      "They heat up faster",
      "They work better with heat pumps"
    ],
    correctAnswer: 1,
    explanation: "Type 22 (double panel, double convector) radiators have two water panels and two convector fins, providing up to 100% more output than a Type 11 of the same height and length, ideal where wall space is limited."
  },
  {
    id: 9,
    question: "What pressure drop per metre of pipe run is typically used for initial pipe sizing?",
    options: ["50 Pa/m", "100-200 Pa/m", "300-400 Pa/m", "500 Pa/m"],
    correctAnswer: 1,
    explanation: "Initial pipe sizing typically targets 100-200 Pa/m pressure loss. This provides a balance between pipe cost (smaller is cheaper) and pump energy (lower pressure drop is more efficient). Final sizing considers velocity limits."
  },
  {
    id: 10,
    question: "In system balancing, which radiator should reach design temperature first?",
    options: [
      "The radiator closest to the boiler",
      "The largest radiator in the system",
      "All radiators should reach temperature simultaneously",
      "The radiator on the index circuit"
    ],
    correctAnswer: 2,
    explanation: "A properly balanced system has all radiators reaching design temperature at the same time. Lockshield valves on near radiators are partially closed to restrict flow, directing more water to distant radiators."
  },
  {
    id: 11,
    question: "What happens to radiator output if flow temperature is reduced from 75 degrees C to 55 degrees C (with room at 20 degrees C)?",
    options: [
      "Output remains the same",
      "Output reduces by approximately 36%",
      "Output increases by 20%",
      "Output reduces by approximately 63%"
    ],
    correctAnswer: 3,
    explanation: "Delta T changes from 55K to 35K. Output is proportional to Delta T^1.3 approximately. (35/55)^1.3 = 0.37, so output falls to about 37% of rated value - a 63% reduction. This is why heat pump systems need larger radiators."
  },
  {
    id: 12,
    question: "What is the purpose of a bypass valve in a heating system with TRVs?",
    options: [
      "To increase system efficiency",
      "To maintain minimum flow when TRVs close",
      "To reduce pump noise",
      "To balance the system automatically"
    ],
    correctAnswer: 1,
    explanation: "When TRVs close on warm rooms, the pump still runs. Without a bypass, pressure builds up and flow reduces to near zero. A bypass valve allows minimum circulation to protect the pump and boiler heat exchanger."
  }
];

const faqs = [
  {
    question: "Why do radiators need to be larger for heat pump systems?",
    answer: "Heat pumps operate most efficiently at lower flow temperatures (35-45 degrees C) compared to boilers (60-80 degrees C). Lower Delta T means significantly reduced heat output - a radiator at Delta T 25K delivers only about 40% of its rated output at Delta T 50K. This means radiators typically need to be 2-2.5 times larger for heat pump systems, or underfloor heating may be more appropriate."
  },
  {
    question: "How do I determine the index circuit for pump sizing?",
    answer: "Calculate the pressure drop for each circuit from pump to furthest radiator and back. Include pipe friction losses (using published data or calculation), fitting losses (typically 30-50% of pipe losses), and component losses (valves, radiator). The circuit with highest total equals the index. The pump must overcome this plus 15-25% margin."
  },
  {
    question: "What is the difference between system balancing and commissioning?",
    answer: "Commissioning is the complete process of checking, testing and adjusting a heating system including filling, venting, firing the boiler, setting controls, and verifying safety. Balancing is specifically adjusting lockshield valves so that design flow rates and temperatures are achieved at each radiator. Balancing is one part of commissioning."
  },
  {
    question: "Can TRVs replace room thermostats?",
    answer: "No, TRVs alone cannot control the boiler. Building Regulations require a room thermostat (or programmable thermostat) to switch the boiler. TRVs provide individual room temperature control but need a room stat to cycle the boiler. One radiator should be without a TRV in the room with the thermostat, or use a bypass valve."
  },
  {
    question: "What causes radiator noise and how is it prevented?",
    answer: "Common causes include: water velocity too high (size pipes correctly, max 1.5 m/s), air in system (proper venting and air separators), pump oversized or on wrong speed (match to system requirement), TRV hunting (use quality TRVs with proportional control), and pipework expansion (allow for thermal movement). Good design and commissioning prevent most noise issues."
  },
  {
    question: "How do I calculate the total system flow rate?",
    answer: "Sum the flow rates for all radiators: Total flow = Total heat load / (specific heat capacity x temperature drop). For example, a 15kW system with 20K drop needs: 15000 / (4186 x 20) = 0.179 litres/second or 10.7 litres/minute. Add 10% for distribution losses in larger systems."
  }
];

const HNCModule8Section1_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section1">
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
            <Gauge className="h-4 w-4" />
            <span>Module 8.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Radiator Systems
          </h1>
          <p className="text-white/80">
            Radiator sizing, pipe sizing, system balancing, TRVs and hydraulic design for two-pipe heating systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Radiator output:</strong> Rated at Delta T 50K, correct for actual conditions</li>
              <li className="pl-1"><strong>Pipe sizing:</strong> Balance velocity (&lt;1.5 m/s) with pressure drop</li>
              <li className="pl-1"><strong>Index circuit:</strong> Path with highest resistance determines pump size</li>
              <li className="pl-1"><strong>TRVs:</strong> Sense room temp, modulate radiator flow</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Design Principles</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Two-pipe systems:</strong> Constant flow temp to all radiators</li>
              <li className="pl-1"><strong>Balancing:</strong> Equal heat-up time using lockshield valves</li>
              <li className="pl-1"><strong>Bypass:</strong> Essential when TRVs installed throughout</li>
              <li className="pl-1"><strong>Pump sizing:</strong> Match to index circuit plus margin</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate radiator heat output with Delta T correction factors",
              "Size pipework for water velocity and pressure drop limits",
              "Identify the index circuit and calculate pump requirements",
              "Understand TRV operation and installation requirements",
              "Apply system balancing procedures using lockshield valves",
              "Design two-pipe heating systems with correct hydraulics"
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

        {/* Section 1: Radiator Heat Output and Delta T */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Radiator Heat Output and Delta T
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Radiator output depends on the temperature difference between the water inside the radiator
              and the surrounding room air. This difference is called Delta T (temperature difference).
              Understanding Delta T is crucial for correctly sizing radiators.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-4">Understanding Delta T</p>
              <div className="grid sm:grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30 border border-red-500/30">
                  <Thermometer className="h-5 w-5 text-red-400 mx-auto mb-2" />
                  <p className="text-lg font-bold text-red-400 mb-1">Mean Water Temp</p>
                  <p className="text-white/70 text-xs">(Flow + Return) / 2</p>
                </div>
                <div className="p-3 rounded bg-black/30 border border-blue-500/30">
                  <p className="text-3xl font-bold text-blue-400 mb-1">-</p>
                  <p className="text-white/70 text-xs">Subtract</p>
                </div>
                <div className="p-3 rounded bg-black/30 border border-green-500/30">
                  <p className="text-lg font-bold text-green-400 mb-1">Room Temp</p>
                  <p className="text-white/70 text-xs">Typically 20-21 degrees C</p>
                </div>
              </div>
              <div className="mt-4 bg-black/30 p-3 rounded text-center">
                <p className="font-mono text-lg"><strong>Delta T = Mean Water Temp - Room Temp</strong></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Standard Test Conditions (BS EN 442):</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Flow temperature: 75 degrees C</li>
                <li className="pl-1">Return temperature: 65 degrees C</li>
                <li className="pl-1">Mean water temperature: (75 + 65) / 2 = 70 degrees C</li>
                <li className="pl-1">Room temperature: 20 degrees C</li>
                <li className="pl-1"><strong>Delta T = 70 - 20 = 50K</strong> (standard rating condition)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Delta T Correction Factors</p>
              <p className="text-sm text-white/80 mb-3">
                When operating at different conditions, apply a correction factor to the rated output:
              </p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Delta T (K)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Factor</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50</td>
                      <td className="border border-white/10 px-3 py-2">1.00</td>
                      <td className="border border-white/10 px-3 py-2">Traditional boiler system</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">45</td>
                      <td className="border border-white/10 px-3 py-2">0.88</td>
                      <td className="border border-white/10 px-3 py-2">Condensing boiler optimised</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">40</td>
                      <td className="border border-white/10 px-3 py-2">0.79</td>
                      <td className="border border-white/10 px-3 py-2">Low temperature system</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">35</td>
                      <td className="border border-white/10 px-3 py-2">0.67</td>
                      <td className="border border-white/10 px-3 py-2">Heat pump hybrid</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30</td>
                      <td className="border border-white/10 px-3 py-2">0.56</td>
                      <td className="border border-white/10 px-3 py-2">Air source heat pump</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">25</td>
                      <td className="border border-white/10 px-3 py-2">0.45</td>
                      <td className="border border-white/10 px-3 py-2">Ground source heat pump</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">
                Formula: Correction factor = (Delta T / 50)^1.3 approximately
              </p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Worked Example: Radiator Selection</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Given:</strong> Room heat loss = 1800W</p>
                <p>System: Flow 70 degrees C, Return 50 degrees C, Room 21 degrees C</p>
                <p className="mt-2"><strong>Step 1:</strong> Calculate Delta T</p>
                <p>Mean water temp = (70 + 50) / 2 = 60 degrees C</p>
                <p>Delta T = 60 - 21 = 39K</p>
                <p className="mt-2"><strong>Step 2:</strong> Find correction factor</p>
                <p>Factor for Delta T 39K is approximately 0.76</p>
                <p className="mt-2"><strong>Step 3:</strong> Calculate required rated output</p>
                <p>Required = Heat loss / Factor = 1800 / 0.76 = 2368W</p>
                <p className="mt-2"><strong>Step 4:</strong> Add design margin (10%)</p>
                <p>Specified output = 2368 x 1.1 = <strong>2605W at Delta T 50K</strong></p>
                <p className="text-green-400 mt-2">Select radiator rated at 2600W or greater</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Radiator Types and Output Comparison:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Description</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Relative Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 10</td>
                      <td className="border border-white/10 px-3 py-2">Single panel, no fins</td>
                      <td className="border border-white/10 px-3 py-2">50%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 11</td>
                      <td className="border border-white/10 px-3 py-2">Single panel, single convector</td>
                      <td className="border border-white/10 px-3 py-2">100% (base)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 21</td>
                      <td className="border border-white/10 px-3 py-2">Double panel, single convector</td>
                      <td className="border border-white/10 px-3 py-2">150%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 22</td>
                      <td className="border border-white/10 px-3 py-2">Double panel, double convector</td>
                      <td className="border border-white/10 px-3 py-2">200%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Type 33</td>
                      <td className="border border-white/10 px-3 py-2">Triple panel, triple convector</td>
                      <td className="border border-white/10 px-3 py-2">280%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Lower flow temperatures (for heat pumps) require significantly larger radiators or alternative emitters like underfloor heating.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Pipe Sizing and Pressure Drop */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Pipe Sizing and Pressure Drop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct pipe sizing ensures adequate water flow to all radiators without excessive
              noise or energy consumption. The key factors are water velocity and pressure drop.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-4">Pipe Sizing Principles</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-black/30 border border-blue-500/30">
                  <Droplets className="h-5 w-5 text-blue-400 mb-2" />
                  <p className="font-medium text-blue-400 mb-1">Velocity Limit</p>
                  <p className="text-sm text-white/80">Maximum 1.5 m/s to avoid noise and erosion</p>
                  <p className="text-xs text-white/60 mt-1">Lower in bedrooms: 1.0 m/s</p>
                </div>
                <div className="p-3 rounded bg-black/30 border border-green-500/30">
                  <Calculator className="h-5 w-5 text-green-400 mb-2" />
                  <p className="font-medium text-green-400 mb-1">Pressure Drop</p>
                  <p className="text-sm text-white/80">Target 100-200 Pa/m for initial sizing</p>
                  <p className="text-xs text-white/60 mt-1">Total must be within pump capacity</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Flow Rate Calculation:</p>
              <div className="bg-black/30 p-3 rounded text-center mb-3">
                <p className="font-mono text-lg"><strong>Q = P / (c x Delta T)</strong></p>
                <p className="text-xs text-white/60 mt-1">
                  Q = flow rate (kg/s), P = heat (W), c = 4186 J/kg.K, Delta T = temp drop (K)
                </p>
              </div>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Example:</strong> 2kW radiator with 20K temperature drop</p>
                <p className="mt-2">Q = 2000 / (4186 x 20)</p>
                <p>Q = 2000 / 83720 = 0.0239 kg/s</p>
                <p>Q = 0.0239 L/s = 1.43 L/min = <strong>86 L/hour</strong></p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Copper Pipe Sizing Guide</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Pipe OD (mm)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Flow at 1.5 m/s</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Heat Load</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10mm</td>
                      <td className="border border-white/10 px-3 py-2">0.07 L/s (4.2 L/min)</td>
                      <td className="border border-white/10 px-3 py-2">Up to 3kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15mm</td>
                      <td className="border border-white/10 px-3 py-2">0.18 L/s (11 L/min)</td>
                      <td className="border border-white/10 px-3 py-2">Up to 9kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">22mm</td>
                      <td className="border border-white/10 px-3 py-2">0.45 L/s (27 L/min)</td>
                      <td className="border border-white/10 px-3 py-2">Up to 22kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">28mm</td>
                      <td className="border border-white/10 px-3 py-2">0.75 L/s (45 L/min)</td>
                      <td className="border border-white/10 px-3 py-2">Up to 37kW</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">35mm</td>
                      <td className="border border-white/10 px-3 py-2">1.24 L/s (74 L/min)</td>
                      <td className="border border-white/10 px-3 py-2">Up to 62kW</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">
                Heat load assumes 20K temperature drop. Reduce for lower Delta T systems.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pressure Drop Components:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Pipe friction:</strong> Use published tables (Pa/m for flow rate)</li>
                <li className="pl-1"><strong>Fittings:</strong> Add 30-50% to straight pipe losses</li>
                <li className="pl-1"><strong>Radiator valves:</strong> Typically 1-5 kPa each depending on opening</li>
                <li className="pl-1"><strong>TRVs:</strong> 3-10 kPa when fully open</li>
                <li className="pl-1"><strong>Boiler/heat source:</strong> Check manufacturer data (typically 10-30 kPa)</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Pressure Drop Worked Example</p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Index circuit:</strong> Boiler to furthest radiator</p>
                <p className="mt-2">Flow pipework: 15m of 22mm at 150 Pa/m = 2,250 Pa</p>
                <p>Return pipework: 15m of 22mm at 150 Pa/m = 2,250 Pa</p>
                <p>Fittings allowance (40%): 1,800 Pa</p>
                <p>TRV (fully open): 5,000 Pa</p>
                <p>Lockshield valve: 2,000 Pa</p>
                <p>Radiator: 500 Pa</p>
                <p>Boiler: 15,000 Pa</p>
                <p className="mt-2 text-green-400"><strong>Total index circuit: 28,800 Pa = 28.8 kPa</strong></p>
                <p className="mt-1 text-white/60">Pump head required: 28.8 x 1.2 = 34.6 kPa minimum</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Size main distribution pipes generously (lower velocity) to reduce total pressure drop and allow for future additions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: TRVs and System Control */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            TRVs and System Control
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Thermostatic Radiator Valves (TRVs) provide individual room temperature control by
              automatically adjusting the flow through each radiator based on room air temperature.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-4">TRV Operating Principle</p>
              <div className="grid sm:grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-black/30 border border-blue-500/30">
                  <p className="font-medium text-blue-400 mb-1">1. Temperature Sensing</p>
                  <p className="text-white/70 text-xs">Wax or liquid element senses room air temperature</p>
                </div>
                <div className="p-3 rounded bg-black/30 border border-green-500/30">
                  <p className="font-medium text-green-400 mb-1">2. Expansion/Contraction</p>
                  <p className="text-white/70 text-xs">Element expands when warm, contracts when cool</p>
                </div>
                <div className="p-3 rounded bg-black/30 border border-elec-yellow/30">
                  <p className="font-medium text-elec-yellow mb-1">3. Flow Modulation</p>
                  <p className="text-white/70 text-xs">Pin movement adjusts valve opening and water flow</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TRV Settings and Temperature Guide:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Setting</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Temperature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">* (frost)</td>
                      <td className="border border-white/10 px-3 py-2">6-8 degrees C</td>
                      <td className="border border-white/10 px-3 py-2">Frost protection only</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">1</td>
                      <td className="border border-white/10 px-3 py-2">12 degrees C</td>
                      <td className="border border-white/10 px-3 py-2">Unoccupied rooms, storage</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">2</td>
                      <td className="border border-white/10 px-3 py-2">16 degrees C</td>
                      <td className="border border-white/10 px-3 py-2">Hallways, utility rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">3</td>
                      <td className="border border-white/10 px-3 py-2">20 degrees C</td>
                      <td className="border border-white/10 px-3 py-2">Living rooms (recommended)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4</td>
                      <td className="border border-white/10 px-3 py-2">24 degrees C</td>
                      <td className="border border-white/10 px-3 py-2">Bathrooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">5</td>
                      <td className="border border-white/10 px-3 py-2">28 degrees C</td>
                      <td className="border border-white/10 px-3 py-2">Maximum - rarely needed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Critical Installation Rules</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Room with thermostat:</strong> Do NOT fit TRV - radiator must always respond to room stat</li>
                <li className="pl-1"><strong>Bypass valve:</strong> Required when all other radiators have TRVs</li>
                <li className="pl-1"><strong>Sensor position:</strong> Must sense room air, not radiant heat from radiator</li>
                <li className="pl-1"><strong>Minimum one radiator:</strong> Without TRV to ensure minimum system flow</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">TRV Types:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Standard wax element:</strong> Most common, reliable, 2-3 degrees C proportional band</li>
                <li className="pl-1"><strong>Liquid-filled:</strong> Faster response, more accurate, higher cost</li>
                <li className="pl-1"><strong>Remote sensor:</strong> Sensor on capillary tube, placed away from radiator heat</li>
                <li className="pl-1"><strong>Programmable electronic:</strong> Time scheduling, remote control, highest accuracy</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Bypass Valve Function</p>
              <p className="text-sm text-white/80 mb-3">
                When TRVs close on satisfied rooms, the pump still runs. Without a path for water,
                pressure builds and flow stops. A bypass valve:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Opens when differential pressure exceeds setpoint (typically 10-15 kPa)</li>
                <li className="pl-1">Maintains minimum flow through boiler heat exchanger</li>
                <li className="pl-1">Prevents pump damage from dead-heading</li>
                <li className="pl-1">Usually fitted between flow and return near boiler</li>
              </ul>
              <p className="text-xs text-white/60 mt-2">
                Modern boilers may have internal bypass. Check manufacturer guidance.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Building Regulations:</strong> Part L requires TRVs on all radiators in new installations, except in rooms with a room thermostat.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: System Balancing and Pump Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            System Balancing and Pump Sizing
          </h2>
          <div className="text-white space-y-6 leading-relaxed">

            {/* Index Circuit */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-blue-400 mb-3">The Index Circuit</h3>
              <p className="text-sm text-white mb-3">
                The index circuit is the flow path from pump through the system that has the
                highest total resistance. This determines the pump head requirement.
              </p>

              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Finding the Index Circuit:</strong></p>
                <p className="mt-2">1. Identify all possible flow paths (pump to each radiator and back)</p>
                <p>2. Calculate pressure drop for each path:</p>
                <p className="ml-4">- Pipe friction (Pa/m x length)</p>
                <p className="ml-4">- Fittings allowance (30-50% of pipe)</p>
                <p className="ml-4">- Valve losses (TRV, lockshield)</p>
                <p className="ml-4">- Heat source (boiler, heat pump)</p>
                <p>3. Path with highest total = index circuit</p>
                <p className="mt-2 text-green-400">Usually the most distant radiator, but not always!</p>
              </div>
            </div>

            {/* Pump Sizing */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-green-400 mb-3">Pump Sizing</h3>
              <p className="text-sm text-white mb-3">
                The pump must provide adequate head to overcome the index circuit resistance
                whilst delivering the design flow rate.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-2">Flow Rate Required:</p>
                  <p className="font-mono text-sm">Q = Total heat / (4186 x Delta T)</p>
                  <p className="text-xs text-white/60 mt-1">Example: 15kW / (4186 x 20) = 0.18 L/s</p>
                </div>
                <div className="bg-black/30 p-3 rounded">
                  <p className="text-sm font-medium text-white mb-2">Head Required:</p>
                  <p className="font-mono text-sm">H = Index circuit drop x 1.15 to 1.25</p>
                  <p className="text-xs text-white/60 mt-1">Example: 30 kPa x 1.2 = 36 kPa head</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-white mb-2">Pump Selection Process:</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Plot operating point (flow rate, head) on pump curve</li>
                  <li className="pl-1">Point should fall on or slightly below the pump curve</li>
                  <li className="pl-1">Select pump where operating point is in efficient range (mid-curve)</li>
                  <li className="pl-1">Consider variable speed pumps for energy efficiency</li>
                </ul>
              </div>
            </div>

            {/* Balancing Procedure */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-purple-400 mb-3">System Balancing Procedure</h3>
              <p className="text-sm text-white mb-3">
                Balancing ensures all radiators reach design temperature simultaneously by
                adjusting lockshield valve positions.
              </p>

              <div className="bg-black/30 p-3 rounded text-sm text-white/90">
                <p className="font-medium mb-2">Step-by-Step Balancing Method:</p>
                <ol className="list-decimal list-outside ml-5 space-y-2">
                  <li>Open all lockshield and TRV valves fully</li>
                  <li>Turn off all radiators except the index circuit radiator</li>
                  <li>Run system until index radiator reaches design temperatures</li>
                  <li>Measure flow and return temperatures at index radiator</li>
                  <li>Turn on next nearest radiator</li>
                  <li>Partially close its lockshield until it reaches same Delta T</li>
                  <li>Repeat for each radiator, working towards the pump</li>
                  <li>Nearest radiators will have most restricted lockshields</li>
                </ol>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-white mb-2">Target Temperature Drop:</p>
                <div className="overflow-x-auto">
                  <table className="text-sm text-white w-full border-collapse">
                    <thead>
                      <tr className="bg-white/5">
                        <th className="border border-white/10 px-3 py-2 text-left">System Type</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Design Delta T</th>
                        <th className="border border-white/10 px-3 py-2 text-left">Acceptable Range</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">Traditional boiler</td>
                        <td className="border border-white/10 px-3 py-2">20K</td>
                        <td className="border border-white/10 px-3 py-2">18-22K</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">Condensing boiler</td>
                        <td className="border border-white/10 px-3 py-2">20K</td>
                        <td className="border border-white/10 px-3 py-2">18-25K (higher = more condensing)</td>
                      </tr>
                      <tr>
                        <td className="border border-white/10 px-3 py-2">Heat pump</td>
                        <td className="border border-white/10 px-3 py-2">5-7K</td>
                        <td className="border border-white/10 px-3 py-2">5-10K</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Two-Pipe System Layout */}
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Two-Pipe System Characteristics</h3>
              <p className="text-sm text-white mb-3">
                Two-pipe systems have separate flow and return mains, with each radiator receiving
                water at full flow temperature.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-400 mb-2">Advantages:</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">All radiators at same flow temperature</li>
                    <li className="pl-1">Independent control of each radiator</li>
                    <li className="pl-1">Easy to extend or modify</li>
                    <li className="pl-1">Consistent heat output throughout</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-400 mb-2">Considerations:</p>
                  <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                    <li className="pl-1">More pipework than single-pipe</li>
                    <li className="pl-1">Requires proper balancing</li>
                    <li className="pl-1">Near radiators tend to over-heat without balance</li>
                    <li className="pl-1">Air must be vented from high points</li>
                  </ul>
                </div>
              </div>
            </div>

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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Complete Radiator System Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Brief:</strong> Design heating for a 3-bedroom house with total heat loss 8.5kW.
                Combi boiler, flow 70 degrees C, return 50 degrees C, room temp 21 degrees C.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Step 1: System Parameters</strong></p>
                <p>Mean water temp = (70 + 50) / 2 = 60 degrees C</p>
                <p>Delta T = 60 - 21 = 39K</p>
                <p>Correction factor = 0.76</p>

                <p className="mt-3"><strong>Step 2: Room Heat Loads and Radiator Sizing</strong></p>
                <p>Living room: 2.5kW / 0.76 x 1.1 = 3.6kW rated</p>
                <p>Kitchen/dining: 1.8kW / 0.76 x 1.1 = 2.6kW rated</p>
                <p>Bedroom 1: 1.5kW / 0.76 x 1.1 = 2.2kW rated</p>
                <p>Bedroom 2: 1.2kW / 0.76 x 1.1 = 1.7kW rated</p>
                <p>Bedroom 3: 1.0kW / 0.76 x 1.1 = 1.4kW rated</p>
                <p>Bathroom: 0.5kW / 0.76 x 1.1 = 0.7kW rated</p>

                <p className="mt-3"><strong>Step 3: Flow Rate</strong></p>
                <p>Total system flow = 8500 / (4186 x 20) = 0.102 L/s = 6.1 L/min</p>

                <p className="mt-3"><strong>Step 4: Pipe Sizing</strong></p>
                <p>Main flow/return: 22mm (handles 11 L/min at 1.5 m/s)</p>
                <p>Branches to radiators: 15mm (adequate for individual loads)</p>

                <p className="mt-3"><strong>Step 5: Index Circuit</strong></p>
                <p>Bedroom 3 (furthest): 18m pipe run + boiler + valves = 35 kPa</p>
                <p>Pump requirement: 35 x 1.2 = 42 kPa head at 6 L/min</p>
                <p className="text-green-400">Select pump: e.g. Grundfos 15-50 or similar</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Heat Pump Radiator Upsizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An existing radiator rated 2kW at Delta T 50K is to be used with
                a heat pump at flow 45 degrees C, return 40 degrees C, room 20 degrees C. Will it be adequate
                for a room heat loss of 1.2kW?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Calculate actual Delta T:</strong></p>
                <p>Mean water temp = (45 + 40) / 2 = 42.5 degrees C</p>
                <p>Delta T = 42.5 - 20 = 22.5K</p>

                <p className="mt-2"><strong>Find correction factor:</strong></p>
                <p>Factor = (22.5 / 50)^1.3 = 0.45^1.3 = 0.36</p>

                <p className="mt-2"><strong>Calculate actual output:</strong></p>
                <p>Actual output = 2000 x 0.36 = <strong>720W</strong></p>

                <p className="mt-2"><strong>Compare to requirement:</strong></p>
                <p>Required: 1200W, Available: 720W</p>
                <p className="text-red-400 mt-1">Shortfall: 480W - radiator is NOT adequate</p>

                <p className="mt-2"><strong>Required rated output:</strong></p>
                <p>Need = 1200 / 0.36 = 3333W at Delta T 50K</p>
                <p className="text-green-400">Replace with minimum 3.4kW rated radiator</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Balancing Temperature Measurement</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> During balancing, the index radiator has flow 68 degrees C and return
                48 degrees C. A nearby radiator shows flow 70 degrees C and return 42 degrees C.
                What adjustment is needed?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p><strong>Index radiator (target):</strong></p>
                <p>Delta T = 68 - 48 = 20K (design condition - correct)</p>

                <p className="mt-2"><strong>Nearby radiator (to adjust):</strong></p>
                <p>Delta T = 70 - 42 = 28K (too high - flow too low)</p>

                <p className="mt-2 text-red-400"><strong>Analysis:</strong></p>
                <p>Higher Delta T means water is staying longer (lower flow rate)</p>
                <p>This radiator has too much restriction</p>

                <p className="mt-2 text-green-400"><strong>Action:</strong></p>
                <p>OPEN the lockshield valve slightly to increase flow</p>
                <p>Recheck until Delta T matches index radiator (20K)</p>

                <p className="mt-2 text-white/60"><strong>Note:</strong> If Delta T were lower than index,</p>
                <p className="text-white/60">you would CLOSE the lockshield to reduce flow</p>
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
                <li className="pl-1"><strong>Delta T = Mean water temp - Room temp</strong></li>
                <li className="pl-1"><strong>Mean water temp = (Flow + Return) / 2</strong></li>
                <li className="pl-1"><strong>Flow rate Q = Heat (W) / (4186 x Delta T)</strong></li>
                <li className="pl-1"><strong>Corrected output = Rated output x (actual Delta T / 50)^1.3</strong></li>
                <li className="pl-1"><strong>Pump head = Index circuit pressure drop x 1.15 to 1.25</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Design Principles</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Always apply Delta T correction when selecting radiators</li>
                <li className="pl-1">Keep water velocity below 1.5 m/s (1.0 m/s in bedrooms)</li>
                <li className="pl-1">Size pump for index circuit plus 15-25% margin</li>
                <li className="pl-1">Include bypass valve when TRVs fitted throughout</li>
                <li className="pl-1">Leave one radiator without TRV in room thermostat location</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Ignoring Delta T correction:</strong> Undersized radiators for low-temp systems</li>
                <li className="pl-1"><strong>No system balancing:</strong> Near radiators too hot, far ones too cold</li>
                <li className="pl-1"><strong>TRV on thermostat room:</strong> Boiler runs continuously</li>
                <li className="pl-1"><strong>Undersized pipes:</strong> Noise, high pressure drop, pump failure</li>
                <li className="pl-1"><strong>No bypass:</strong> Pump damage when TRVs close</li>
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
                <p className="font-medium text-white mb-1">Radiator Sizing</p>
                <ul className="space-y-0.5">
                  <li>Standard rating: Delta T 50K</li>
                  <li>Add 10-15% design margin</li>
                  <li>Heat pump needs 2-2.5x larger</li>
                  <li>Type 22 = double output of Type 11</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">System Design</p>
                <ul className="space-y-0.5">
                  <li>Velocity &lt;1.5 m/s in pipes</li>
                  <li>Target 100-200 Pa/m pressure drop</li>
                  <li>Pump head = index + 15-25%</li>
                  <li>Balance for equal Delta T all radiators</li>
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
            <Link to="../h-n-c-module8-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Underfloor Heating
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section1-5">
              Next: Heating Controls
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section1_4;
