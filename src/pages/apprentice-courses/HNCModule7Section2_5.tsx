import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "UPS Systems - HNC Module 7 Section 2.5";
const DESCRIPTION = "Master UPS systems for building services: topologies (offline, line-interactive, online double conversion), sizing calculations, battery technologies (VRLA, lithium-ion), bypass arrangements, and monitoring systems.";

const quickCheckQuestions = [
  {
    id: "ups-topology",
    question: "Which UPS topology provides the highest level of protection with zero transfer time?",
    options: ["Offline (standby) UPS", "Line-interactive UPS", "Online double conversion UPS", "Hybrid UPS"],
    correctIndex: 2,
    explanation: "Online double conversion UPS provides continuous power conditioning with zero transfer time because the load is always powered from the inverter. The mains supply charges the batteries and powers the rectifier, but the load never experiences any break in supply during mains failure."
  },
  {
    id: "ups-sizing",
    question: "A server room has a 15 kW load at 0.9 power factor. What minimum UPS kVA rating is required?",
    options: ["13.5 kVA", "15 kVA", "16.7 kVA", "18 kVA"],
    correctIndex: 2,
    explanation: "kVA = kW ÷ Power Factor = 15 ÷ 0.9 = 16.67 kVA. The UPS must be rated for apparent power (kVA) not just real power (kW). A 20 kVA UPS would typically be selected to provide headroom for future expansion and avoid running at full capacity."
  },
  {
    id: "battery-technology",
    question: "What is the typical design life of VRLA batteries in a UPS application?",
    options: ["3-5 years", "5-10 years", "10-15 years", "15-20 years"],
    correctIndex: 1,
    explanation: "VRLA (Valve Regulated Lead Acid) batteries typically have a design life of 5-10 years, depending on environmental conditions and maintenance. High ambient temperatures significantly reduce battery life - for every 10°C above 20°C, battery life is halved."
  },
  {
    id: "bypass-function",
    question: "What is the primary purpose of a maintenance bypass switch in a UPS system?",
    options: ["To increase UPS efficiency", "To enable UPS servicing without disrupting the load", "To reduce battery charging time", "To provide additional power capacity"],
    correctIndex: 1,
    explanation: "A maintenance bypass switch allows the UPS to be isolated for servicing, testing, or replacement while maintaining continuous power to the critical load through a direct mains connection. This is essential for high-availability installations."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "In an offline (standby) UPS, what happens during normal mains operation?",
    options: [
      "The load is powered directly from the inverter",
      "The load is powered directly from the mains with the inverter on standby",
      "The load is powered through a double conversion process",
      "The load alternates between mains and inverter"
    ],
    correctAnswer: 1,
    explanation: "In an offline UPS, the load receives power directly from the mains during normal operation. The inverter remains on standby, only activating when mains failure is detected. This results in a transfer time of 5-12ms."
  },
  {
    id: 2,
    question: "What is the typical transfer time of a line-interactive UPS?",
    options: ["0 ms (no transfer)", "2-4 ms", "5-12 ms", "15-25 ms"],
    correctAnswer: 1,
    explanation: "Line-interactive UPS systems have a typical transfer time of 2-4ms, faster than offline UPS (5-12ms) but not zero like online double conversion. The autotransformer provides voltage regulation without switching."
  },
  {
    id: 3,
    question: "Calculate the autonomy time for a 10 kVA UPS with a 120 Ah battery bank at 192V DC and 80% discharge depth, powering an 8 kW load.",
    options: ["15 minutes", "23 minutes", "28 minutes", "35 minutes"],
    correctAnswer: 1,
    explanation: "Battery capacity = 192V × 120Ah = 23,040 Wh. Usable capacity at 80% DOD = 18,432 Wh. Autonomy = 18,432 ÷ 8,000W = 2.3 hours = 138 minutes. However, accounting for inverter efficiency (~90%), actual autonomy ≈ 23 minutes. Real-world calculation requires battery discharge curves."
  },
  {
    id: 4,
    question: "What advantage does lithium-ion technology offer over VRLA in UPS applications?",
    options: [
      "Lower initial cost",
      "Higher energy density and longer cycle life",
      "No monitoring required",
      "Compatible with all existing UPS systems"
    ],
    correctAnswer: 1,
    explanation: "Lithium-ion batteries offer 2-3 times higher energy density, 10+ year lifespan, faster recharge times, and better performance at higher temperatures compared to VRLA. However, they require sophisticated BMS and have higher initial costs."
  },
  {
    id: 5,
    question: "Which component in an online double conversion UPS converts AC mains to DC?",
    options: ["Inverter", "Rectifier/charger", "Static bypass switch", "Output transformer"],
    correctAnswer: 1,
    explanation: "The rectifier/charger converts incoming AC mains to DC, which charges the batteries and feeds the inverter. This dual function ensures batteries remain charged while providing continuous DC supply for double conversion."
  },
  {
    id: 6,
    question: "What is the purpose of an automatic static bypass in a UPS?",
    options: [
      "To improve efficiency during light loads",
      "To transfer load to mains if UPS fails or is overloaded",
      "To reduce harmonic distortion",
      "To provide isolation for battery maintenance"
    ],
    correctAnswer: 1,
    explanation: "The automatic static bypass uses semiconductor switches to transfer the load to raw mains supply within microseconds if the UPS experiences a fault, overload, or inverter failure. This protects the load from complete power loss."
  },
  {
    id: 7,
    question: "For a critical data centre application, which UPS configuration provides the highest availability?",
    options: ["Single UPS with bypass", "Parallel redundant (N+1)", "2N configuration", "Distributed redundant"],
    correctAnswer: 2,
    explanation: "2N configuration uses two independent UPS systems, each capable of supporting the full load, with automatic transfer between them. This provides the highest availability as either system can fail completely without affecting the load."
  },
  {
    id: 8,
    question: "What does 'True Online' UPS topology mean?",
    options: [
      "Internet-connected monitoring capability",
      "Continuous double conversion with zero transfer time",
      "Real-time cloud backup",
      "Online ordering for replacement parts"
    ],
    correctAnswer: 1,
    explanation: "True Online refers to double conversion topology where the load continuously receives power from the inverter. The term distinguishes it from line-interactive systems sometimes marketed as 'online' but which have transfer times."
  },
  {
    id: 9,
    question: "What is the recommended ambient temperature range for VRLA batteries to achieve rated design life?",
    options: ["10-15°C", "15-20°C", "20-25°C", "25-30°C"],
    correctAnswer: 2,
    explanation: "VRLA batteries are rated for design life at 20-25°C. For every 10°C increase above 25°C, battery life is approximately halved. Data centre battery rooms typically maintain 20-22°C for optimal battery longevity."
  },
  {
    id: 10,
    question: "What function does a Battery Management System (BMS) perform in a lithium-ion UPS installation?",
    options: [
      "Only monitors state of charge",
      "Controls charging, monitors cell balance, temperature, and provides protection",
      "Replaces the need for a rectifier",
      "Eliminates the requirement for cooling"
    ],
    correctAnswer: 1,
    explanation: "The BMS is essential for lithium-ion batteries, controlling charge/discharge rates, monitoring individual cell voltages and temperatures, balancing cells, and providing protection against overcharge, overdischarge, and thermal runaway."
  },
  {
    id: 11,
    question: "A UPS specification states 'Input power factor: 0.99'. What does this indicate?",
    options: [
      "The UPS output power factor",
      "Unity power factor input drawing minimal reactive current",
      "The maximum load power factor supported",
      "Battery charging efficiency"
    ],
    correctAnswer: 1,
    explanation: "Input power factor of 0.99 indicates the UPS draws current almost in phase with voltage, minimising reactive power demand and harmonic distortion on the mains supply. Modern UPS use active PFC (Power Factor Correction) to achieve this."
  },
  {
    id: 12,
    question: "What is ECO mode operation in a modern UPS?",
    options: [
      "Environmentally friendly battery chemistry",
      "Reduced output voltage for energy saving",
      "Bypass mode with monitoring for improved efficiency",
      "Lower charging current for battery preservation"
    ],
    correctAnswer: 2,
    explanation: "ECO mode bypasses double conversion during normal operation, routing power through the static bypass for 97-99% efficiency instead of 90-94%. The UPS monitors mains quality and transfers to inverter if problems are detected."
  }
];

const faqs = [
  {
    question: "How do I determine the required UPS capacity for a server room?",
    answer: "Calculate total IT load (kW) from equipment nameplates or power monitoring, add 25-30% growth headroom, then convert to kVA using power factor (typically 0.9 for modern IT). For example: 20 kW load × 1.3 (headroom) ÷ 0.9 PF = 29 kVA minimum. Select standard size (30-40 kVA) and verify autonomy requirements can be met with the battery configuration offered."
  },
  {
    question: "What is the difference between standby and online UPS for critical applications?",
    answer: "Standby (offline) UPS has 5-12ms transfer time and provides basic protection suitable for PCs. Online double conversion has zero transfer time and continuously conditions power, essential for sensitive equipment. For servers, networking, and medical equipment, online UPS is mandatory. Line-interactive (2-4ms transfer) offers a middle ground for less critical IT loads."
  },
  {
    question: "How often should UPS batteries be tested and replaced?",
    answer: "Perform impedance testing annually and full discharge tests every 2-3 years. VRLA batteries typically require replacement at 4-5 years (50-60% of design life) to maintain reliability. Monitor float voltage, temperature, and impedance trends. Replace entire battery strings rather than individual cells. Lithium-ion systems require BMS monitoring but typically last 10-15 years."
  },
  {
    question: "Can I add batteries to increase UPS autonomy after installation?",
    answer: "Yes, most UPS systems support extended battery cabinets. Ensure the charger can handle the additional capacity (may need uprating), verify floor loading, and match battery type and age. Never mix old and new batteries in the same string. Extended autonomy also requires reviewing ventilation for hydrogen dissipation with VRLA batteries."
  },
  {
    question: "What causes UPS batteries to fail prematurely?",
    answer: "Common causes include: high ambient temperature (biggest factor - halves life per 10°C above 25°C), incorrect float voltage, deep discharge events, lack of regular testing, AC ripple on DC bus, and manufacturing defects. Proper environmental control and monitoring are essential for achieving design life."
  },
  {
    question: "How do parallel UPS systems share load?",
    answer: "Modern parallel UPS systems use digital control to balance load within 2-3% across units. Each UPS has a parallel card that communicates via fibre or copper to synchronise output voltage phase and amplitude. N+1 configurations allow one unit to fail while maintaining full load. Load sharing algorithms prevent circulating currents between units."
  }
];

const HNCModule7Section2_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2">
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
            <Zap className="h-4 w-4" />
            <span>Module 7.2.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            UPS Systems
          </h1>
          <p className="text-white/80">
            UPS topologies, sizing calculations, battery technologies, bypass arrangements, and monitoring systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Online UPS:</strong> Zero transfer time, continuous protection</li>
              <li className="pl-1"><strong>Sizing:</strong> kVA = kW ÷ power factor + 25% headroom</li>
              <li className="pl-1"><strong>VRLA batteries:</strong> 5-10 year design life at 20-25°C</li>
              <li className="pl-1"><strong>Bypass:</strong> Static (automatic) and maintenance (manual)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Critical loads:</strong> Data centres, medical, life safety</li>
              <li className="pl-1"><strong>Configuration:</strong> N+1 or 2N for high availability</li>
              <li className="pl-1"><strong>Monitoring:</strong> BMS integration, SNMP, Modbus</li>
              <li className="pl-1"><strong>Environment:</strong> Temperature control essential</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Compare UPS topologies and their characteristics",
              "Calculate UPS sizing including kVA, kW, and autonomy",
              "Evaluate battery technologies for different applications",
              "Design bypass arrangements for maintenance access",
              "Specify monitoring and BMS requirements",
              "Apply redundancy configurations for critical loads"
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

        {/* Section 1: UPS Topologies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            UPS Topologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Uninterruptible Power Supply systems provide continuous power to critical loads by bridging
              the gap between mains failure and generator start-up, or providing complete power
              conditioning for sensitive equipment. The three main topologies offer different levels
              of protection, efficiency, and cost.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UPS Topology Comparison:</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Topology</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Transfer Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficiency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Offline (Standby)</td>
                      <td className="border border-white/10 px-3 py-2">5-12 ms</td>
                      <td className="border border-white/10 px-3 py-2">95-98%</td>
                      <td className="border border-white/10 px-3 py-2">PCs, home office, basic protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line-Interactive</td>
                      <td className="border border-white/10 px-3 py-2">2-4 ms</td>
                      <td className="border border-white/10 px-3 py-2">94-97%</td>
                      <td className="border border-white/10 px-3 py-2">Small servers, networking, retail</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Online Double Conversion</td>
                      <td className="border border-white/10 px-3 py-2">0 ms</td>
                      <td className="border border-white/10 px-3 py-2">90-94%</td>
                      <td className="border border-white/10 px-3 py-2">Data centres, medical, critical IT</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Offline (Standby)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Load powered directly from mains</li>
                  <li className="pl-1">Inverter activates on mains failure</li>
                  <li className="pl-1">Basic surge protection only</li>
                  <li className="pl-1">Lowest cost per kVA</li>
                  <li className="pl-1">No voltage regulation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Line-Interactive</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Autotransformer regulates voltage</li>
                  <li className="pl-1">Buck/boost without transfer</li>
                  <li className="pl-1">Faster transfer than offline</li>
                  <li className="pl-1">Good balance of cost/protection</li>
                  <li className="pl-1">Popular for SME applications</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Online Double Conversion</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Continuous power conditioning</li>
                  <li className="pl-1">Complete isolation from mains</li>
                  <li className="pl-1">Zero transfer time</li>
                  <li className="pl-1">Highest protection level</li>
                  <li className="pl-1">Essential for critical loads</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Online Double Conversion Process</p>
              <div className="text-sm space-y-1">
                <p><span className="text-white/60">Stage 1:</span> AC mains → Rectifier → DC bus</p>
                <p><span className="text-white/60">Stage 2:</span> DC bus → Charges batteries continuously</p>
                <p><span className="text-white/60">Stage 3:</span> DC bus → Inverter → Clean AC to load</p>
                <p><span className="text-white/60">On mains fail:</span> Batteries maintain DC bus seamlessly</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Selection principle:</strong> Choose online double conversion for any load where even milliseconds of interruption could cause data loss, process failure, or safety issues.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Sizing Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            UPS Sizing Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct UPS sizing ensures adequate capacity for the connected load while providing
              headroom for future expansion and avoiding operation at full capacity, which reduces
              reliability and efficiency.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fundamental Sizing Equations</p>
              <div className="font-mono text-sm space-y-2">
                <p><strong>Apparent Power:</strong> S (kVA) = P (kW) ÷ Power Factor</p>
                <p><strong>With headroom:</strong> UPS Rating = S × 1.25 to 1.30</p>
                <p><strong>Battery Wh:</strong> Capacity = V × Ah × DOD × η</p>
                <p><strong>Autonomy:</strong> Time (h) = Battery Wh ÷ Load (W)</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sizing Parameters</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">IT load power factor</td>
                      <td className="border border-white/10 px-3 py-2">0.9 - 0.95</td>
                      <td className="border border-white/10 px-3 py-2">Modern servers with PFC</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Growth headroom</td>
                      <td className="border border-white/10 px-3 py-2">25-30%</td>
                      <td className="border border-white/10 px-3 py-2">3-5 year planning horizon</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Battery DOD (Depth of Discharge)</td>
                      <td className="border border-white/10 px-3 py-2">80%</td>
                      <td className="border border-white/10 px-3 py-2">Protects battery life</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Inverter efficiency</td>
                      <td className="border border-white/10 px-3 py-2">90-94%</td>
                      <td className="border border-white/10 px-3 py-2">Losses in conversion</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Typical autonomy</td>
                      <td className="border border-white/10 px-3 py-2">10-30 minutes</td>
                      <td className="border border-white/10 px-3 py-2">Generator start + stabilise</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <p className="text-sm font-medium text-green-400 mb-2">Worked Example: Server Room UPS Sizing</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Given:</span> 12 servers × 800W = 9.6 kW total</p>
                <p><span className="text-white/60">Power factor:</span> 0.9</p>
                <p><span className="text-white/60">Autonomy required:</span> 15 minutes</p>
                <p className="mt-2"><span className="text-white/60">Step 1:</span> kVA = 9.6 ÷ 0.9 = 10.67 kVA</p>
                <p><span className="text-white/60">Step 2:</span> With 25% headroom = 10.67 × 1.25 = 13.3 kVA</p>
                <p><span className="text-white/60">Step 3:</span> Select 15 kVA UPS (standard size)</p>
                <p className="mt-2"><span className="text-white/60">Battery:</span> Energy = 9.6 kW × 0.25h ÷ 0.9 = 2.67 kWh</p>
                <p><span className="text-white/60">At 80% DOD:</span> Battery capacity = 2.67 ÷ 0.8 = 3.33 kWh</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Always verify actual measured load before final UPS selection. Nameplate ratings often exceed actual consumption by 30-50%.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Battery Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Battery Technologies and BMS
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Battery systems are the heart of UPS installations, storing energy for discharge during
              mains failure. The choice between VRLA (Valve Regulated Lead Acid) and lithium-ion
              technologies depends on space constraints, lifecycle cost, and operating environment.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Technology Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Characteristic</th>
                      <th className="border border-white/10 px-3 py-2 text-left">VRLA</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Lithium-Ion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Design life</td>
                      <td className="border border-white/10 px-3 py-2">5-10 years</td>
                      <td className="border border-white/10 px-3 py-2">10-15 years</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cycle life</td>
                      <td className="border border-white/10 px-3 py-2">200-400 cycles</td>
                      <td className="border border-white/10 px-3 py-2">3,000-5,000 cycles</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Energy density</td>
                      <td className="border border-white/10 px-3 py-2">30-40 Wh/kg</td>
                      <td className="border border-white/10 px-3 py-2">100-150 Wh/kg</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Recharge time</td>
                      <td className="border border-white/10 px-3 py-2">8-12 hours</td>
                      <td className="border border-white/10 px-3 py-2">1-4 hours</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Temperature sensitivity</td>
                      <td className="border border-white/10 px-3 py-2">High (20-25°C optimal)</td>
                      <td className="border border-white/10 px-3 py-2">Lower (up to 40°C)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Initial cost</td>
                      <td className="border border-white/10 px-3 py-2">Lower</td>
                      <td className="border border-white/10 px-3 py-2">2-3× higher</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lifecycle cost</td>
                      <td className="border border-white/10 px-3 py-2">Higher (replacements)</td>
                      <td className="border border-white/10 px-3 py-2">Lower over 15 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">VRLA Battery Considerations</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Float voltage: 2.27V/cell (13.6V for 12V battery)</li>
                  <li className="pl-1">Temperature compensation essential</li>
                  <li className="pl-1">Hydrogen venting requirements</li>
                  <li className="pl-1">Floor loading: ~50kg per 100Ah 12V block</li>
                  <li className="pl-1">Replace at 80% capacity retention</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lithium-Ion Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Sophisticated BMS mandatory</li>
                  <li className="pl-1">Cell balancing during charge</li>
                  <li className="pl-1">Thermal management system</li>
                  <li className="pl-1">Fire suppression considerations</li>
                  <li className="pl-1">Transportation regulations (UN38.3)</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Battery Management System (BMS) Functions</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>Cell monitoring:</strong> Individual voltage and temperature per cell</li>
                <li><strong>Charge control:</strong> CC/CV charging with temperature compensation</li>
                <li><strong>Balancing:</strong> Equalises cell voltages during charge</li>
                <li><strong>Protection:</strong> Overcurrent, overvoltage, thermal runaway prevention</li>
                <li><strong>State estimation:</strong> SOC (State of Charge), SOH (State of Health)</li>
                <li><strong>Communication:</strong> CAN bus, Modbus, SNMP to UPS controller</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Temperature rule:</strong> VRLA battery life halves for every 10°C above 25°C. A battery rated for 10 years at 25°C will last only 5 years at 35°C.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Bypass and Monitoring */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Bypass Arrangements and Monitoring
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Bypass arrangements are essential for maintaining load power during UPS maintenance
              or failure conditions. Modern installations incorporate both automatic and manual
              bypass capabilities, complemented by comprehensive monitoring systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Bypass Types and Functions</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Bypass Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Operation</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Transfer Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Automatic Static</td>
                      <td className="border border-white/10 px-3 py-2">SCR/thyristor switching</td>
                      <td className="border border-white/10 px-3 py-2">&lt;4 ms</td>
                      <td className="border border-white/10 px-3 py-2">Overload, inverter fault</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Manual Bypass</td>
                      <td className="border border-white/10 px-3 py-2">Rotary switch or breakers</td>
                      <td className="border border-white/10 px-3 py-2">Make-before-break</td>
                      <td className="border border-white/10 px-3 py-2">Planned maintenance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">External Maintenance</td>
                      <td className="border border-white/10 px-3 py-2">Wrap-around cabinet</td>
                      <td className="border border-white/10 px-3 py-2">Overlapping contacts</td>
                      <td className="border border-white/10 px-3 py-2">Complete UPS isolation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">ECO Mode</td>
                      <td className="border border-white/10 px-3 py-2">Continuous bypass + monitoring</td>
                      <td className="border border-white/10 px-3 py-2">2-4 ms to inverter</td>
                      <td className="border border-white/10 px-3 py-2">Energy efficiency mode</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Maintenance Bypass Procedure (Typical)</p>
              <ol className="text-sm text-white space-y-1.5 list-decimal list-outside ml-5">
                <li className="pl-1">Verify mains supply is stable and within tolerance</li>
                <li className="pl-1">Transfer to static bypass (UPS panel or automatic)</li>
                <li className="pl-1">Close maintenance bypass switch (MBB position)</li>
                <li className="pl-1">Open input and output breakers to UPS</li>
                <li className="pl-1">Apply lockout/tagout to isolated UPS</li>
                <li className="pl-1">Perform maintenance with load on raw mains</li>
                <li className="pl-1">Reverse procedure to restore UPS protection</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monitoring Parameters</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Input voltage, current, frequency</li>
                  <li className="pl-1">Output voltage, current, power</li>
                  <li className="pl-1">Battery voltage, charge current, temperature</li>
                  <li className="pl-1">Load percentage and power factor</li>
                  <li className="pl-1">Remaining autonomy (minutes)</li>
                  <li className="pl-1">Alarm status and event log</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Communication Protocols</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1"><strong>SNMP:</strong> Network management integration</li>
                  <li className="pl-1"><strong>Modbus TCP/RTU:</strong> BMS integration</li>
                  <li className="pl-1"><strong>BACnet:</strong> Building automation</li>
                  <li className="pl-1"><strong>Dry contacts:</strong> Simple alarm relay outputs</li>
                  <li className="pl-1"><strong>USB/RS232:</strong> Local shutdown software</li>
                  <li className="pl-1"><strong>Web interface:</strong> Remote monitoring</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Redundancy Configurations</p>
              <ul className="text-sm text-white space-y-1">
                <li><strong>N:</strong> Single UPS, no redundancy - failure = load loss</li>
                <li><strong>N+1:</strong> Parallel UPS units, one spare - one can fail</li>
                <li><strong>2N:</strong> Two independent UPS systems - either can support full load</li>
                <li><strong>2N+1:</strong> Two systems plus one spare - highest availability</li>
                <li><strong>Distributed:</strong> Multiple smaller UPS per rack - localised redundancy</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Availability target:</strong> 2N configurations can achieve 99.9999% availability (seconds of downtime per year) when combined with dual utility feeds and generator backup.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Complete UPS System Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size a UPS for a small data centre with 30 kW IT load, requiring 20 minutes autonomy.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given data:</p>
                <p>IT Load = 30 kW, PF = 0.9, Autonomy = 20 min</p>
                <p className="mt-2">Step 1: Calculate kVA requirement</p>
                <p className="ml-4">kVA = 30 kW ÷ 0.9 = 33.3 kVA</p>
                <p className="mt-2">Step 2: Add 25% headroom</p>
                <p className="ml-4">Required = 33.3 × 1.25 = 41.7 kVA</p>
                <p className="ml-4 text-green-400">Select: 50 kVA UPS (standard size)</p>
                <p className="mt-2">Step 3: Calculate battery energy</p>
                <p className="ml-4">Energy = 30 kW × (20/60)h = 10 kWh at load</p>
                <p className="ml-4">At 90% inverter eff: 10 ÷ 0.9 = 11.1 kWh</p>
                <p className="ml-4">At 80% DOD: 11.1 ÷ 0.8 = 13.9 kWh battery</p>
                <p className="mt-2">Step 4: Battery configuration (192V DC bus typical)</p>
                <p className="ml-4">Ah required = 13,900 Wh ÷ 192V = 72 Ah</p>
                <p className="ml-4 text-green-400">Select: 80 Ah battery string (next standard size)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Battery Replacement Planning</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Plan battery replacement for UPS installed 2019, VRLA batteries rated 10-year design life.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Assessment factors:</p>
                <p>Install date: 2019, Design life: 10 years at 25°C</p>
                <p>Actual ambient: 28°C average (battery room)</p>
                <p className="mt-2">Temperature derating calculation:</p>
                <p className="ml-4">Excess temp = 28 - 25 = 3°C</p>
                <p className="ml-4">Life reduction = 10 years × 0.5^(3/10) = 8.1 years</p>
                <p className="mt-2">Conservative replacement (80% of adjusted life):</p>
                <p className="ml-4">Replace at = 8.1 × 0.8 = 6.5 years</p>
                <p className="ml-4 text-green-400">Plan replacement: Mid-2025</p>
                <p className="mt-2 text-white/60">Validation:</p>
                <p>Perform impedance testing annually from 2023</p>
                <p>Replace when impedance &gt;20% above baseline</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Parallel UPS Configuration</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design N+1 redundant UPS for 80 kVA critical load.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Requirement:</p>
                <p>80 kVA load, N+1 redundancy, 15 min autonomy</p>
                <p className="mt-2">Configuration options:</p>
                <p className="ml-4">Option A: 2 × 100 kVA (each at 40% load normally)</p>
                <p className="ml-4">Option B: 3 × 40 kVA (each at 67% load normally)</p>
                <p className="mt-2">Analysis:</p>
                <p className="ml-4">Option A: Higher headroom, 80% load if one fails</p>
                <p className="ml-4">Option B: Better efficiency at part load, 100% if one fails</p>
                <p className="mt-2 text-green-400">Selected: 2 × 100 kVA</p>
                <p className="text-white/60">Justification: Greater growth capacity, simpler system</p>
                <p className="mt-2">Battery sizing per UPS:</p>
                <p className="ml-4">Must support 80 kVA at 0.9 PF = 72 kW for 15 min</p>
                <p className="ml-4">Energy = 72 × 0.25h ÷ 0.9 ÷ 0.8 = 25 kWh per UPS</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">UPS Selection Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Determine actual load (measure, don't assume from nameplates)</li>
                <li className="pl-1">Select topology based on load criticality</li>
                <li className="pl-1">Calculate kVA with power factor and growth headroom</li>
                <li className="pl-1">Specify autonomy based on generator start time + margin</li>
                <li className="pl-1">Consider redundancy requirements (N, N+1, 2N)</li>
                <li className="pl-1">Verify environmental conditions for battery selection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Online UPS transfer time: <strong>0 ms</strong></li>
                <li className="pl-1">IT load power factor: <strong>0.9 typical</strong></li>
                <li className="pl-1">VRLA optimal temperature: <strong>20-25°C</strong></li>
                <li className="pl-1">Battery DOD for sizing: <strong>80%</strong></li>
                <li className="pl-1">Design headroom: <strong>25-30%</strong></li>
                <li className="pl-1">Typical autonomy: <strong>10-30 minutes</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Undersized batteries</strong> - Using nameplate loads instead of measured values</li>
                <li className="pl-1"><strong>Ignoring temperature</strong> - No cooling for battery room reduces life significantly</li>
                <li className="pl-1"><strong>No maintenance bypass</strong> - Cannot service UPS without load disruption</li>
                <li className="pl-1"><strong>Mixed battery ages</strong> - Old cells fail first, compromising entire string</li>
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
                <p className="font-medium text-white mb-1">UPS Topologies</p>
                <ul className="space-y-0.5">
                  <li>Offline: 5-12ms transfer, basic protection</li>
                  <li>Line-interactive: 2-4ms, voltage regulation</li>
                  <li>Online: 0ms, continuous conditioning</li>
                  <li>ECO mode: Bypass with monitoring</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Sizing Formulas</p>
                <ul className="space-y-0.5">
                  <li>kVA = kW ÷ power factor</li>
                  <li>Add 25-30% headroom</li>
                  <li>Battery Wh = V × Ah × DOD × η</li>
                  <li>Autonomy = Wh ÷ Load (W)</li>
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
            <Link to="../h-n-c-module7-section2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section2-6">
              Next: Section 2.6
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section2_5;
