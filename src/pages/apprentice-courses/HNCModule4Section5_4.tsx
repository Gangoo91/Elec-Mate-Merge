import { ArrowLeft, Battery, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "UPS and Standby Power - HNC Module 4 Section 5.4";
const DESCRIPTION = "Master UPS and standby power systems for building services: UPS types (online/offline/line-interactive), battery sizing, generator coordination and automatic transfer.";

const quickCheckQuestions = [
  {
    id: "ups-online",
    question: "What is the main advantage of an online (double-conversion) UPS?",
    options: ["Lowest cost", "Zero transfer time - continuous power conditioning", "Smallest physical size", "Longest battery life"],
    correctIndex: 1,
    explanation: "Online UPS continuously converts AC to DC then back to AC, so there is no transfer time when mains fails. The load is always supplied from the inverter, providing constant power conditioning."
  },
  {
    id: "battery-ah",
    question: "A 10kVA UPS requires 15 minutes autonomy. Battery bank is 192V DC. What Ah capacity is needed (assume 80% efficiency)?",
    options: ["52Ah", "65Ah", "81Ah", "98Ah"],
    correctIndex: 2,
    explanation: "Energy = 10000VA × 0.25h = 2500VAh. At 80% efficiency: 2500/0.8 = 3125VAh. Ah = 3125VAh/192V = 16.3Ah minimum. Allow 5× for discharge rate: ~81Ah typical."
  },
  {
    id: "ats",
    question: "What does an Automatic Transfer Switch (ATS) do?",
    options: ["Converts AC to DC", "Switches load between mains and generator automatically", "Provides surge protection", "Monitors power quality only"],
    correctIndex: 1,
    explanation: "An ATS monitors mains supply and automatically transfers the load to a standby generator when mains fails, then retransfers when mains is restored and stable."
  },
  {
    id: "gen-start",
    question: "What is the typical start-up time for a standby diesel generator?",
    options: ["Instantaneous", "5-15 seconds", "1-2 minutes", "5-10 minutes"],
    correctIndex: 1,
    explanation: "Modern standby generators with battery start typically achieve full rated power within 10-15 seconds. UPS provides backup during this start-up period."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the purpose of a UPS system?",
    options: [
      "To generate electrical power",
      "To provide uninterrupted power during mains failures",
      "To reduce electricity consumption",
      "To convert three-phase to single-phase"
    ],
    correctAnswer: 1,
    explanation: "A UPS (Uninterruptible Power Supply) maintains power to critical loads during mains failures, providing seamless transition to battery power and conditioning the supply."
  },
  {
    id: 2,
    question: "How does an offline (standby) UPS differ from an online UPS?",
    options: [
      "Offline UPS is always running from battery",
      "Offline UPS only switches to battery when mains fails",
      "There is no difference",
      "Offline UPS has no battery"
    ],
    correctAnswer: 1,
    explanation: "Offline UPS passes mains power directly to the load during normal operation, only switching to battery/inverter when mains fails. This causes a brief transfer time (typically 5-12ms)."
  },
  {
    id: 3,
    question: "What is the function of the rectifier in an online UPS?",
    options: [
      "To store energy in batteries",
      "To convert AC mains to DC for charging batteries and supplying inverter",
      "To increase voltage",
      "To filter harmonics only"
    ],
    correctAnswer: 1,
    explanation: "The rectifier converts incoming AC to DC, which charges the batteries and supplies the inverter. This decouples the load from mains disturbances."
  },
  {
    id: 4,
    question: "What battery technology is most commonly used in modern UPS systems?",
    options: [
      "Lead-acid only",
      "Lithium-ion or VRLA (Valve Regulated Lead Acid)",
      "Nickel-cadmium only",
      "Alkaline batteries"
    ],
    correctAnswer: 1,
    explanation: "VRLA batteries are most common due to low maintenance. Lithium-ion is increasingly used for longer life, lighter weight and faster charging, despite higher initial cost."
  },
  {
    id: 5,
    question: "Why is generator synchronisation important before transferring load?",
    options: [
      "It is not necessary",
      "To ensure voltage, frequency and phase match before closing transfer switch",
      "To reduce generator fuel consumption",
      "For aesthetic reasons"
    ],
    correctAnswer: 1,
    explanation: "Synchronisation ensures generator output matches utility voltage, frequency and phase angle before the ATS connects the load. This prevents damaging current surges."
  },
  {
    id: 6,
    question: "What is 'N+1' redundancy in UPS systems?",
    options: [
      "One extra UPS module beyond minimum needed for the load",
      "Double the required capacity",
      "One UPS per server",
      "No redundancy"
    ],
    correctAnswer: 0,
    explanation: "N+1 redundancy means having one extra UPS module beyond the N modules needed for the load. If N=2 modules carry the load, N+1 means 3 modules total - one can fail without affecting supply."
  },
  {
    id: 7,
    question: "What is the typical autonomy time for UPS in a data centre with generator backup?",
    options: [
      "1-2 minutes",
      "5-15 minutes",
      "1-2 hours",
      "8 hours"
    ],
    correctAnswer: 1,
    explanation: "With generator backup, UPS typically provides 5-15 minutes autonomy - enough for generator start-up and stabilisation. Longer autonomy is costly and unnecessary."
  },
  {
    id: 8,
    question: "What causes 'battery float' operation?",
    options: [
      "Battery is disconnected",
      "Continuous trickle charging to maintain full charge",
      "Battery is being discharged",
      "Battery failure"
    ],
    correctAnswer: 1,
    explanation: "Float charging maintains batteries at full charge with a small continuous current to compensate for self-discharge. This keeps batteries ready for immediate use without overcharging."
  },
  {
    id: 9,
    question: "What is the function of a bypass in a UPS system?",
    options: [
      "To increase efficiency",
      "To allow maintenance and provide alternative power path if UPS fails",
      "To charge batteries faster",
      "To reduce noise"
    ],
    correctAnswer: 1,
    explanation: "The bypass provides an alternative power path around the UPS for maintenance (maintenance bypass) or automatic transfer if the UPS fails (automatic bypass)."
  },
  {
    id: 10,
    question: "What is 'generator block loading' and why should it be avoided?",
    options: [
      "Running generator at full load - recommended practice",
      "Connecting full load instantly causing frequency/voltage disturbance",
      "Generator overload protection",
      "Load shedding sequence"
    ],
    correctAnswer: 1,
    explanation: "Block loading is applying large loads instantly, causing voltage and frequency transients as the generator struggles to respond. Load should be applied in steps to allow recovery between each step."
  }
];

const faqs = [
  {
    question: "How do I size a UPS system?",
    answer: "Calculate total critical load in VA (or kW with power factor). Add 20-25% margin for future growth and to avoid running at 100% capacity. For kW loads, divide by typical power factor (0.8-0.9) to get VA. Determine required autonomy time and specify battery capacity accordingly."
  },
  {
    question: "When is a rotary UPS preferred over static UPS?",
    answer: "Rotary UPS uses a flywheel for short-term energy storage. It's preferred for large loads (500kVA+), when long battery life is problematic (temperature extremes), or when high inrush currents are expected. Rotary UPS has lower losses for continuous operation but shorter ride-through time."
  },
  {
    question: "How do UPS and generator systems work together?",
    answer: "The UPS provides instant backup when mains fails. During UPS autonomy time, the generator starts and stabilises. Once generator output is acceptable, the UPS transfers input to generator supply and recharges batteries. When mains returns and stabilises, load transfers back to mains."
  },
  {
    question: "What maintenance do UPS batteries require?",
    answer: "VRLA batteries need annual capacity testing, terminal torque checks, and visual inspection for swelling or leakage. Replace batteries every 3-5 years regardless of condition. Monitor float voltage and battery temperature continuously. Lithium-ion batteries require less maintenance but still need regular testing."
  },
  {
    question: "What is the difference between kW and kVA ratings for UPS?",
    answer: "kVA is apparent power (V × A), kW is real power (V × A × power factor). UPS rated 10kVA at 0.9 power factor delivers maximum 9kW. Always check the kW rating matches your load. Modern UPS often have unity power factor (kVA = kW) but older units typically 0.8-0.9."
  }
];

const HNCModule4Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Battery className="h-4 w-4" />
            <span>Module 4.5.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            UPS and Standby Power
          </h1>
          <p className="text-white/80">
            Ensuring continuous power supply for critical building systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Online UPS:</strong> Zero transfer time, continuous conditioning</li>
              <li className="pl-1"><strong>Line-interactive:</strong> Voltage regulation, fast transfer</li>
              <li className="pl-1"><strong>Offline/standby:</strong> Basic protection, lowest cost</li>
              <li className="pl-1"><strong>Generator backup:</strong> Long-term power continuity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Data centres:</strong> 99.999% uptime requirement</li>
              <li className="pl-1"><strong>Healthcare:</strong> Life-critical systems</li>
              <li className="pl-1"><strong>Commercial:</strong> IT, security, emergency lighting</li>
              <li className="pl-1"><strong>Autonomy:</strong> 5-30 minutes typical with generator</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand UPS topologies and their applications",
              "Size UPS systems and battery capacity",
              "Design generator-UPS coordination",
              "Specify automatic transfer switch systems",
              "Apply redundancy principles for critical loads",
              "Plan maintenance requirements for standby systems"
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

        {/* Section 1: UPS Types */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            UPS Types and Topologies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              UPS systems are classified by their topology, which determines transfer time,
              efficiency, and level of power conditioning. Understanding each type enables
              correct specification for different applications.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UPS Topology Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Transfer Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Efficiency</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Offline (Standby)</td>
                      <td className="border border-white/10 px-3 py-2">5-12ms</td>
                      <td className="border border-white/10 px-3 py-2">95-98%</td>
                      <td className="border border-white/10 px-3 py-2">Desktop PCs, basic protection</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Line-interactive</td>
                      <td className="border border-white/10 px-3 py-2">2-4ms</td>
                      <td className="border border-white/10 px-3 py-2">94-97%</td>
                      <td className="border border-white/10 px-3 py-2">Servers, network equipment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Online (Double-conversion)</td>
                      <td className="border border-white/10 px-3 py-2">0ms</td>
                      <td className="border border-white/10 px-3 py-2">90-96%</td>
                      <td className="border border-white/10 px-3 py-2">Data centres, critical loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Rotary</td>
                      <td className="border border-white/10 px-3 py-2">0ms</td>
                      <td className="border border-white/10 px-3 py-2">95-97%</td>
                      <td className="border border-white/10 px-3 py-2">Large industrial, motors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Online UPS Operation</p>
              <p className="text-sm text-white mb-2">In double-conversion mode:</p>
              <ul className="text-sm text-white space-y-1">
                <li>1. Rectifier converts AC mains to DC</li>
                <li>2. DC charges batteries and feeds inverter</li>
                <li>3. Inverter converts DC back to clean AC</li>
                <li>4. Load always receives inverter output</li>
                <li>5. On mains failure, batteries supply inverter - no interruption</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Application guide:</strong> Use online UPS for critical IT, medical and process loads. Line-interactive suits general commercial. Offline only for basic desktop protection.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Battery Sizing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Battery Sizing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Battery capacity determines UPS autonomy time - how long the system can support
              the load without mains power. Correct sizing balances autonomy requirements
              against cost and space constraints.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Sizing Steps</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Determine load power (VA and kW)</li>
                <li className="pl-1">Define required autonomy time (minutes)</li>
                <li className="pl-1">Calculate energy required (kWh)</li>
                <li className="pl-1">Apply efficiency factor (typically 80-85%)</li>
                <li className="pl-1">Account for discharge rate (Peukert effect)</li>
                <li className="pl-1">Allow for battery ageing (20% capacity loss)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Technologies</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Life (years)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Cost</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VRLA-AGM</td>
                      <td className="border border-white/10 px-3 py-2">3-5</td>
                      <td className="border border-white/10 px-3 py-2">Low</td>
                      <td className="border border-white/10 px-3 py-2">Most common, maintenance-free</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">VRLA-Gel</td>
                      <td className="border border-white/10 px-3 py-2">5-8</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Better temperature tolerance</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lithium-ion</td>
                      <td className="border border-white/10 px-3 py-2">10-15</td>
                      <td className="border border-white/10 px-3 py-2">High</td>
                      <td className="border border-white/10 px-3 py-2">Lighter, longer life, fast charge</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Flooded lead-acid</td>
                      <td className="border border-white/10 px-3 py-2">15-20</td>
                      <td className="border border-white/10 px-3 py-2">Medium</td>
                      <td className="border border-white/10 px-3 py-2">Requires maintenance, ventilation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Temperature Effects on Battery Life</p>
              <ul className="text-sm text-white space-y-1">
                <li>Battery life halves for every 10°C above 20°C</li>
                <li>Ideal temperature: 20-25°C</li>
                <li>Maximum: 35°C (with significant derating)</li>
                <li>Air conditioning often required for battery rooms</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design rule:</strong> Specify battery capacity for end-of-life conditions (80% of new capacity) to ensure autonomy throughout service life.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Generator Coordination */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Generator Coordination
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standby generators provide extended backup beyond UPS battery capacity. Proper
              coordination between UPS and generator ensures seamless power continuity
              for critical loads.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generator-UPS Sequence</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Event</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Power Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0s</td>
                      <td className="border border-white/10 px-3 py-2">Mains failure detected</td>
                      <td className="border border-white/10 px-3 py-2">UPS battery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">0-3s</td>
                      <td className="border border-white/10 px-3 py-2">Generator start signal</td>
                      <td className="border border-white/10 px-3 py-2">UPS battery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10-15s</td>
                      <td className="border border-white/10 px-3 py-2">Generator at rated speed</td>
                      <td className="border border-white/10 px-3 py-2">UPS battery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15-20s</td>
                      <td className="border border-white/10 px-3 py-2">Generator voltage/frequency stable</td>
                      <td className="border border-white/10 px-3 py-2">UPS battery</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">20-30s</td>
                      <td className="border border-white/10 px-3 py-2">ATS transfers to generator</td>
                      <td className="border border-white/10 px-3 py-2">Generator</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30s+</td>
                      <td className="border border-white/10 px-3 py-2">UPS recharges batteries</td>
                      <td className="border border-white/10 px-3 py-2">Generator</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generator Sizing for UPS</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Generator kW = UPS kW × 1.25 minimum</li>
                  <li className="pl-1">Account for UPS input power factor</li>
                  <li className="pl-1">Include battery recharging load</li>
                  <li className="pl-1">Size for step load acceptance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Compatibility Requirements</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Generator must accept UPS harmonic distortion</li>
                  <li className="pl-1">Voltage regulation: ±10% typical</li>
                  <li className="pl-1">Frequency tolerance: ±2Hz</li>
                  <li className="pl-1">Synchronisation for parallel operation</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Coordination tip:</strong> Specify generator with electronic governor for stable frequency. Older mechanical governors may not meet UPS input requirements.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 4: Automatic Transfer Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Automatic Transfer Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Automatic Transfer Switches (ATS) manage the changeover between normal and
              standby power supplies. They are essential for coordinating mains, generator
              and UPS systems in resilient power architectures.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ATS Types</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Transfer Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Open transition</td>
                      <td className="border border-white/10 px-3 py-2">100-500ms</td>
                      <td className="border border-white/10 px-3 py-2">Standard commercial/industrial</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Closed transition</td>
                      <td className="border border-white/10 px-3 py-2">0ms (overlap)</td>
                      <td className="border border-white/10 px-3 py-2">Critical loads, no break required</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Soft load transfer</td>
                      <td className="border border-white/10 px-3 py-2">Progressive</td>
                      <td className="border border-white/10 px-3 py-2">Large motor loads</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Static transfer</td>
                      <td className="border border-white/10 px-3 py-2">&lt;4ms</td>
                      <td className="border border-white/10 px-3 py-2">Data centres, IT loads</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">ATS Transfer Sequence</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Monitor mains supply continuously</li>
                <li className="pl-1">Detect failure (under-voltage, over-voltage, frequency)</li>
                <li className="pl-1">Time delay (2-10s) to avoid nuisance transfers</li>
                <li className="pl-1">Signal generator to start</li>
                <li className="pl-1">Wait for generator to stabilise</li>
                <li className="pl-1">Transfer load to generator</li>
                <li className="pl-1">Monitor mains for return</li>
                <li className="pl-1">Retransfer after mains stable (adjustable delay)</li>
                <li className="pl-1">Generator cool-down and shutdown</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Closed transition:</strong> Requires synchronisation between sources. Used where any break is unacceptable, but more complex and costly.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Worked Examples */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Worked Examples</h2>

          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: UPS Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size UPS for server room with 30kW IT load requiring 15 minutes autonomy.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>IT load: 30kW</p>
                <p>Assume power factor 0.9</p>
                <p>UPS VA = 30kW ÷ 0.9 = 33.3kVA</p>
                <p className="mt-2">Add 20% margin: 33.3 × 1.2 = 40kVA</p>
                <p className="mt-2">Specification: <strong>40kVA online UPS</strong></p>
                <p>With 15-minute battery autonomy</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Battery Capacity</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate battery Ah for 40kVA UPS, 15 minutes, 384V DC bus.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Load = 40000VA × 0.9pf = 36kW</p>
                <p>Energy for 15 min = 36kW × 0.25h = 9kWh</p>
                <p>At 85% efficiency: 9 ÷ 0.85 = 10.6kWh</p>
                <p>Ah at 384V = 10600Wh ÷ 384V = 27.6Ah</p>
                <p className="mt-2">Apply 1.25 ageing factor: 27.6 × 1.25 = 34.5Ah</p>
                <p>Apply discharge rate factor ×2: <strong>69Ah minimum</strong></p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Generator Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Size generator for 100kVA UPS with battery recharge requirement.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>UPS input power = 100kVA at 0.9 input pf</p>
                <p>UPS input = 100 × 0.9 = 90kW</p>
                <p>Add UPS losses (10%): 90 × 1.1 = 99kW</p>
                <p>Add recharge current (10%): 99 × 1.1 = 109kW</p>
                <p className="mt-2">Generator derating (0.8 pf load): 109 ÷ 0.8 = 136kVA</p>
                <p className="mt-2">Specification: <strong>150kVA diesel generator</strong></p>
                <p className="text-white/60">Next standard size with margin</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Redundancy Configurations</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>N:</strong> No redundancy - single UPS for load</li>
                <li className="pl-1"><strong>N+1:</strong> One extra module - industry standard</li>
                <li className="pl-1"><strong>2N:</strong> Fully duplicated systems - data centres</li>
                <li className="pl-1"><strong>2(N+1):</strong> Maximum resilience - Tier 4 facilities</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Requirements</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Monthly: UPS self-test, generator no-load run</li>
                <li className="pl-1">Quarterly: Generator load test (30 minutes minimum)</li>
                <li className="pl-1">Annual: Full transfer test, battery capacity test</li>
                <li className="pl-1">Document all tests and results</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Design Errors</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Undersized generator</strong> - Must handle UPS input plus recharge</li>
                <li className="pl-1"><strong>No battery room cooling</strong> - Shortens battery life dramatically</li>
                <li className="pl-1"><strong>Block loading generator</strong> - Causes transients and trips</li>
                <li className="pl-1"><strong>Insufficient autonomy</strong> - Generator needs time to start</li>
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
                <p className="font-medium text-white mb-1">UPS Types</p>
                <ul className="space-y-0.5">
                  <li>Online: 0ms transfer, best protection</li>
                  <li>Line-interactive: 2-4ms, voltage reg</li>
                  <li>Offline: 5-12ms, basic backup</li>
                  <li>Rotary: Large industrial loads</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Autonomy</p>
                <ul className="space-y-0.5">
                  <li>With generator: 5-15 minutes</li>
                  <li>Without generator: 30-60 minutes</li>
                  <li>Extended: 2-8 hours</li>
                  <li>Size for end-of-life capacity</li>
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
            <Link to="../h-n-c-module4-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Busbar Systems
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module4-section5-5">
              Next: Power Quality
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule4Section5_4;
