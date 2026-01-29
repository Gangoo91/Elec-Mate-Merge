import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Building Services Applications - HNC Module 3 Section 1.7";
const DESCRIPTION = "Apply DC circuit theory to emergency lighting, fire alarm systems, BMS controls and standby power in building services installations.";

const quickCheckQuestions = [
  {
    id: "emergency-duration",
    question: "What is the minimum maintained duration for emergency lighting in most UK premises?",
    options: ["1 hour", "2 hours", "3 hours", "4 hours"],
    correctIndex: 2,
    explanation: "BS 5266 specifies 3-hour maintained duration as standard for most premises, allowing safe evacuation and emergency services operations."
  },
  {
    id: "fire-alarm-standby",
    question: "What is the minimum standby battery capacity required for a fire alarm system?",
    options: ["12 hours", "24 hours", "48 hours", "72 hours"],
    correctIndex: 1,
    explanation: "BS 5839-1 requires minimum 24 hours standby followed by 30 minutes alarm condition for Category L/P systems."
  },
  {
    id: "bms-voltage",
    question: "What is the standard control voltage for BMS sensors and actuators?",
    options: ["12V DC", "24V DC", "48V DC", "230V AC"],
    correctIndex: 1,
    explanation: "24V DC is the industry standard for building management system controls, providing a safe low voltage whilst sufficient for powering sensors and small actuators."
  },
  {
    id: "ups-topology",
    question: "Which UPS topology provides zero transfer time to battery?",
    options: ["Standby (offline)", "Line-interactive", "Online double conversion", "Rotary UPS"],
    correctIndex: 2,
    explanation: "Online double conversion UPS continuously powers the load from the inverter, so there is no transfer time when mains fails - the load never sees any interruption."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A self-contained emergency luminaire has a 3.6V NiCd battery rated at 4Ah. What is the stored energy?",
    options: ["1.2Wh", "7.2Wh", "14.4Wh", "43.2Wh"],
    correctAnswer: 2,
    explanation: "Energy = Voltage × Capacity = 3.6V × 4Ah = 14.4Wh. This is the total energy available for the emergency duration."
  },
  {
    id: 2,
    question: "An emergency luminaire draws 6W. What battery capacity is needed for 3 hours?",
    options: ["2Ah at 6V", "3Ah at 6V", "6Ah at 3V", "All would work"],
    correctAnswer: 3,
    explanation: "Energy required = 6W × 3h = 18Wh. This could be 2Ah×6V=12Wh (not enough), 3Ah×6V=18Wh (minimum), or 6Ah×3V=18Wh. Allow 20% margin."
  },
  {
    id: 3,
    question: "A fire alarm circuit uses 1.5mm² cable for 200m. What is the loop resistance at 20°C?",
    options: ["2.4Ω", "4.8Ω", "9.7Ω", "12.1Ω"],
    correctAnswer: 1,
    explanation: "Loop resistance = 2 × length × resistance per metre = 2 × 200m × 12.1mΩ/m = 4.84Ω ≈ 4.8Ω"
  },
  {
    id: 4,
    question: "What maximum loop resistance is typically permitted on fire alarm circuits?",
    options: ["20Ω", "40Ω", "100Ω", "500Ω"],
    correctAnswer: 1,
    explanation: "Most fire alarm panels specify maximum 40Ω loop resistance for reliable device communication and detection."
  },
  {
    id: 5,
    question: "A 24V DC BMS circuit supplies sensors drawing 500mA total. What is the power consumption?",
    options: ["6W", "12W", "24W", "48W"],
    correctAnswer: 1,
    explanation: "P = V × I = 24V × 0.5A = 12W. This helps size the power supply and cable."
  },
  {
    id: 6,
    question: "What voltage drop is typically acceptable on BMS sensor circuits?",
    options: ["1%", "3%", "5%", "10%"],
    correctAnswer: 2,
    explanation: "BMS circuits typically allow 5% voltage drop (1.2V on 24V circuits) to ensure sensors and actuators operate reliably at minimum voltage."
  },
  {
    id: 7,
    question: "A UPS has 40 × 12V batteries in series. What is the DC bus voltage?",
    options: ["120V DC", "240V DC", "400V DC", "480V DC"],
    correctAnswer: 3,
    explanation: "Total voltage = Number of batteries × Battery voltage = 40 × 12V = 480V DC"
  },
  {
    id: 8,
    question: "Fire alarm standby batteries rated 24V, 7Ah. System quiescent current is 200mA. What is standby time?",
    options: ["12 hours", "24 hours", "35 hours", "48 hours"],
    correctAnswer: 2,
    explanation: "Standby time = Capacity / Current = 7Ah / 0.2A = 35 hours. Exceeds the minimum 24-hour requirement."
  },
  {
    id: 9,
    question: "Which standard covers emergency lighting design and installation?",
    options: ["BS 7671", "BS 5266", "BS 5839", "BS EN 60947"],
    correctAnswer: 1,
    explanation: "BS 5266 covers emergency lighting design, installation, and maintenance. BS 5839 covers fire detection and alarm systems."
  },
  {
    id: 10,
    question: "A generator starting battery is 24V with 500CCA. What circuit protection is typical?",
    options: ["10A fuse", "60A fuse", "100A fuse", "No protection needed"],
    correctAnswer: 2,
    explanation: "Starting circuits need heavy-duty protection due to high inrush currents. 100A-200A fuses are typical for generator starting batteries."
  }
];

const faqs = [
  {
    question: "Why do emergency lighting batteries use NiCd rather than lead-acid?",
    answer: "Nickel-cadmium (NiCd) batteries offer superior cycle life, better performance at extreme temperatures, longer shelf life when discharged, and more reliable operation after extended standby periods. Although more expensive initially, their 4-5 year typical lifespan and reliable emergency performance make them the standard choice for life safety applications."
  },
  {
    question: "What is the difference between maintained and non-maintained emergency lighting?",
    answer: "Maintained luminaires operate continuously on mains power and switch to battery during failure - common in areas requiring constant illumination. Non-maintained luminaires only illuminate during mains failure - suitable for areas with normal lighting. Maintained is required in entertainment venues and areas with dimmed lighting."
  },
  {
    question: "How do I calculate fire alarm battery requirements?",
    answer: "Calculate total quiescent current (panel + all devices). Multiply by 24 hours minimum standby. Add alarm current (all sounders) × 30 minutes. The battery Ah rating must exceed this total. Always include 25% margin for ageing. Example: 150mA quiescent × 24h = 3.6Ah + 2A alarm × 0.5h = 1Ah = 4.6Ah minimum, use 7Ah batteries."
  },
  {
    question: "Why use 24V DC rather than 230V AC for BMS controls?",
    answer: "24V DC provides inherent safety (SELV), simpler wiring without special segregation requirements, compatibility with electronic sensors and microprocessor-based controllers, reduced electrical noise, and easier battery backup integration. It also allows use of lower-cost cabling and simplified installation."
  },
  {
    question: "What is the difference between online and line-interactive UPS?",
    answer: "Online (double conversion) UPS continuously converts AC-DC-AC, providing zero transfer time and complete isolation from mains disturbances - essential for critical IT loads. Line-interactive UPS passes mains through normally with voltage regulation, switching to battery on failure with 2-4ms transfer time - suitable for less critical equipment."
  },
  {
    question: "How do generator starting circuits work?",
    answer: "A dedicated 12V or 24V DC battery bank powers the starter motor during cranking, drawing very high currents (hundreds of amps) for brief periods. The battery is kept charged by a float charger connected to mains. On mains failure, the generator controller signals the starter circuit. Most systems include multiple start attempts with cooling periods between."
  }
];

const HNCModule3Section1_7 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section1">
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
            <Zap className="h-4 w-4" />
            <span>Module 3.1.7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Building Services Applications
          </h1>
          <p className="text-white/80">
            Practical DC circuit applications in emergency lighting, fire alarms, BMS controls and standby power
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Emergency lighting:</strong> 3-hour battery backup, self-contained or central</li>
              <li className="pl-1"><strong>Fire alarms:</strong> 24-hour standby + 30 min alarm condition</li>
              <li className="pl-1"><strong>BMS controls:</strong> 24V DC sensors, actuators, controllers</li>
              <li className="pl-1"><strong>Standby power:</strong> UPS, generator starting, DC distribution</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS 5266:</strong> Emergency lighting design and installation</li>
              <li className="pl-1"><strong>BS 5839-1:</strong> Fire detection and alarm systems</li>
              <li className="pl-1"><strong>BS 7671:</strong> Wiring requirements for all systems</li>
              <li className="pl-1"><strong>BS EN 62040:</strong> UPS system requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate emergency lighting battery requirements for 3-hour duration",
              "Size fire alarm standby batteries for 24-hour operation",
              "Analyse loop resistance and voltage drop on detection circuits",
              "Design 24V DC BMS sensor wiring with correct cable sizing",
              "Understand UPS battery bank configurations and DC distribution",
              "Calculate generator starting battery requirements"
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

        {/* Section 1: Emergency Lighting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Emergency Lighting Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Emergency lighting provides illumination when the normal supply fails, enabling safe evacuation
              and emergency services operations. BS 5266 requires specific battery capacities and luminaire
              performance to ensure life safety.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Technology Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage/Cell</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Life</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NiCd</td>
                      <td className="border border-white/10 px-3 py-2">1.2V</td>
                      <td className="border border-white/10 px-3 py-2">4-5 years</td>
                      <td className="border border-white/10 px-3 py-2">Most self-contained units</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">NiMH</td>
                      <td className="border border-white/10 px-3 py-2">1.2V</td>
                      <td className="border border-white/10 px-3 py-2">3-4 years</td>
                      <td className="border border-white/10 px-3 py-2">Higher capacity applications</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Lead-acid (VRLA)</td>
                      <td className="border border-white/10 px-3 py-2">2.0V</td>
                      <td className="border border-white/10 px-3 py-2">3-5 years</td>
                      <td className="border border-white/10 px-3 py-2">Central battery systems</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LiFePO4</td>
                      <td className="border border-white/10 px-3 py-2">3.2V</td>
                      <td className="border border-white/10 px-3 py-2">5-8 years</td>
                      <td className="border border-white/10 px-3 py-2">Premium/compact units</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Self-Contained Units</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Battery integral to each luminaire</li>
                  <li className="pl-1">Typical: 3.6V NiCd, 1.5-4Ah capacity</li>
                  <li className="pl-1">Permanent live feed required</li>
                  <li className="pl-1">Simple installation, higher maintenance</li>
                  <li className="pl-1">BS 5266 minimum 3-hour duration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Central Battery Systems</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Single battery location, distributed luminaires</li>
                  <li className="pl-1">Typical: 110V or 220V DC distribution</li>
                  <li className="pl-1">Lower ongoing maintenance</li>
                  <li className="pl-1">Fire-resistant cables required</li>
                  <li className="pl-1">Centralised monitoring capability</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Capacity Calculation</p>
              <p className="font-mono text-center text-lg mb-2">C = P × t / V × 1.25</p>
              <p className="text-xs text-white/70 text-center">Where C = capacity (Ah), P = power (W), t = time (h), V = voltage (V), 1.25 = ageing factor</p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design tip:</strong> Always apply 25% capacity margin to account for battery ageing over its service life.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Fire Alarm Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Fire Alarm Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Fire detection and alarm systems require reliable DC power for continuous monitoring. BS 5839-1
              mandates specific standby battery requirements ensuring operation during mains failure.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">BS 5839-1 Battery Requirements</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Category L/P systems:</strong> 24 hours standby + 30 minutes alarm</li>
                <li className="pl-1"><strong>Category M systems:</strong> 72 hours standby + 15 minutes alarm</li>
                <li className="pl-1"><strong>Replacement:</strong> When capacity drops below 80% of nominal</li>
                <li className="pl-1"><strong>Typical battery life:</strong> 4-5 years for VRLA types</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Fire Alarm Circuit Considerations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Value</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Loop voltage</td>
                      <td className="border border-white/10 px-3 py-2">17-28V DC</td>
                      <td className="border border-white/10 px-3 py-2">Panel dependent, check specs</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Max loop resistance</td>
                      <td className="border border-white/10 px-3 py-2">40Ω</td>
                      <td className="border border-white/10 px-3 py-2">Limits cable length/size</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Quiescent current</td>
                      <td className="border border-white/10 px-3 py-2">100-300mA</td>
                      <td className="border border-white/10 px-3 py-2">Panel + all devices</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Alarm current</td>
                      <td className="border border-white/10 px-3 py-2">1-3A</td>
                      <td className="border border-white/10 px-3 py-2">All sounders operating</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Cable type</td>
                      <td className="border border-white/10 px-3 py-2">FP200/MICC</td>
                      <td className="border border-white/10 px-3 py-2">Fire-resistant required</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Loop Resistance Calculation</p>
              <p className="font-mono text-center text-lg mb-2">R<sub>loop</sub> = 2 × L × r</p>
              <p className="text-xs text-white/70 text-center">Where L = cable length (m), r = conductor resistance (Ω/m)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Voltage Drop on Sounder Circuits</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Calculate worst-case (end device)</li>
                  <li className="pl-1">Include all devices operating</li>
                  <li className="pl-1">Verify device minimum voltage</li>
                  <li className="pl-1">Allow for battery end-of-discharge</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Sizing Steps</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">1. Determine total loop current</li>
                  <li className="pl-1">2. Calculate required loop length</li>
                  <li className="pl-1">3. Check loop resistance vs max</li>
                  <li className="pl-1">4. Verify voltage drop acceptable</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Critical:</strong> Fire alarm circuits must use fire-resistant cable (e.g., FP200) maintaining circuit integrity for minimum 30 minutes in fire conditions.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: BMS and Controls */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            BMS and Controls
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building Management Systems use 24V DC control circuits extensively for sensors, actuators,
              and controllers. Understanding DC circuit principles is essential for reliable BMS wiring design.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common BMS DC Applications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Device</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Current</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Temperature sensor</td>
                      <td className="border border-white/10 px-3 py-2">24V DC</td>
                      <td className="border border-white/10 px-3 py-2">10-20mA</td>
                      <td className="border border-white/10 px-3 py-2">4-20mA output signal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">CO2 sensor</td>
                      <td className="border border-white/10 px-3 py-2">24V DC</td>
                      <td className="border border-white/10 px-3 py-2">30-50mA</td>
                      <td className="border border-white/10 px-3 py-2">Active sensing element</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Valve actuator</td>
                      <td className="border border-white/10 px-3 py-2">24V AC/DC</td>
                      <td className="border border-white/10 px-3 py-2">100-500mA</td>
                      <td className="border border-white/10 px-3 py-2">Higher during operation</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Damper actuator</td>
                      <td className="border border-white/10 px-3 py-2">24V AC/DC</td>
                      <td className="border border-white/10 px-3 py-2">200-800mA</td>
                      <td className="border border-white/10 px-3 py-2">Spring return types higher</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Outstation/controller</td>
                      <td className="border border-white/10 px-3 py-2">24V DC</td>
                      <td className="border border-white/10 px-3 py-2">200-500mA</td>
                      <td className="border border-white/10 px-3 py-2">Depends on I/O count</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">24V DC Supply Sizing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Total all device currents</li>
                  <li className="pl-1">Add 20% growth capacity</li>
                  <li className="pl-1">Consider inrush currents</li>
                  <li className="pl-1">Typical PSUs: 2.5A, 5A, 10A</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Selection</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Max 5% voltage drop (1.2V at 24V)</li>
                  <li className="pl-1">Screened cable for analogue signals</li>
                  <li className="pl-1">Twisted pairs reduce interference</li>
                  <li className="pl-1">Segregate from power cables</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensor Loop Resistance Calculation</p>
              <p className="font-mono text-center text-lg mb-2">R<sub>max</sub> = V<sub>drop(max)</sub> / I<sub>loop</sub></p>
              <p className="text-xs text-white/70 text-center">Example: 1.2V max drop, 50mA loop = 24Ω maximum cable resistance</p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Signal Types</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>0-10V DC:</strong> Analogue control signal, voltage referenced to common</li>
                <li className="pl-1"><strong>4-20mA:</strong> Current loop, immune to voltage drop, 4mA = live zero</li>
                <li className="pl-1"><strong>Digital I/O:</strong> 24V DC switched signals, typically volt-free contacts</li>
                <li className="pl-1"><strong>RS-485:</strong> Serial communication, twisted pair, up to 1200m</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Use 4-20mA signals for long cable runs - the current loop is immune to voltage drop that would affect 0-10V signals.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Standby Power Systems */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Standby Power Systems
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Standby power systems rely heavily on DC circuits - from UPS battery banks providing
              uninterrupted power to generator starting batteries and DC distribution for critical systems.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">UPS Battery Configurations</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Configuration</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Small UPS</td>
                      <td className="border border-white/10 px-3 py-2">12-48V DC</td>
                      <td className="border border-white/10 px-3 py-2">Desktop, small servers</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Medium UPS</td>
                      <td className="border border-white/10 px-3 py-2">192-240V DC</td>
                      <td className="border border-white/10 px-3 py-2">Server rooms</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Large UPS</td>
                      <td className="border border-white/10 px-3 py-2">400-480V DC</td>
                      <td className="border border-white/10 px-3 py-2">Data centres</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modular UPS</td>
                      <td className="border border-white/10 px-3 py-2">Variable</td>
                      <td className="border border-white/10 px-3 py-2">Scalable installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">UPS Topologies</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Standby (offline):</strong> Cheapest, 5-12ms transfer time, basic protection</li>
                <li className="pl-1"><strong>Line-interactive:</strong> Voltage regulation, 2-4ms transfer, good value</li>
                <li className="pl-1"><strong>Online double conversion:</strong> Zero transfer, complete isolation, highest protection</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Battery Bank Sizing</p>
              <p className="font-mono text-center text-lg mb-2">Ah = (P × t) / (V × η × DoD)</p>
              <p className="text-xs text-white/70 text-center">Where η = inverter efficiency (~0.9), DoD = depth of discharge (~0.8 for lead-acid)</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Generator Starting Batteries</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Typically 12V or 24V systems</li>
                  <li className="pl-1">High CCA (Cold Cranking Amps) rating</li>
                  <li className="pl-1">Float charging maintains readiness</li>
                  <li className="pl-1">Multiple start attempts programmed</li>
                  <li className="pl-1">Heating in cold environments</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">DC Distribution</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">48V DC for telecom equipment</li>
                  <li className="pl-1">24V DC for control systems</li>
                  <li className="pl-1">DC circuit breakers required</li>
                  <li className="pl-1">Polarity protection essential</li>
                  <li className="pl-1">Fusing sized for battery short-circuit</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Starting Battery Calculation</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Generator Size</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Battery</th>
                      <th className="border border-white/10 px-3 py-2 text-left">CCA Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">10-50 kVA</td>
                      <td className="border border-white/10 px-3 py-2">12V 100Ah</td>
                      <td className="border border-white/10 px-3 py-2">600-800 CCA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">50-200 kVA</td>
                      <td className="border border-white/10 px-3 py-2">24V (2×12V) 100Ah</td>
                      <td className="border border-white/10 px-3 py-2">800-1200 CCA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">200-500 kVA</td>
                      <td className="border border-white/10 px-3 py-2">24V 150-200Ah</td>
                      <td className="border border-white/10 px-3 py-2">1200-1500 CCA</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">&gt;500 kVA</td>
                      <td className="border border-white/10 px-3 py-2">24V 200Ah+</td>
                      <td className="border border-white/10 px-3 py-2">1500+ CCA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety note:</strong> Large DC battery banks can deliver extremely high fault currents. Proper fusing and DC-rated isolation devices are essential.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Emergency Lighting Battery Sizing</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> An emergency luminaire uses a 5W LED lamp with 3.6V NiCd battery. Calculate the minimum battery capacity for 3-hour operation.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Energy required = Power × Time</p>
                <p>E = 5W × 3h = <strong>15Wh</strong></p>
                <p className="mt-2">Battery capacity at 3.6V:</p>
                <p>C = E / V = 15Wh / 3.6V = 4.17Ah</p>
                <p className="mt-2">With 25% ageing factor:</p>
                <p>C<sub>design</sub> = 4.17 × 1.25 = <strong>5.2Ah minimum</strong></p>
                <p className="mt-2 text-white/60">→ Specify 6Ah battery (next standard size)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Fire Alarm Battery Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A fire alarm system has 180mA quiescent current and 2.5A alarm current. Size batteries for 24V system.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Standby requirement (24 hours):</p>
                <p>E<sub>standby</sub> = 0.18A × 24h = 4.32Ah</p>
                <p className="mt-2">Alarm requirement (30 minutes):</p>
                <p>E<sub>alarm</sub> = 2.5A × 0.5h = 1.25Ah</p>
                <p className="mt-2">Total required:</p>
                <p>E<sub>total</sub> = 4.32 + 1.25 = 5.57Ah</p>
                <p className="mt-2">With 25% margin:</p>
                <p>C<sub>design</sub> = 5.57 × 1.25 = <strong>6.96Ah</strong></p>
                <p className="mt-2 text-green-400">→ Specify 2 × 12V 7Ah batteries in series</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: BMS Sensor Loop Resistance</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A 24V DC sensor circuit runs 80m using 0.75mm² cable. Current is 40mA. Check voltage drop is within 5%.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Cable resistance (0.75mm²) = 24.5mΩ/m</p>
                <p className="mt-2">Loop resistance:</p>
                <p>R = 2 × 80m × 24.5mΩ/m = 3.92Ω</p>
                <p className="mt-2">Voltage drop:</p>
                <p>V<sub>drop</sub> = I × R = 0.04A × 3.92Ω = <strong>0.157V</strong></p>
                <p className="mt-2">As percentage:</p>
                <p>(0.157 / 24) × 100 = <strong>0.65%</strong></p>
                <p className="mt-2 text-green-400">✓ Well within 5% limit - 0.75mm² is adequate</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 4: Fire Alarm Loop Resistance Check</h3>
              <p className="text-sm text-white mb-2">
                <strong>Question:</strong> A fire alarm detection loop uses 1.5mm² cable and is 350m long. Will it meet the 40Ω maximum?
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Cable resistance (1.5mm²) = 12.1mΩ/m</p>
                <p className="mt-2">Loop resistance:</p>
                <p>R = 2 × 350m × 12.1mΩ/m = 8.47Ω</p>
                <p className="mt-2 text-green-400">✓ 8.47Ω is well below 40Ω limit</p>
                <p className="mt-2 text-white/60">Maximum length with 1.5mm² cable:</p>
                <p>L<sub>max</sub> = 40Ω / (2 × 12.1mΩ/m) = <strong>1653m</strong></p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Essential Formulas for Building Services DC</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Battery capacity:</strong> C = (P × t) / V × safety factor</li>
                <li className="pl-1"><strong>Loop resistance:</strong> R = 2 × L × r (per metre)</li>
                <li className="pl-1"><strong>Voltage drop:</strong> V<sub>d</sub> = I × R<sub>loop</sub></li>
                <li className="pl-1"><strong>Power:</strong> P = V × I (DC circuits)</li>
                <li className="pl-1"><strong>Energy:</strong> E = V × Ah (Wh) or P × t</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Emergency lighting duration: <strong>3 hours</strong> minimum (BS 5266)</li>
                <li className="pl-1">Fire alarm standby: <strong>24 hours + 30 min</strong> alarm (BS 5839)</li>
                <li className="pl-1">BMS control voltage: <strong>24V DC</strong> standard</li>
                <li className="pl-1">Maximum BMS voltage drop: <strong>5%</strong> (1.2V at 24V)</li>
                <li className="pl-1">Typical fire alarm loop max: <strong>40Ω</strong></li>
                <li className="pl-1">Battery ageing factor: <strong>1.25</strong> (25% margin)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Forgetting loop factor:</strong> Cable resistance must include both conductors (×2)</li>
                <li className="pl-1"><strong>Ignoring ageing:</strong> Batteries lose capacity over time - always add margin</li>
                <li className="pl-1"><strong>Mixing AC/DC:</strong> Some actuators accept both, check specifications</li>
                <li className="pl-1"><strong>Wrong cable type:</strong> Fire alarm circuits need fire-resistant cable</li>
                <li className="pl-1"><strong>Undersized starting batteries:</strong> Generator cranking needs high CCA rating</li>
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
                <p className="font-medium text-white mb-1">Key Standards</p>
                <ul className="space-y-0.5">
                  <li>BS 5266 - Emergency lighting</li>
                  <li>BS 5839-1 - Fire detection/alarm</li>
                  <li>BS 7671 - Wiring regulations</li>
                  <li>BS EN 62040 - UPS systems</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Typical Requirements</p>
                <ul className="space-y-0.5">
                  <li>Emergency: 3h duration, NiCd batteries</li>
                  <li>Fire alarm: 24h standby + 30min alarm</li>
                  <li>BMS: 24V DC, max 5% voltage drop</li>
                  <li>UPS: Online for critical, size for load × time</li>
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
            <Link to="../h-n-c-module3-section1-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module3-section2">
              Next: AC Circuit Theory
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule3Section1_7;
