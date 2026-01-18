import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import { bmsModule1Section6QuizData } from "@/data/upskilling/bmsModule1Section6QuizData";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bms-components",
    question: "Which option provides two examples of BMS components an electrician may be required to install?",
    options: [
      "Temperature sensors and valve actuators",
      "Software databases and algorithms",
      "Mechanical pumps and boilers",
      "Architectural drawings and specifications"
    ],
    correctIndex: 0,
    explanation: "Electricians install the physical components of BMS systems including sensors (temperature, humidity, CO2, occupancy), actuators (valves, dampers, relays), controllers, and the associated wiring infrastructure."
  },
  {
    id: "cable-segregation",
    question: "Why must mains and data cables be segregated in BMS installations?",
    options: [
      "To reduce cable costs",
      "To prevent electromagnetic interference and ensure safety compliance",
      "To make installation faster",
      "To improve cable appearance"
    ],
    correctIndex: 1,
    explanation: "BS 7671 requires segregation to prevent electromagnetic interference (EMI) that can cause false sensor readings and communication errors. It also ensures electrical safety by preventing dangerous voltage transfer between circuits."
  },
  {
    id: "hvac-collaboration",
    question: "Why is collaboration with HVAC engineers important during a BMS installation?",
    options: [
      "HVAC engineers do the electrical work",
      "Electricians install the wiring that connects HVAC equipment to BMS controllers",
      "It reduces project costs",
      "HVAC engineers provide electrical materials"
    ],
    correctIndex: 1,
    explanation: "HVAC engineers design mechanical systems, but electricians must correctly wire actuators, sensors, and control interfaces that allow the BMS to monitor and control HVAC equipment. Without proper electrical installation, even the best HVAC design cannot function."
  },
  {
    id: "wiring-quality",
    question: "How does poor wiring quality affect the performance of a BMS?",
    options: [
      "It improves system efficiency",
      "It causes false readings, poor control, and potential system failure",
      "It has no impact on performance",
      "It only affects the appearance"
    ],
    correctIndex: 1,
    explanation: "Poor wiring quality can cause sensors to provide false readings, actuators to malfunction, communication networks to fail, and even complete system breakdowns. This leads to poor environmental control, energy waste, equipment damage, and expensive repairs."
  }
];

const faqs = [
  {
    question: "What qualifications do I need to work on BMS installations?",
    answer: "A full electrical qualification (e.g., Level 3 NVQ or equivalent) plus BMS-specific training. Many manufacturers offer courses on their specific systems. Understanding of BS 7671 and data cabling principles is essential."
  },
  {
    question: "How is BMS wiring different from standard electrical installation?",
    answer: "BMS wiring often involves low voltage circuits (24V DC/AC), data communications (RS485, Ethernet), and analogue signals (0-10V, 4-20mA). Stricter segregation requirements apply, and connections must be precise to prevent control errors."
  },
  {
    question: "What happens if I connect a sensor to the wrong terminals?",
    answer: "Depending on the sensor type, this could cause incorrect readings (temperature showing 50°C when room is 20°C), sensor damage, or control logic errors. Always verify terminal assignments against manufacturer documentation before connecting."
  },
  {
    question: "Do I need to understand the BMS programming to install the wiring?",
    answer: "Basic understanding helps, but detailed programming knowledge isn't required. Focus on accurate wiring to design specifications, clear labelling, and good documentation. The commissioning engineer will handle the programming."
  }
];

const BMSModule1Section6 = () => {
  useSEO({
    title: "The Electrician's Role in BMS Installations | BMS Course",
    description: "Learn about the professional responsibilities and best practices for electricians working on Building Management System installations."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 1.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            The Electrician's Role in BMS Installations
          </h1>
          <p className="text-white/80">
            Professional responsibilities and best practices
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Core role:</strong> Install sensors, actuators, controllers, and cabling</li>
              <li><strong>Compliance:</strong> BS 7671 plus manufacturer specifications</li>
              <li><strong>Collaboration:</strong> Work with HVAC, IT, and commissioning engineers</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">On Site</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Install:</strong> Temperature sensors, valve actuators, control panels</li>
              <li><strong>Wire:</strong> RS485, Ethernet, 24V power circuits</li>
              <li><strong>Document:</strong> Label everything, complete as-built drawings</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the key BMS components electricians typically install",
              "Understand the wiring and containment requirements for BMS systems",
              "Recognise the electrician's role in collaboration with other trades",
              "Explain why correct installation directly affects system performance"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Key BMS Components */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Key BMS Components for Electricians
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Building Management System involves many disciplines — IT specialists, mechanical engineers,
              and commissioning engineers — but <strong>electricians are at the core of installation</strong>.
              From wiring sensors and actuators to integrating panels with lighting or HVAC equipment, electricians
              ensure the system is safe, compliant, and functional.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Sensors</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Temperature:</strong> -40°C to +85°C range, RTD or thermistor</li>
                  <li><strong>Humidity:</strong> 0-100% RH, usually combined with temperature</li>
                  <li><strong>CO2:</strong> 0-5000ppm range for air quality monitoring</li>
                  <li><strong>Occupancy:</strong> PIR or ultrasonic for presence detection</li>
                  <li><strong>Pressure:</strong> For ductwork and water systems</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Actuators</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Valve actuators:</strong> Modulating or on/off for heating/cooling</li>
                  <li><strong>Damper actuators:</strong> Air flow control in ductwork</li>
                  <li><strong>Relay modules:</strong> Switching pumps, fans, and lighting</li>
                  <li><strong>Variable speed drives:</strong> Motor speed control integration</li>
                  <li><strong>Smart switches:</strong> Intelligent lighting control</li>
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Controllers & Panels</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Room controllers:</strong> Local processing and I/O expansion</li>
                  <li><strong>Plant controllers:</strong> Central equipment management</li>
                  <li><strong>Gateway devices:</strong> Protocol conversion and communication</li>
                  <li><strong>Control panels:</strong> Housing for controllers and power supplies</li>
                  <li><strong>HMI displays:</strong> Local operator interfaces</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Network Cabling</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>RS485 twisted pair:</strong> For BACnet/Modbus communications</li>
                  <li><strong>Cat5e/Cat6 Ethernet:</strong> IP-based protocols and web interfaces</li>
                  <li><strong>Screened cables:</strong> EMC protection in industrial environments</li>
                  <li><strong>Low voltage power:</strong> 24V DC/AC for sensors and actuators</li>
                  <li><strong>Fibre optic:</strong> Long distance, high-speed connections</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Wiring and Containment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Wiring and Containment Responsibilities
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50 my-6">
              <p className="text-red-400/90 text-sm font-medium mb-2">Critical BS 7671 Requirements</p>
              <p className="text-sm text-white">
                BMS installations must comply with BS 7671 wiring regulations while meeting manufacturer specifications.
                Incorrect segregation or poor containment can cause system failures and safety hazards.
              </p>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Cable Segregation Requirements</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Mains Voltage Circuits</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>230V/400V power circuits</li>
                    <li>Motor control circuits</li>
                    <li>Lighting circuits</li>
                    <li>High current actuators</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Low Voltage/Data Circuits</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>24V sensor circuits</li>
                    <li>Communication cables (RS485, Ethernet)</li>
                    <li>Analogue signal cables (0-10V, 4-20mA)</li>
                    <li>Control panel interconnections</li>
                  </ul>
                </div>
              </div>
              <div className="p-3 mt-4 rounded bg-elec-yellow/10 border border-elec-yellow/20">
                <p className="text-sm text-white">
                  <strong>Minimum separation:</strong> 300mm for parallel runs, or use screened cable with earthed screen
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Containment Systems</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Trunking</p>
                  <p className="text-white text-xs">Compartmentalised for segregation, clean appearance</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Conduit</p>
                  <p className="text-white text-xs">Individual circuit protection, suitable for wet areas</p>
                </div>
                <div className="p-3 rounded bg-transparent">
                  <p className="font-medium text-white mb-1">Cable Tray</p>
                  <p className="text-white text-xs">High capacity, natural cooling, cost-effective</p>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Termination Standards</p>
              <ul className="text-sm text-white space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                  <span><strong>Neat and secure connections:</strong> Use proper crimping tools, avoid loose connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                  <span><strong>Clear cable labelling:</strong> Consistent system matching circuit schedules</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                  <span><strong>Future maintenance access:</strong> Terminations accessible without disturbing adjacent circuits</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: Collaboration */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Collaboration with Other Trades
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BMS installation requires seamless coordination between multiple disciplines.
              <strong> Electricians are often the critical link</strong> that enables other trades to complete their work successfully.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Working with HVAC Engineers</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-white mb-2">HVAC Dependencies</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Valve actuator wiring and control</li>
                    <li>Damper motor connections</li>
                    <li>Fan and pump control integration</li>
                    <li>Temperature and pressure sensor installation</li>
                    <li>VFD control and feedback signals</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Coordination Points</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Sensor locations and mounting requirements</li>
                    <li>Cable routes through mechanical areas</li>
                    <li>Control panel locations and access</li>
                    <li>Testing and commissioning sequences</li>
                    <li>Maintenance access preservation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">IT/Network Team Collaboration</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Network Infrastructure</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Ethernet backbone installation</li>
                    <li>Switch and router connections</li>
                    <li>Server room cable management</li>
                    <li>Wireless access point power (PoE)</li>
                    <li>Network equipment grounding</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Interface Requirements</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>IP address planning coordination</li>
                    <li>VLAN configuration requirements</li>
                    <li>Security and firewall considerations</li>
                    <li>Remote access infrastructure</li>
                    <li>Backup power systems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Commissioning Engineers</p>
              <div className="p-3 rounded bg-elec-yellow/5 border border-elec-yellow/20 mb-4">
                <p className="text-sm text-white">
                  <strong>Critical relationship:</strong> Commissioning engineers depend entirely on correct electrical installation
                  to programme and test the BMS. Poor wiring quality directly impacts their ability to complete the project.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-white mb-2">Pre-Commissioning Support</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Circuit testing and verification</li>
                    <li>Cable schedule documentation</li>
                    <li>Point-to-point testing</li>
                    <li>Communication network verification</li>
                    <li>Power supply validation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-white mb-2">Ongoing Collaboration</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Fault finding and troubleshooting</li>
                    <li>System modifications and additions</li>
                    <li>Performance optimisation support</li>
                    <li>Documentation updates</li>
                    <li>Training and handover assistance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50 my-6">
              <p className="text-red-400/90 text-sm font-medium mb-2">Communication Breakdown Consequences</p>
              <ul className="text-sm text-white space-y-1">
                <li>Poor communication is the most common cause of BMS project delays and cost overruns:</li>
                <li>• Rework due to conflicts between systems</li>
                <li>• Extended commissioning periods</li>
                <li>• Client dissatisfaction and contract disputes</li>
                <li>• Delayed building handover and occupancy</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Installation Quality Impact */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Impact of Installation Quality
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every aspect of BMS performance traces back to installation quality. The foundation you build determines
              whether the system achieves its design intent.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Poor Installation Consequences</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>False sensor readings:</strong> Wrong temperature, humidity, or CO2 data</li>
                  <li><strong>Actuator malfunction:</strong> Valves and dampers operate incorrectly</li>
                  <li><strong>Communication failures:</strong> Network issues prevent coordination</li>
                  <li><strong>System downtime:</strong> Critical building services unavailable</li>
                  <li><strong>Expensive call-backs:</strong> Emergency repairs and extended commissioning</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Installation Benefits</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Accurate control:</strong> Precise environmental management</li>
                  <li><strong>Reliable operation:</strong> Consistent performance with minimal faults</li>
                  <li><strong>Easy maintenance:</strong> Clear documentation and accessible terminations</li>
                  <li><strong>Client satisfaction:</strong> System meets performance expectations</li>
                  <li><strong>Professional reputation:</strong> Successful projects lead to future work</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-red-400 text-xl mb-1">75%</p>
                <p className="text-white text-xs">BMS failures caused by installation issues</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-elec-yellow text-xl mb-1">40%</p>
                <p className="text-white text-xs">Project delays due to wiring problems</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-green-400 text-xl mb-1">90%</p>
                <p className="text-white text-xs">Issues preventable with quality installation</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Sensor Accuracy Impact</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-red-400/80 mb-2">Poor Installation</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Temperature errors up to ±5°C</li>
                    <li>Humidity readings ±20% inaccurate</li>
                    <li>CO2 sensors providing false alarms</li>
                    <li>Pressure sensors showing incorrect values</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Installation</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>Temperature accuracy ±0.5°C</li>
                    <li>Humidity readings ±3% accurate</li>
                    <li>CO2 sensors reliable and stable</li>
                    <li>Pressure measurements precise</li>
                  </ul>
                </div>
              </div>
              <div className="p-3 mt-4 rounded bg-elec-yellow/5 border border-elec-yellow/20">
                <p className="text-sm text-white">
                  <strong>Result:</strong> Accurate sensors enable precise control, reducing energy consumption by up to 30%
                  and ensuring optimal comfort conditions for building occupants.
                </p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-3">Documentation and Labelling Impact</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-red-400/80 mb-2">Poor Labelling</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>4-8 hours to trace unmarked circuits</li>
                    <li>Risk of damage during maintenance</li>
                    <li>System modifications nearly impossible</li>
                    <li>Safety risks working on wrong circuits</li>
                    <li>Unprofessional appearance affects trust</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Documentation</p>
                  <ul className="text-sm text-white space-y-1 ml-4">
                    <li>15-30 minutes to resolve issues</li>
                    <li>Clear identification prevents accidents</li>
                    <li>System changes implemented quickly</li>
                    <li>Other engineers can work on the system</li>
                    <li>Quality work attracts future projects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Practical Guidance Section */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Installation Excellence</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Treat BMS wiring with the same precision as mains installation — every connection matters</li>
                <li>Label every termination point — clear labelling prevents hours of troubleshooting later</li>
                <li>Check manufacturer datasheets — always verify wiring requirements before connecting devices</li>
                <li>Maintain clear communication — keep commissioning engineers informed of installation progress</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Verify cable specifications and ratings</li>
                <li>Test continuity and insulation resistance</li>
                <li>Check segregation distances and screening</li>
                <li>Verify termination tightness and polarity</li>
                <li>Complete circuit documentation and labelling</li>
                <li>Conduct point-to-point verification tests</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Poor segregation:</strong> — mixing mains and data cables causes EMI and safety issues</li>
                <li><strong>Skipping labelling:</strong> — unlabelled circuits create hours of troubleshooting later</li>
                <li><strong>Incorrect polarity:</strong> — reversed sensor wiring gives false readings</li>
                <li><strong>Inadequate documentation:</strong> — incomplete records make maintenance impossible</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Real World Example: Manchester Office Project
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A large office project in Manchester required BMS installation for HVAC and lighting control across
              five floors. The electrical contractor installed over 200 sensors, 150 actuators, and 15 control panels
              with extensive data and power cabling throughout the building.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">The Problem</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Multiple temperature sensors miswired</li>
                  <li>Incorrect polarity on analogue circuits</li>
                  <li>Mixed up sensor locations in documentation</li>
                  <li>Poor cable labelling throughout installation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Initial Symptoms</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Heating running when cooling was needed</li>
                  <li>Some areas too hot, others too cold</li>
                  <li>Erratic system behaviour and alarms</li>
                  <li>Client complaints about comfort conditions</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50 my-6">
              <p className="text-red-400/90 text-sm font-medium mb-2">Investigation Process</p>
              <p className="text-sm text-white">
                The commissioning team spent <strong>3 days</strong> fault-finding, checking sensor readings against
                actual conditions. They discovered that several temperature sensors were reading 5-10°C incorrectly
                due to wiring errors. Without clear cable labels, tracing each circuit took hours.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Resolution</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Systematic circuit testing and correction</li>
                  <li>Proper sensor wiring and calibration</li>
                  <li>Complete re-labelling of all circuits</li>
                  <li>Updated documentation and drawings</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Final Outcome</p>
                <ul className="text-sm text-white space-y-1">
                  <li>System operated exactly as designed</li>
                  <li>Optimal comfort conditions achieved</li>
                  <li>Energy consumption within targets</li>
                  <li>Client satisfaction and system acceptance</li>
                </ul>
              </div>
            </div>

            <div className="p-3 rounded bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm text-white">
                <strong>Key Lesson:</strong> This project demonstrates how electrician workmanship directly impacts
                BMS performance. Quality installation from the start would have prevented delays, additional costs,
                and client dissatisfaction. The extra time spent on proper installation is always less than the time
                needed for fault-finding and correction.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Key Components</p>
              <ul className="space-y-0.5">
                <li>Sensors: Temperature, humidity, CO2, occupancy, pressure</li>
                <li>Actuators: Valve, damper, relay, VFD, smart switches</li>
                <li>Controllers: Room, plant, gateway, HMI</li>
                <li>Cabling: RS485, Ethernet, 24V power, fibre optic</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Quality Standards</p>
              <ul className="space-y-0.5">
                <li>BS 7671 compliance for all wiring</li>
                <li>300mm minimum segregation or screened cable</li>
                <li>Clear labelling on all terminations</li>
                <li>Complete as-built documentation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4">Summary</h2>
          <div className="space-y-2">
            {[
              "Electricians are responsible for installing sensors, actuators, controllers, and cabling that form the BMS foundation",
              "Wiring and containment must be neat, labelled, and compliant with BS 7671 while meeting manufacturer specifications",
              "Collaboration with HVAC, IT, and commissioning engineers is essential for project success",
              "Installation quality directly affects BMS reliability, performance, and long-term client satisfaction"
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            questions={bmsModule1Section6QuizData}
            title="Test Your Knowledge"
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bms-module-1-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bms-module-2">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BMSModule1Section6;
