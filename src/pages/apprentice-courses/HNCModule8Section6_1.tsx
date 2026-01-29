import { ArrowLeft, Zap, CheckCircle, Fan, Cable, Gauge, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "HVAC Electrical Requirements - HNC Module 8 Section 6.1";
const DESCRIPTION = "Master HVAC electrical requirements: electrical load schedules, supply voltages (230V, 400V 3-phase), motor power calculations, control wiring specifications, cable containment coordination, BS 7671 requirements, and MCC design for HVAC plant.";

const quickCheckQuestions = [
  {
    id: "hvac-load-calculation",
    question: "When calculating the total electrical load for an HVAC system, which factor must be applied to motor full load current to determine cable sizing?",
    options: ["0.8 (80% derating)", "1.0 (exact FLC)", "1.25 (25% increase)", "1.5 (50% increase)"],
    correctIndex: 2,
    explanation: "BS 7671 Regulation 433.3.1 requires that conductors supplying motors shall be rated for not less than 125% of the full load current of the motor to account for starting conditions and continuous operation at rated load."
  },
  {
    id: "control-wiring-voltage",
    question: "What is the typical voltage classification for BMS control wiring connecting to HVAC equipment?",
    options: ["Mains voltage (230V AC)", "Extra-Low Voltage (typically 24V AC/DC)", "Medium voltage (1000V)", "High voltage (11kV)"],
    correctIndex: 1,
    explanation: "BMS control signals typically operate at Extra-Low Voltage (ELV), commonly 24V AC or DC. This provides safety advantages and allows smaller cable sizes, though mains-rated control circuits are also used for direct switching applications."
  },
  {
    id: "containment-separation",
    question: "According to BS 7671, what is the minimum separation required between power cables and ELV control cables in shared containment?",
    options: ["No separation required", "Physical partition or 50mm spacing", "Physical partition or 150mm spacing", "Separate containment routes only"],
    correctIndex: 1,
    explanation: "BS 7671 Regulation 528.1 requires segregation between Band I (ELV) and Band II (LV mains) circuits. This can be achieved by physical partition, 50mm separation in cable tray, or separate compartments in trunking systems."
  },
  {
    id: "mcc-protection",
    question: "What type of motor protection device is typically specified in an MCC to prevent damage from prolonged overload conditions?",
    options: ["MCB only", "Fuse only", "Thermal overload relay", "Time delay relay"],
    correctIndex: 2,
    explanation: "Thermal overload relays (or electronic equivalents) are essential motor protection devices that monitor current over time. They trip when sustained overload conditions would cause motor winding damage, providing protection that instantaneous devices cannot offer."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 15kW three-phase HVAC chiller motor operates at 400V with a power factor of 0.85. What is the approximate full load current (FLC)?",
    options: [
      "18.5A",
      "22A",
      "25.5A",
      "32A"
    ],
    correctAnswer: 2,
    explanation: "FLC = P / (√3 × V × pf) = 15,000 / (1.732 × 400 × 0.85) = 15,000 / 588.7 = 25.5A. This calculation is essential for cable sizing and protective device selection."
  },
  {
    id: 2,
    question: "Which BS 7671 regulation specifically addresses the requirements for motor circuit protection?",
    options: ["Section 411", "Section 433", "Section 525", "Section 701"],
    correctAnswer: 1,
    explanation: "Section 433 of BS 7671 covers protection against overload current, including specific requirements for motor circuits in Regulation 433.3. This includes the 125% conductor rating requirement."
  },
  {
    id: 3,
    question: "When designing cable containment for HVAC plant rooms, what percentage spare capacity is recommended for future expansion?",
    options: ["10%", "15%", "25%", "50%"],
    correctAnswer: 2,
    explanation: "Industry best practice recommends 25% spare capacity in cable containment systems for HVAC installations. This accommodates future plant additions, control upgrades, and maintenance access without complete containment redesign."
  },
  {
    id: 4,
    question: "What is the standard supply voltage for large HVAC equipment such as chillers and AHU motors in UK commercial installations?",
    options: [
      "230V single-phase",
      "400V three-phase",
      "230V three-phase",
      "415V three-phase"
    ],
    correctAnswer: 1,
    explanation: "400V three-phase (phase-to-phase) is the standard UK commercial/industrial supply voltage. Motors above approximately 3kW are typically three-phase for efficiency and starting current benefits."
  },
  {
    id: 5,
    question: "In an MCC (Motor Control Centre) design, what is the purpose of the interposing relay between BMS output and motor starter?",
    options: [
      "To amplify the BMS signal strength",
      "To provide isolation between BMS and power circuits",
      "To reduce motor starting current",
      "To convert AC to DC voltage"
    ],
    correctAnswer: 1,
    explanation: "Interposing relays provide galvanic isolation between BMS control circuits (typically 24V ELV) and mains-voltage motor starter coils. This protects sensitive BMS equipment and allows voltage level conversion."
  },
  {
    id: 6,
    question: "According to BS 7671, what type of cable should be used for mains-rated HVAC control circuits in industrial environments?",
    options: [
      "Any PVC-insulated cable",
      "Steel wire armoured (SWA) or equivalent mechanical protection",
      "Flexible cord only",
      "Rubber-insulated cable"
    ],
    correctAnswer: 1,
    explanation: "Industrial HVAC installations typically require mechanically protected cables such as SWA (BS 5467/6724) or cables in conduit/trunking. This provides protection against mechanical damage in plant room environments."
  },
  {
    id: 7,
    question: "What is the minimum IP rating typically required for electrical equipment installed in a mechanical plant room?",
    options: ["IP20", "IP44", "IP54", "IP65"],
    correctAnswer: 2,
    explanation: "Plant rooms typically require IP54 minimum (dust protected, splash proof) due to potential condensation, maintenance water spillage, and general industrial conditions. Higher ratings may be needed near cooling towers or humidifiers."
  },
  {
    id: 8,
    question: "When calculating HVAC electrical loads, what diversity factor is typically applied to multiple fan coil units on a common circuit?",
    options: ["1.0 (no diversity)", "0.9", "0.8", "0.6"],
    correctAnswer: 2,
    explanation: "A diversity factor of 0.8 (80%) is commonly applied to multiple fan coil units as they rarely all operate at maximum simultaneously. This reflects realistic loading patterns whilst maintaining adequate capacity."
  },
  {
    id: 9,
    question: "What is the purpose of a Variable Speed Drive (VSD) in HVAC motor control?",
    options: [
      "To increase motor starting torque",
      "To vary motor speed for energy efficiency and demand matching",
      "To provide motor isolation only",
      "To convert single-phase to three-phase"
    ],
    correctAnswer: 1,
    explanation: "VSDs (also called VFDs or inverters) vary motor speed to match actual demand, significantly improving energy efficiency. HVAC fans and pumps following affinity laws achieve major energy savings at reduced speeds."
  },
  {
    id: 10,
    question: "Which document defines the interface points between HVAC mechanical contractor and electrical contractor?",
    options: [
      "Building Regulations Part P",
      "Points of Connection Schedule (PoC)",
      "CIBSE Guide M",
      "BS 7671 Appendix 4"
    ],
    correctAnswer: 1,
    explanation: "The Points of Connection (PoC) Schedule defines exact interface points, responsibilities, and connection requirements between mechanical and electrical contractors. This is essential for coordination and prevents costly site disputes."
  },
  {
    id: 11,
    question: "What earthing arrangement is typically used for HVAC equipment in UK commercial buildings?",
    options: [
      "TT system only",
      "IT system",
      "TN-S or TN-C-S system",
      "No earthing required"
    ],
    correctAnswer: 2,
    explanation: "UK commercial buildings typically use TN-S or TN-C-S earthing systems. HVAC equipment must be bonded to the main earthing terminal, with supplementary bonding in plant rooms as required by BS 7671 Section 411."
  },
  {
    id: 12,
    question: "What is the recommended maximum voltage drop for motor circuits according to BS 7671 guidance?",
    options: [
      "2% of nominal voltage",
      "3% of nominal voltage",
      "4% of nominal voltage",
      "5% of nominal voltage"
    ],
    correctAnswer: 3,
    explanation: "BS 7671 Appendix 4 recommends a maximum 5% voltage drop from origin to final load. For motor circuits, this ensures adequate starting voltage and prevents operational issues at full load."
  },
  {
    id: 13,
    question: "In HVAC load schedules, what does the abbreviation 'DOL' indicate for motor starting method?",
    options: [
      "Delayed On-Line",
      "Direct On-Line",
      "Dual Operating Load",
      "Dynamic Output Limiter"
    ],
    correctAnswer: 1,
    explanation: "DOL (Direct On-Line) starting connects the motor directly to full supply voltage. It's simple and economical but produces high starting currents (6-8× FLC) and is typically limited to motors under 7.5-11kW."
  },
  {
    id: 14,
    question: "What information must be included on HVAC equipment nameplates according to BS EN 60204-1?",
    options: [
      "Manufacturer name only",
      "Rated voltage, current, frequency, and IP rating",
      "Installation date and contractor",
      "Building address and floor level"
    ],
    correctAnswer: 1,
    explanation: "BS EN 60204-1 requires nameplates to show: manufacturer, supply voltage, number of phases, frequency, full load current, IP rating, and other relevant operational data. This information is essential for safe operation and maintenance."
  }
];

const faqs = [
  {
    question: "How do I calculate the electrical load for an HVAC system?",
    answer: "HVAC electrical load calculation involves: 1) Listing all equipment (chillers, AHUs, pumps, FCUs, controls) with nameplate ratings. 2) Applying starting current factors for motors (typically 6-8× FLC for DOL, 2-3× for soft start/VSD). 3) Applying diversity factors based on simultaneous operation likelihood (typically 0.7-0.9). 4) Adding control system loads (BMS panels, actuators, sensors). 5) Summing for total connected load and applying overall diversity for maximum demand. Always verify manufacturer data and consider future expansion."
  },
  {
    question: "What is the difference between mains-rated and ELV control wiring for HVAC?",
    answer: "Mains-rated control wiring (230V/400V) is used for direct switching of equipment, safety interlocks, and local control panels. It requires the same installation standards as power wiring per BS 7671. ELV control wiring (typically 24V AC/DC) is used for BMS signals, sensor connections, and actuator control. ELV circuits must be segregated from mains circuits per Regulation 528.1 but can use lighter-duty cables. The choice depends on equipment requirements, with modern systems increasingly using ELV for BMS integration."
  },
  {
    question: "How should cable containment be coordinated between HVAC and electrical services?",
    answer: "Coordination requires: 1) Early engagement between M&E designers during RIBA Stage 3/4. 2) Shared containment routes where appropriate with segregation for different voltage bands. 3) Clear zone allocation - typically electrical on one level, mechanical above/below. 4) Common bracket systems to reduce support proliferation. 5) Defined crossing points with appropriate clearances. 6) 3D BIM coordination to identify clashes before installation. 7) Regular design coordination meetings and documented decision records."
  },
  {
    question: "What motor starting methods are used in HVAC applications?",
    answer: "Common methods include: DOL (Direct On-Line) - simple, economical, high starting current, suitable for small motors under 7.5-11kW. Star-Delta - reduces starting current to 1/3 of DOL, requires 6-wire connection, causes torque dip during changeover. Soft Starter - electronic current limiting, smooth acceleration, typically 2-4× FLC starting current. VSD (Variable Speed Drive) - lowest starting current, full speed control, highest efficiency, preferred for variable-load applications like fans and pumps. Selection depends on motor size, starting frequency, network capacity, and control requirements."
  },
  {
    question: "What are the key BS 7671 requirements for HVAC installations?",
    answer: "Key BS 7671 requirements include: Section 433 - motor conductor sizing at 125% FLC minimum. Section 411 - fault protection and earthing. Section 528 - segregation of circuits including Band I/II separation. Section 422 - protection against fire, relevant for plant rooms. Section 514 - identification and notices. Appendix 4 - voltage drop limits. Additionally, BS EN 60204-1 applies to HVAC equipment safety, and CIBSE guides provide specific HVAC design guidance that complements the Wiring Regulations."
  },
  {
    question: "How is an MCC (Motor Control Centre) designed for HVAC plant?",
    answer: "MCC design involves: 1) Determining form of separation (typically Form 2 or 4 for HVAC). 2) Sizing incoming supply based on total load plus diversity. 3) Arranging motor starters logically by system (chiller, pumps, AHU). 4) Including local/remote selector switches, run/trip indication, and hour meters. 5) Providing BMS interface points (volt-free contacts, analogue outputs). 6) Specifying thermal overload protection, short circuit protection, and isolation facilities. 7) Ensuring adequate IP rating and ventilation. 8) Allowing 20-25% spare capacity for future plant."
  }
];

const HNCModule8Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section6">
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
            <span>Module 8.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            HVAC Electrical Requirements
          </h1>
          <p className="text-white/80">
            Electrical loads, power supplies, control wiring, cable containment, and installation standards for HVAC systems
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Supply voltages:</strong> 230V single-phase, 400V three-phase</li>
              <li className="pl-1"><strong>Motor sizing:</strong> 125% FLC for conductor rating</li>
              <li className="pl-1"><strong>Control wiring:</strong> Mains-rated or ELV (24V) with segregation</li>
              <li className="pl-1"><strong>MCC design:</strong> Form 2-4 separation, 25% spare capacity</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Standards</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>BS 7671:</strong> Wiring Regulations, Sections 433, 528</li>
              <li className="pl-1"><strong>BS EN 60204-1:</strong> Electrical equipment of machines</li>
              <li className="pl-1"><strong>BS EN 61439:</strong> Low-voltage switchgear assemblies</li>
              <li className="pl-1"><strong>CIBSE Guide K:</strong> Electricity in buildings</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Calculate HVAC electrical loads and apply diversity factors",
              "Specify appropriate supply voltages for HVAC equipment",
              "Design motor circuits compliant with BS 7671 Section 433",
              "Distinguish between mains-rated and ELV control wiring",
              "Coordinate cable containment with other building services",
              "Design MCC panels for HVAC plant room applications"
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

        {/* Section 1: HVAC Electrical Load Schedules */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            HVAC Electrical Load Schedules
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Accurate electrical load scheduling is fundamental to HVAC system design. The load schedule
              documents all electrical equipment, their power requirements, and provides the basis for
              sizing distribution boards, cables, and incoming supplies. Understanding how to compile
              and interpret these schedules is essential for effective coordination between mechanical
              and electrical disciplines.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical HVAC Equipment Categories:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Primary plant:</strong> Chillers, boilers, heat pumps (typically largest loads, 50-500kW)</li>
                <li className="pl-1"><strong>Distribution equipment:</strong> Pumps, fans, AHUs (variable loads, 1-50kW)</li>
                <li className="pl-1"><strong>Terminal units:</strong> Fan coil units, VAV boxes, unit heaters (small loads, 0.1-2kW)</li>
                <li className="pl-1"><strong>Controls:</strong> BMS panels, actuators, sensors, valves (low power, typically &lt;1kW total)</li>
                <li className="pl-1"><strong>Ancillary:</strong> Electric trace heating, water treatment, condensate pumps</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sample HVAC Load Schedule Format</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Equipment</th>
                      <th className="border border-white/10 px-3 py-2 text-left">kW</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Voltage</th>
                      <th className="border border-white/10 px-3 py-2 text-left">FLC (A)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Starting</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Chiller No.1</td>
                      <td className="border border-white/10 px-3 py-2">150</td>
                      <td className="border border-white/10 px-3 py-2">400V 3ph</td>
                      <td className="border border-white/10 px-3 py-2">255</td>
                      <td className="border border-white/10 px-3 py-2">VSD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">LTHW Pump P1</td>
                      <td className="border border-white/10 px-3 py-2">11</td>
                      <td className="border border-white/10 px-3 py-2">400V 3ph</td>
                      <td className="border border-white/10 px-3 py-2">21</td>
                      <td className="border border-white/10 px-3 py-2">DOL</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">AHU-01 Supply Fan</td>
                      <td className="border border-white/10 px-3 py-2">22</td>
                      <td className="border border-white/10 px-3 py-2">400V 3ph</td>
                      <td className="border border-white/10 px-3 py-2">38</td>
                      <td className="border border-white/10 px-3 py-2">VSD</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">FCU (×20 units)</td>
                      <td className="border border-white/10 px-3 py-2">0.15 ea</td>
                      <td className="border border-white/10 px-3 py-2">230V 1ph</td>
                      <td className="border border-white/10 px-3 py-2">0.7 ea</td>
                      <td className="border border-white/10 px-3 py-2">DOL</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BMS Panel</td>
                      <td className="border border-white/10 px-3 py-2">0.5</td>
                      <td className="border border-white/10 px-3 py-2">230V 1ph</td>
                      <td className="border border-white/10 px-3 py-2">2.2</td>
                      <td className="border border-white/10 px-3 py-2">N/A</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Diversity Factors for HVAC Loads</p>
              <ul className="text-sm space-y-1">
                <li>- Chillers (multiple): 0.8-0.9 (staged operation)</li>
                <li>- Pumps (duty/standby): 0.5-0.6 (one operates at a time)</li>
                <li>- Fan coil units: 0.7-0.8 (varied zone demands)</li>
                <li>- AHU supply/extract: 0.9-1.0 (typically simultaneous)</li>
                <li>- Overall HVAC system: 0.7-0.85 (depends on control strategy)</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> Always obtain manufacturer data sheets for accurate electrical ratings. Nameplate data supersedes estimated calculations, particularly for equipment with integrated VSDs or electronic controls.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Supply Voltages and Motor Power Calculations */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Supply Voltages and Motor Power Calculations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              UK HVAC installations utilise standard supply voltages of 230V single-phase and 400V
              three-phase. Understanding motor power calculations enables correct cable sizing,
              protective device selection, and switchgear specification. These calculations form
              the foundation of all HVAC electrical design work.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Single-Phase (230V)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Small FCUs and unit heaters</li>
                  <li className="pl-1">Domestic heat pumps (&lt;3kW)</li>
                  <li className="pl-1">Control panels and BMS</li>
                  <li className="pl-1">Small circulation pumps</li>
                  <li className="pl-1">Actuators and damper motors</li>
                </ul>
                <div className="mt-3 p-2 bg-black/30 rounded text-sm font-mono">
                  <p className="text-white/60">Current calculation:</p>
                  <p className="text-green-400">I = P / (V × pf)</p>
                  <p className="text-white/80 mt-1">Example: 2.3kW, pf 0.85</p>
                  <p className="text-white/80">I = 2300 / (230 × 0.85) = 11.8A</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase (400V)</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Chillers and large heat pumps</li>
                  <li className="pl-1">AHU supply and extract fans</li>
                  <li className="pl-1">Chilled water pumps</li>
                  <li className="pl-1">Cooling towers</li>
                  <li className="pl-1">Motors &gt;3kW typically</li>
                </ul>
                <div className="mt-3 p-2 bg-black/30 rounded text-sm font-mono">
                  <p className="text-white/60">Current calculation:</p>
                  <p className="text-green-400">I = P / (√3 × V × pf)</p>
                  <p className="text-white/80 mt-1">Example: 22kW, pf 0.85</p>
                  <p className="text-white/80">I = 22000 / (1.732 × 400 × 0.85) = 37.3A</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Current and Cable Sizing Requirements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Motor Rating</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Approx FLC (400V)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Min Cable (125%)</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Protection</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">4kW</td>
                      <td className="border border-white/10 px-3 py-2">8A</td>
                      <td className="border border-white/10 px-3 py-2">10A (1.5mm²)</td>
                      <td className="border border-white/10 px-3 py-2">10A MCB + 10A overload</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">7.5kW</td>
                      <td className="border border-white/10 px-3 py-2">15A</td>
                      <td className="border border-white/10 px-3 py-2">19A (2.5mm²)</td>
                      <td className="border border-white/10 px-3 py-2">20A MCB + 16A overload</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">15kW</td>
                      <td className="border border-white/10 px-3 py-2">28A</td>
                      <td className="border border-white/10 px-3 py-2">35A (6mm²)</td>
                      <td className="border border-white/10 px-3 py-2">32A MCB + 30A overload</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">30kW</td>
                      <td className="border border-white/10 px-3 py-2">55A</td>
                      <td className="border border-white/10 px-3 py-2">69A (16mm²)</td>
                      <td className="border border-white/10 px-3 py-2">63A MCCB + 55A overload</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">55kW</td>
                      <td className="border border-white/10 px-3 py-2">100A</td>
                      <td className="border border-white/10 px-3 py-2">125A (35mm²)</td>
                      <td className="border border-white/10 px-3 py-2">125A MCCB + 100A overload</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Motor Starting Methods and Current Draw</p>
              <div className="text-sm space-y-2">
                <p><strong>DOL (Direct On-Line):</strong> 6-8× FLC starting current, simplest method, limited to motors &lt;11kW typically</p>
                <p><strong>Star-Delta:</strong> Starting current reduced to ~33% of DOL, requires 6-core cable, torque dip on changeover</p>
                <p><strong>Soft Starter:</strong> 2-4× FLC starting, smooth acceleration, current limiting, reduced mechanical stress</p>
                <p><strong>VSD/VFD:</strong> 1-1.5× FLC starting, full speed control, energy savings on variable loads, harmonic considerations</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Important:</strong> BS 7671 Regulation 433.3.1 requires motor circuit conductors to be rated at not less than 125% of FLC. This accounts for motor temperature rise and ensures the cable can handle continuous full-load operation.
            </p>
          </div>
        </section>

        {/* Section 3: Control Wiring and BMS Integration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Control Wiring and BMS Integration
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              HVAC systems require extensive control wiring connecting the Building Management System (BMS)
              to field devices. Understanding the distinction between mains-rated and extra-low voltage
              (ELV) control circuits is essential for safe installation design and compliance with
              BS 7671 segregation requirements.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">Control Circuit Voltage Classifications</p>
              <ul className="text-sm space-y-1">
                <li>- <strong>Mains-rated (Band II):</strong> 230V AC control circuits, motor starter coils, direct-switched equipment</li>
                <li>- <strong>ELV (Band I):</strong> Typically 24V AC or DC, BMS field devices, sensors, actuators</li>
                <li>- <strong>SELV:</strong> Safety extra-low voltage, isolated from earth, used for sensitive electronics</li>
                <li>- <strong>PELV:</strong> Protective extra-low voltage, earthed reference, common for BMS</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Cable className="h-4 w-4 text-elec-yellow/80" />
                  <p className="text-sm font-medium text-elec-yellow/80">Mains-Rated Control Wiring</p>
                </div>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">230V AC contactor coils</li>
                  <li className="pl-1">Safety interlock circuits</li>
                  <li className="pl-1">Local start/stop stations</li>
                  <li className="pl-1">Run/trip indication lamps</li>
                  <li className="pl-1">Emergency stop circuits</li>
                </ul>
                <p className="text-sm text-white/70 mt-2">Requires same installation standards as power cables per BS 7671</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="h-4 w-4 text-elec-yellow/80" />
                  <p className="text-sm font-medium text-elec-yellow/80">ELV Control Wiring (24V)</p>
                </div>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">BMS digital inputs/outputs</li>
                  <li className="pl-1">Temperature sensors (NTC, PT1000)</li>
                  <li className="pl-1">Actuator control (0-10V, 4-20mA)</li>
                  <li className="pl-1">Pressure transducers</li>
                  <li className="pl-1">Damper position feedback</li>
                </ul>
                <p className="text-sm text-white/70 mt-2">Must be segregated from Band II circuits per Regulation 528.1</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BMS Interface Requirements at MCC</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Signal Type</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Direction</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Provision</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Start/Stop Command</td>
                      <td className="border border-white/10 px-3 py-2">BMS → MCC</td>
                      <td className="border border-white/10 px-3 py-2">Volt-free contact via interposing relay</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Run Status</td>
                      <td className="border border-white/10 px-3 py-2">MCC → BMS</td>
                      <td className="border border-white/10 px-3 py-2">Auxiliary contact on contactor</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Trip/Fault</td>
                      <td className="border border-white/10 px-3 py-2">MCC → BMS</td>
                      <td className="border border-white/10 px-3 py-2">Auxiliary contact on overload</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Hand/Off/Auto</td>
                      <td className="border border-white/10 px-3 py-2">MCC → BMS</td>
                      <td className="border border-white/10 px-3 py-2">Selector switch position feedback</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Speed Reference</td>
                      <td className="border border-white/10 px-3 py-2">BMS → VSD</td>
                      <td className="border border-white/10 px-3 py-2">0-10V or 4-20mA analogue signal</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Speed Feedback</td>
                      <td className="border border-white/10 px-3 py-2">VSD → BMS</td>
                      <td className="border border-white/10 px-3 py-2">0-10V or 4-20mA analogue signal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Design tip:</strong> Specify interposing relays between BMS outputs (typically 24V) and mains-voltage starter coils. This provides galvanic isolation and prevents BMS damage from back-EMF or fault currents.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Cable Containment and Installation Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Cable Containment and Installation Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Cable containment coordination between HVAC and electrical services is crucial for
              successful building services installation. BS 7671 and industry standards define
              requirements for segregation, support, and installation methods. Effective coordination
              during design prevents costly clashes and delays during construction.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">BS 7671 Segregation Requirements (Regulation 528.1)</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Circuit Combination</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Segregation Method</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Minimum Requirement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Band I (ELV) + Band II (LV)</td>
                      <td className="border border-white/10 px-3 py-2">Physical separation</td>
                      <td className="border border-white/10 px-3 py-2">Partition, 50mm gap, or separate compartment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power + Fire alarm</td>
                      <td className="border border-white/10 px-3 py-2">Enhanced separation</td>
                      <td className="border border-white/10 px-3 py-2">150mm gap or fire-rated barrier</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Power + Data/comms</td>
                      <td className="border border-white/10 px-3 py-2">EMC consideration</td>
                      <td className="border border-white/10 px-3 py-2">50mm minimum, screened cables preferred</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Same voltage band</td>
                      <td className="border border-white/10 px-3 py-2">Can share containment</td>
                      <td className="border border-white/10 px-3 py-2">Adequate capacity and derating applied</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="h-4 w-4 text-elec-yellow/80" />
                <p className="text-sm font-medium text-elec-yellow/80">Containment Types for HVAC Applications</p>
              </div>
              <div className="text-sm space-y-2">
                <p><strong>Cable tray:</strong> Open ventilated, good heat dissipation, suitable for plant rooms. Perforated or ladder type. Derating factors apply per BS 7671 Appendix 4.</p>
                <p><strong>Cable basket:</strong> Lighter duty alternative to tray, easier cable additions, good in ceiling voids. Wire mesh construction.</p>
                <p><strong>Trunking:</strong> Enclosed metal or PVC, better protection, compartmentalised options available for segregation. Higher derating factors apply.</p>
                <p><strong>Conduit:</strong> Steel or PVC, individual circuit runs, suitable for final connections to equipment. Rigid or flexible.</p>
                <p><strong>SWA direct:</strong> Steel wire armoured cable without containment, used for external runs or direct burial.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Fan className="h-4 w-4 text-elec-yellow/80" />
                  <p className="text-sm font-medium text-elec-yellow/80">Plant Room Containment</p>
                </div>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Heavy-duty cable tray or ladder</li>
                  <li className="pl-1">Hot-dip galvanised for durability</li>
                  <li className="pl-1">300mm-600mm widths typical</li>
                  <li className="pl-1">Support brackets at 1.5-2m centres</li>
                  <li className="pl-1">25% spare capacity minimum</li>
                  <li className="pl-1">Clear labelling of circuit routes</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Ceiling Void Containment</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Cable basket for flexibility</li>
                  <li className="pl-1">Coordinate with ductwork routes</li>
                  <li className="pl-1">Maintain access for maintenance</li>
                  <li className="pl-1">Fire stopping at compartment walls</li>
                  <li className="pl-1">Avoid blocking access panels</li>
                  <li className="pl-1">Consider BIM clash detection</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">MCC Design Considerations for HVAC Plant</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Form of separation:</strong> Form 2 (busbars separated from units) or Form 4 (full segregation) for larger installations</li>
                <li className="pl-1"><strong>IP rating:</strong> IP54 minimum for plant rooms with potential moisture/dust</li>
                <li className="pl-1"><strong>Layout:</strong> Group by system (chillers, pumps, AHUs) for logical operation</li>
                <li className="pl-1"><strong>Labelling:</strong> Clear equipment identification, circuit references, warning notices</li>
                <li className="pl-1"><strong>BMS marshalling:</strong> Dedicated terminal blocks for control wiring interface</li>
                <li className="pl-1"><strong>Spare capacity:</strong> 20-25% spare outgoing ways for future plant</li>
                <li className="pl-1"><strong>Local indication:</strong> Run lamps, trip indication, hour meters on critical plant</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Coordination principle:</strong> Early engagement between M&E disciplines (RIBA Stage 3/4) using 3D BIM models identifies containment clashes before construction. Regular design coordination meetings with documented decisions prevent costly site variations.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: Motor Circuit Design for AHU</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design the electrical supply for a 22kW AHU supply fan motor with VSD control.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Given Data:</p>
                <p className="mt-2">Motor: 22kW, 400V 3-phase, pf 0.85</p>
                <p>Starting method: VSD (Variable Speed Drive)</p>
                <p>Cable route: 35m from MCC to motor</p>
                <p className="mt-2 text-white/60">Step 1: Calculate Full Load Current</p>
                <p>FLC = P / (√3 × V × pf)</p>
                <p>FLC = 22,000 / (1.732 × 400 × 0.85)</p>
                <p className="text-green-400">FLC = 37.3A</p>
                <p className="mt-2 text-white/60">Step 2: Apply 125% Factor (Reg 433.3.1)</p>
                <p>Minimum cable rating = 37.3 × 1.25</p>
                <p className="text-green-400">= 46.6A</p>
                <p className="mt-2 text-white/60">Step 3: Select Cable (SWA in tray)</p>
                <p>6mm² SWA = 41A (insufficient)</p>
                <p className="text-green-400">10mm² SWA = 57A (adequate)</p>
                <p className="mt-2 text-white/60">Step 4: Check Voltage Drop</p>
                <p>VD = (mV/A/m × I × L) / 1000</p>
                <p>VD = (3.8 × 37.3 × 35) / 1000 = 4.96V</p>
                <p>Percentage = 4.96 / 400 × 100 = 1.24%</p>
                <p className="text-green-400">Within 5% limit - acceptable</p>
                <p className="mt-2 text-white/60">Step 5: Protective Device Selection</p>
                <p>VSD provides electronic overload protection</p>
                <p>MCCB: 50A Type D (allows starting inrush)</p>
                <p className="text-green-400">Final specification: 10mm² 4-core SWA, 50A MCCB</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: HVAC Load Schedule and Diversity</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate the maximum demand for an HVAC sub-distribution board serving mixed plant.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">Connected Load Schedule:</p>
                <p className="mt-2">Chiller No.1: 75kW (duty)</p>
                <p>Chiller No.2: 75kW (standby)</p>
                <p>CHW Pump P1: 7.5kW (duty)</p>
                <p>CHW Pump P2: 7.5kW (standby)</p>
                <p>AHU-01: 18.5kW</p>
                <p>AHU-02: 15kW</p>
                <p>FCUs (×30): 30 × 0.15kW = 4.5kW</p>
                <p>BMS Panel: 0.5kW</p>
                <p className="mt-2 text-white/60">Total Connected: 203.5kW</p>
                <p className="mt-2 text-white/60">Apply Diversity Factors:</p>
                <p>Chillers: 75kW × 1.0 (one operating) = 75kW</p>
                <p>Pumps: 7.5kW × 1.0 (one operating) = 7.5kW</p>
                <p>AHUs: 33.5kW × 0.9 = 30.2kW</p>
                <p>FCUs: 4.5kW × 0.8 = 3.6kW</p>
                <p>BMS: 0.5kW × 1.0 = 0.5kW</p>
                <p className="mt-2 text-green-400">Maximum Demand = 116.8kW</p>
                <p className="text-white/60 mt-2">At 400V 3-phase, pf 0.85:</p>
                <p className="text-green-400">Max current = 198A</p>
                <p className="text-white/60 mt-1">Specify 250A sub-main with 200A incomer</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Control Wiring Interface Schedule</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Define the BMS interface points for a typical AHU connection.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p className="text-white/60">AHU-01 BMS Interface Schedule:</p>
                <p className="mt-2 font-bold text-white">Digital Inputs (to BMS):</p>
                <p>DI-01: Supply fan run status (NO contact)</p>
                <p>DI-02: Supply fan fault/trip (NC contact)</p>
                <p>DI-03: Extract fan run status (NO contact)</p>
                <p>DI-04: Extract fan fault/trip (NC contact)</p>
                <p>DI-05: Filter differential pressure switch</p>
                <p>DI-06: Frost protection activated</p>
                <p className="mt-2 font-bold text-white">Digital Outputs (from BMS):</p>
                <p>DO-01: Supply fan start/stop command</p>
                <p>DO-02: Extract fan start/stop command</p>
                <p className="mt-2 font-bold text-white">Analogue Inputs (to BMS):</p>
                <p>AI-01: Supply air temperature (PT1000)</p>
                <p>AI-02: Return air temperature (PT1000)</p>
                <p>AI-03: Outside air temperature (PT1000)</p>
                <p>AI-04: Supply fan speed feedback (0-10V)</p>
                <p className="mt-2 font-bold text-white">Analogue Outputs (from BMS):</p>
                <p>AO-01: Supply fan speed reference (0-10V)</p>
                <p>AO-02: Heating valve position (0-10V)</p>
                <p>AO-03: Cooling valve position (0-10V)</p>
                <p>AO-04: Damper position (0-10V)</p>
                <p className="mt-2 text-green-400">Total: 6 × DI, 2 × DO, 4 × AI, 4 × AO</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">HVAC Electrical Design Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Obtain accurate load data from HVAC equipment manufacturer data sheets</li>
                <li className="pl-1">Apply correct diversity factors based on system operation strategy</li>
                <li className="pl-1">Size motor circuits at 125% FLC per BS 7671 Regulation 433.3.1</li>
                <li className="pl-1">Specify appropriate motor starting methods for network capacity</li>
                <li className="pl-1">Define clear BMS interface schedules with voltage levels and signal types</li>
                <li className="pl-1">Coordinate containment routes early using BIM where available</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Motor cable sizing: <strong>125% of FLC minimum</strong></li>
                <li className="pl-1">DOL starting current: <strong>6-8× FLC</strong></li>
                <li className="pl-1">VSD starting current: <strong>1-1.5× FLC</strong></li>
                <li className="pl-1">Maximum voltage drop: <strong>5%</strong> (BS 7671 guidance)</li>
                <li className="pl-1">Containment spare capacity: <strong>25%</strong> for HVAC applications</li>
                <li className="pl-1">ELV/LV segregation: <strong>50mm or partition</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Under-sizing cables</strong> - forgetting the 125% factor for motor circuits</li>
                <li className="pl-1"><strong>Ignoring starting currents</strong> - causing nuisance tripping or voltage dips</li>
                <li className="pl-1"><strong>Missing segregation</strong> - ELV and mains in same containment without barriers</li>
                <li className="pl-1"><strong>Inadequate spare capacity</strong> - no room for future HVAC additions</li>
                <li className="pl-1"><strong>Poor interface documentation</strong> - unclear BMS/MCC responsibilities</li>
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
                <p className="font-medium text-white mb-1">Supply Voltages</p>
                <ul className="space-y-0.5">
                  <li>Single-phase: 230V AC (small equipment)</li>
                  <li>Three-phase: 400V AC (motors &gt;3kW)</li>
                  <li>Control ELV: 24V AC/DC (BMS signals)</li>
                  <li>Control mains: 230V AC (interlocks)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Motor Starting Methods</p>
                <ul className="space-y-0.5">
                  <li>DOL: 6-8× FLC, motors &lt;11kW</li>
                  <li>Star-Delta: ~2× FLC, 6-wire</li>
                  <li>Soft Starter: 2-4× FLC, smooth</li>
                  <li>VSD: 1-1.5× FLC, speed control</li>
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
            <Link to="../h-n-c-module8-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module8-section6-2">
              Next: Plant Room Design
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule8Section6_1;
