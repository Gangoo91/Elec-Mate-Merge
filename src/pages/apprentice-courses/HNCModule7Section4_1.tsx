import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "DALI Systems - HNC Module 7 Section 4.1";
const DESCRIPTION = "Master Digital Addressable Lighting Interface (DALI) systems: protocol fundamentals, addressing, grouping, scenes, gateways, DALI-2 features, system architecture, wiring requirements, and commissioning for building services projects.";

const quickCheckQuestions = [
  {
    id: "dali-definition",
    question: "What does DALI stand for and what is its primary purpose?",
    options: ["Digital Analogue Lighting Interface - converts signals", "Digital Addressable Lighting Interface - individual luminaire control", "Direct Access Lighting Integration - network lighting", "Digital Automated Lighting Installation - automated dimming"],
    correctIndex: 1,
    explanation: "DALI stands for Digital Addressable Lighting Interface. It is an international standard (IEC 62386) protocol that enables individual addressable control of luminaires and control gear in lighting systems."
  },
  {
    id: "dali-addresses",
    question: "How many individual addresses can be assigned on a single DALI bus?",
    options: ["32 addresses", "48 addresses", "64 addresses", "128 addresses"],
    correctIndex: 2,
    explanation: "A single DALI bus supports up to 64 individually addressable devices (addresses 0-63). This allows independent control of up to 64 luminaires or control gear units on one bus segment."
  },
  {
    id: "dali-groups",
    question: "How many groups can luminaires be assigned to on a DALI system?",
    options: ["8 groups", "16 groups", "32 groups", "64 groups"],
    correctIndex: 1,
    explanation: "DALI supports 16 groups (numbered 0-15). Each luminaire can belong to multiple groups simultaneously, allowing flexible control scenarios such as zone control, task lighting, and daylight-linked groups."
  },
  {
    id: "dali-voltage",
    question: "What is the nominal voltage level on a DALI bus?",
    options: ["5V DC", "12V DC", "16V DC (9.5V-22.5V range)", "24V DC"],
    correctIndex: 2,
    explanation: "The DALI bus operates at a nominal 16V DC with an acceptable range of 9.5V to 22.5V. This voltage is supplied by the DALI power supply unit (PSU) which also provides the bus communication power."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which international standard defines the DALI protocol?",
    options: [
      "IEC 61000",
      "IEC 62386",
      "IEC 60364",
      "IEC 61439"
    ],
    correctAnswer: 1,
    explanation: "IEC 62386 is the international standard that defines the DALI protocol. It covers control gear, control devices, and application controllers, ensuring interoperability between manufacturers."
  },
  {
    id: 2,
    question: "What is the maximum cable length for a DALI bus?",
    options: ["100 metres", "200 metres", "300 metres", "500 metres"],
    correctAnswer: 2,
    explanation: "The maximum DALI bus length is 300 metres. This limit ensures reliable communication and accounts for voltage drop. For longer distances, DALI bridges or routers must be used."
  },
  {
    id: 3,
    question: "How many scenes can be stored in each DALI control gear device?",
    options: ["4 scenes", "8 scenes", "16 scenes", "32 scenes"],
    correctAnswer: 2,
    explanation: "Each DALI control gear can store 16 scenes (numbered 0-15). Scenes store predefined lighting levels that can be recalled instantly, enabling rapid switching between lighting configurations."
  },
  {
    id: 4,
    question: "What is the maximum current allowed on a DALI bus?",
    options: ["100mA", "250mA", "500mA", "1A"],
    correctAnswer: 1,
    explanation: "The maximum current on a DALI bus is 250mA. This current is shared between all devices on the bus. Typical DALI drivers draw 2mA standby current, allowing approximately 64 devices per bus."
  },
  {
    id: 5,
    question: "In DALI-2, what is the purpose of device type 8 (DT8)?",
    options: [
      "Emergency lighting control",
      "Colour temperature and RGB control",
      "Motion sensor integration",
      "Energy metering"
    ],
    correctAnswer: 1,
    explanation: "Device Type 8 (DT8) in DALI-2 enables colour control including tuneable white (colour temperature adjustment) and full RGB/RGBW colour mixing, supporting circadian lighting and colour-changing applications."
  },
  {
    id: 6,
    question: "What is the function of a DALI gateway?",
    options: [
      "To power the DALI bus only",
      "To interface DALI with other protocols like BACnet, KNX, or Modbus",
      "To increase the number of addresses beyond 64",
      "To provide emergency lighting backup"
    ],
    correctAnswer: 1,
    explanation: "A DALI gateway provides protocol translation between DALI and building management systems using protocols such as BACnet, KNX, Modbus, or Ethernet. This enables integration with wider building automation."
  },
  {
    id: 7,
    question: "What cable type is typically used for DALI wiring?",
    options: [
      "Cat 6 data cable only",
      "Screened twisted pair only",
      "Standard 1.5mm² mains cable or dedicated 5-core DALI cable",
      "Fibre optic cable"
    ],
    correctAnswer: 2,
    explanation: "DALI can use standard mains-rated cable (1.5mm²) as it operates at SELV voltages. Dedicated 5-core cable provides L, N, E plus two DALI control cores. Polarity of DALI cores is not critical."
  },
  {
    id: 8,
    question: "What is the data transmission rate of DALI?",
    options: [
      "100 bits/second",
      "1,200 bits/second",
      "9,600 bits/second",
      "115,200 bits/second"
    ],
    correctAnswer: 1,
    explanation: "DALI operates at 1,200 bits/second. While this is slow compared to other protocols, it is sufficient for lighting control and provides excellent noise immunity and reliability."
  },
  {
    id: 9,
    question: "What advantage does DALI-2 offer over DALI-1?",
    options: [
      "Higher data transmission speed",
      "More addresses per bus",
      "Standardised control devices (sensors, switches) and push button input",
      "Longer maximum cable length"
    ],
    correctAnswer: 2,
    explanation: "DALI-2 standardises control devices (input devices) such as sensors and switches, plus introduces push button input device types. DALI-1 only standardised control gear (drivers/ballasts)."
  },
  {
    id: 10,
    question: "During commissioning, what is the purpose of DALI addressing?",
    options: [
      "To set the physical location of luminaires",
      "To assign unique short addresses (0-63) to each control gear",
      "To configure the mains supply connection",
      "To set emergency lighting duration"
    ],
    correctAnswer: 1,
    explanation: "DALI addressing assigns unique short addresses (0-63) to each control gear device on the bus. This enables individual control and monitoring of each luminaire in the system."
  },
  {
    id: 11,
    question: "What is broadcast mode in DALI?",
    options: [
      "A fault condition where all lights turn on",
      "Sending commands to all devices on the bus simultaneously",
      "A wireless extension of the DALI protocol",
      "A method of addressing more than 64 devices"
    ],
    correctAnswer: 1,
    explanation: "Broadcast mode sends commands to all devices on the DALI bus simultaneously without addressing individual units. It is useful for all-on, all-off, or system-wide dimming commands."
  },
  {
    id: 12,
    question: "What is the purpose of fade time in DALI?",
    options: [
      "To delay command transmission",
      "To set the time for luminaires to transition between light levels",
      "To allow emergency battery charging",
      "To synchronise multiple DALI buses"
    ],
    correctAnswer: 1,
    explanation: "Fade time sets the duration for luminaires to smoothly transition between light levels. DALI supports fade times from 0 (instant) to 90.5 seconds, enabling smooth dimming effects and comfortable visual transitions."
  }
];

const faqs = [
  {
    question: "Can DALI control be wired in the same cable as mains supply?",
    answer: "Yes, DALI operates at SELV (Separated Extra Low Voltage) levels and the protocol specifies that DALI control wires can be run in the same cable or conduit as mains supply conductors. This significantly reduces installation costs compared to separate control cabling. Typical installations use 5-core cable (L, N, E, DALI+, DALI-) or standard 1.5mm² twin and earth for the DALI bus run separately."
  },
  {
    question: "What happens if a DALI driver fails?",
    answer: "DALI systems are designed for resilience. If a driver fails, only that luminaire is affected - other devices continue operating normally. The controller can detect the failure through query commands and report it for maintenance. Failed drivers typically default to either full on or off depending on manufacturer settings. DALI-2 enhances fault reporting with more detailed diagnostic information."
  },
  {
    question: "How do I expand beyond 64 addresses?",
    answer: "For systems requiring more than 64 devices, multiple DALI buses can be used. A multi-channel DALI controller or application controller can manage multiple buses (commonly 4, 8, or 16 buses). DALI routers can also link buses while maintaining isolation. Each bus operates independently with its own 64 addresses, groups, and scenes."
  },
  {
    question: "What is the difference between a DALI PSU and a DALI driver?",
    answer: "A DALI PSU (Power Supply Unit) provides the 16V DC bus power for communication and is required once per bus. A DALI driver (control gear) is the device within each luminaire that receives commands and controls the LED or lamp output. The PSU powers the communication bus; drivers power and dim the lamps. Some controllers include integrated PSU functionality."
  },
  {
    question: "Can existing luminaires be retrofitted with DALI?",
    answer: "Yes, many luminaires can be retrofitted by replacing the existing driver with a DALI-compatible driver. LED luminaires are particularly suited to retrofit. However, factors to consider include driver compatibility, physical space for the new driver, and whether existing wiring can accommodate DALI control cores. For fluorescent fittings, DALI ballasts can replace standard HF ballasts."
  },
  {
    question: "How do DALI sensors integrate with the system?",
    answer: "DALI-2 standardised input devices including presence detectors and light sensors. These devices connect to the DALI bus and can directly control luminaires through application controller programming, or report data to a central controller. Sensors typically use instance addressing (multiple instances per physical device) to handle different functions like presence, light level, and hold time."
  }
];

const HNCModule7Section4_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section4">
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
            <span>Module 7.4.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            DALI Systems
          </h1>
          <p className="text-white/80">
            Digital Addressable Lighting Interface: protocol fundamentals, addressing, grouping, gateways, and system architecture
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>DALI:</strong> IEC 62386 digital lighting control protocol</li>
              <li className="pl-1"><strong>Addressing:</strong> 64 individual addresses per bus</li>
              <li className="pl-1"><strong>Groups:</strong> 16 groups for zone control</li>
              <li className="pl-1"><strong>Scenes:</strong> 16 preset lighting configurations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Building Services Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
              <li className="pl-1"><strong>Bus voltage:</strong> 16V DC (9.5V-22.5V range)</li>
              <li className="pl-1"><strong>Max length:</strong> 300 metres per bus</li>
              <li className="pl-1"><strong>Data rate:</strong> 1,200 bits/second</li>
              <li className="pl-1"><strong>Integration:</strong> BMS via gateways (BACnet, KNX)</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain DALI protocol fundamentals and IEC 62386 standard",
              "Apply addressing schemes for individual and group control",
              "Configure scenes and fade times for lighting applications",
              "Design DALI system architecture including gateways and buses",
              "Specify wiring requirements and installation best practices",
              "Commission DALI systems including addressing and programming"
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

        {/* Section 1: DALI Protocol Fundamentals */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            DALI Protocol Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DALI (Digital Addressable Lighting Interface) is the international standard protocol for
              digital lighting control, defined by IEC 62386. It provides a robust, two-wire digital
              interface enabling individual addressable control of luminaires with features including
              dimming, switching, status monitoring, and scene control.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key DALI characteristics:</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Two-wire digital bus:</strong> Simple wiring, polarity independent</li>
                <li className="pl-1"><strong>SELV operation:</strong> Safe extra low voltage (16V DC nominal)</li>
                <li className="pl-1"><strong>Bidirectional:</strong> Commands sent, status returned</li>
                <li className="pl-1"><strong>Multi-master:</strong> Multiple controllers can share bus</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DALI Protocol Specifications</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Parameter</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Specification</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Standard</td>
                      <td className="border border-white/10 px-3 py-2">IEC 62386</td>
                      <td className="border border-white/10 px-3 py-2">Multi-part international standard</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Bus voltage</td>
                      <td className="border border-white/10 px-3 py-2">16V DC (9.5V-22.5V)</td>
                      <td className="border border-white/10 px-3 py-2">SELV, supplied by bus PSU</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Data rate</td>
                      <td className="border border-white/10 px-3 py-2">1,200 bits/second</td>
                      <td className="border border-white/10 px-3 py-2">Manchester encoded</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum current</td>
                      <td className="border border-white/10 px-3 py-2">250mA</td>
                      <td className="border border-white/10 px-3 py-2">Total bus current limit</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Maximum length</td>
                      <td className="border border-white/10 px-3 py-2">300m</td>
                      <td className="border border-white/10 px-3 py-2">Single bus segment</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Dimming range</td>
                      <td className="border border-white/10 px-3 py-2">0.1% to 100%</td>
                      <td className="border border-white/10 px-3 py-2">Logarithmic curve (254 steps)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">DALI vs Analogue Dimming (1-10V)</p>
              <div className="text-sm text-white space-y-1">
                <p><strong>DALI advantages:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>Individual addressable control (not just circuits)</li>
                  <li>Bidirectional - can query lamp status, faults, runtime</li>
                  <li>No separate dimming circuit per luminaire</li>
                  <li>Scene storage in each driver - instant recall</li>
                  <li>Polarity independent - easier installation</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Design principle:</strong> DALI provides granular control at the luminaire level whilst maintaining simple two-wire installation comparable to traditional switching.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Addressing, Groups and Scenes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Addressing, Groups and Scenes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DALI's power lies in its addressing structure. Each bus supports 64 individual addresses,
              16 groups for collective control, and 16 scenes for preset configurations. This enables
              flexible, efficient lighting control without complex wiring changes.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Individual Addressing</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">64 short addresses (0-63)</li>
                  <li className="pl-1">Unique ID per control gear</li>
                  <li className="pl-1">Individual dimming control</li>
                  <li className="pl-1">Status query per luminaire</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Group Control</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">16 groups (0-15)</li>
                  <li className="pl-1">Luminaires can join multiple groups</li>
                  <li className="pl-1">Single command controls group</li>
                  <li className="pl-1">Ideal for zone/area control</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scene Control</p>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">16 scenes (0-15)</li>
                  <li className="pl-1">Stored in each driver</li>
                  <li className="pl-1">Instant recall - one command</li>
                  <li className="pl-1">Different level per luminaire</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Addressing Modes Comparison</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Mode</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Command Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Individual</td>
                      <td className="border border-white/10 px-3 py-2">Specific luminaire control</td>
                      <td className="border border-white/10 px-3 py-2">Address 15: dim to 50%</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Group</td>
                      <td className="border border-white/10 px-3 py-2">Zone/area control</td>
                      <td className="border border-white/10 px-3 py-2">Group 3: recall scene 2</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Broadcast</td>
                      <td className="border border-white/10 px-3 py-2">All luminaires on bus</td>
                      <td className="border border-white/10 px-3 py-2">All: off</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Scene</td>
                      <td className="border border-white/10 px-3 py-2">Preset configurations</td>
                      <td className="border border-white/10 px-3 py-2">Scene 5: meeting room presentation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Typical Group Assignment Example</p>
              <div className="text-sm space-y-2">
                <p><strong>Open plan office floor:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li><strong>Group 0:</strong> All general lighting (master control)</li>
                  <li><strong>Group 1:</strong> Perimeter luminaires (daylight linking)</li>
                  <li><strong>Group 2:</strong> Window row (blind integration)</li>
                  <li><strong>Group 3:</strong> Desk zone A (presence detection)</li>
                  <li><strong>Group 4:</strong> Desk zone B (presence detection)</li>
                  <li><strong>Group 5:</strong> Meeting pod area (local switch)</li>
                </ul>
                <p className="text-white/70 mt-2">Note: Perimeter luminaires belong to Groups 0, 1, and 2 simultaneously</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Best practice:</strong> Plan group assignments during design to align with control requirements - presence zones, daylight zones, switch zones, and cleaning circuits.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: System Architecture and Gateways */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            System Architecture and Gateways
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DALI system architecture ranges from simple standalone controllers to sophisticated
              multi-bus installations integrated with building management systems. Understanding the
              hierarchy of components enables appropriate system specification for project requirements.
            </p>

            <div className="my-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <p className="text-sm font-medium text-blue-400 mb-2">DALI System Hierarchy</p>
              <div className="font-mono text-sm space-y-1">
                <p><span className="text-white/60">Level 4:</span> <span className="text-white">BMS / Supervisory System</span></p>
                <p className="ml-8 text-white/60">↓ BACnet/IP, Modbus TCP, KNX</p>
                <p><span className="text-white/60">Level 3:</span> <span className="text-white">DALI Gateway / Router</span></p>
                <p className="ml-8 text-white/60">↓ Protocol translation</p>
                <p><span className="text-white/60">Level 2:</span> <span className="text-white">Application Controller</span></p>
                <p className="ml-8 text-white/60">↓ DALI bus (multiple)</p>
                <p><span className="text-white/60">Level 1:</span> <span className="text-white">Control Gear (Drivers) + Input Devices (Sensors/Switches)</span></p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Key System Components</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>DALI PSU:</strong> Provides 16V DC bus power - one per bus (unless integrated in controller)</li>
                <li className="pl-1"><strong>Control gear:</strong> DALI drivers in luminaires - receive commands, dim LEDs</li>
                <li className="pl-1"><strong>Input devices:</strong> Sensors, switches, push buttons (DALI-2) - generate commands</li>
                <li className="pl-1"><strong>Application controller:</strong> Manages one or more buses, stores logic and schedules</li>
                <li className="pl-1"><strong>Gateway:</strong> Protocol translator to BACnet, KNX, Modbus, Ethernet</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Gateway Integration Options</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Protocol</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Integration Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">BACnet/IP</td>
                      <td className="border border-white/10 px-3 py-2">Building Management Systems</td>
                      <td className="border border-white/10 px-3 py-2">Full status and control</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">KNX</td>
                      <td className="border border-white/10 px-3 py-2">European building automation</td>
                      <td className="border border-white/10 px-3 py-2">Seamless integration</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Modbus RTU/TCP</td>
                      <td className="border border-white/10 px-3 py-2">Industrial/process control</td>
                      <td className="border border-white/10 px-3 py-2">Register-based access</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Ethernet/IP</td>
                      <td className="border border-white/10 px-3 py-2">IT network integration</td>
                      <td className="border border-white/10 px-3 py-2">Web interface, API</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">DMX512</td>
                      <td className="border border-white/10 px-3 py-2">Theatrical/entertainment</td>
                      <td className="border border-white/10 px-3 py-2">Bridge for effects lighting</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multi-Bus Architecture Design</p>
              <div className="text-sm space-y-2">
                <p><strong>When to use multiple buses:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>&gt;64 luminaires requiring individual control</li>
                  <li>Separate areas requiring isolated control (tenancies)</li>
                  <li>Cable length exceeds 300m</li>
                  <li>Bus current would exceed 250mA</li>
                </ul>
                <p className="mt-2"><strong>Multi-bus controller selection:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>4-bus controller: Small to medium commercial</li>
                  <li>8-bus controller: Large commercial floors</li>
                  <li>16+ bus systems: Major buildings, require network architecture</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Integration tip:</strong> Early coordination with BMS consultant is essential - agree gateway requirements, point schedules, and network architecture during design stage.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4: Wiring, DALI-2, and Commissioning */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Wiring, DALI-2, and Commissioning
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              DALI installation requires attention to wiring topology, cable selection, and systematic
              commissioning. DALI-2 extends the standard with new device types and enhanced features
              that improve interoperability and functionality.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DALI Wiring Requirements</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Cable Specifications</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Minimum 1.5mm² for runs up to 300m</li>
                    <li>Voltage drop: max 2V at 250mA</li>
                    <li>5-core cable: L, N, E, DA+, DA-</li>
                    <li>Polarity independent (DA wires)</li>
                    <li>Can share conduit with mains</li>
                    <li>No screening required</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="font-medium text-white mb-2">Topology Rules</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>Bus, star, tree, or mixed topology</li>
                    <li>No loops (not a ring network)</li>
                    <li>One PSU per bus segment</li>
                    <li>Branches permitted</li>
                    <li>T-connections allowed</li>
                    <li>Total length including branches &lt;300m</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">DALI-2 Enhancements</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DALI-1</th>
                      <th className="border border-white/10 px-3 py-2 text-left">DALI-2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Control gear</td>
                      <td className="border border-white/10 px-3 py-2">Standardised</td>
                      <td className="border border-white/10 px-3 py-2">Enhanced, DT8 colour</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Input devices</td>
                      <td className="border border-white/10 px-3 py-2">Not standardised</td>
                      <td className="border border-white/10 px-3 py-2">Fully standardised (Part 301-304)</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Push buttons</td>
                      <td className="border border-white/10 px-3 py-2">Proprietary</td>
                      <td className="border border-white/10 px-3 py-2">Standardised instance types</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Sensors</td>
                      <td className="border border-white/10 px-3 py-2">Basic support</td>
                      <td className="border border-white/10 px-3 py-2">Full presence/light sensor support</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Interoperability</td>
                      <td className="border border-white/10 px-3 py-2">Control gear only</td>
                      <td className="border border-white/10 px-3 py-2">Full system interoperability</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Certification</td>
                      <td className="border border-white/10 px-3 py-2">Self-declaration</td>
                      <td className="border border-white/10 px-3 py-2">Third-party certification (DiiA)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Commissioning Procedure</p>
              <div className="text-sm space-y-2">
                <p><strong>Step 1 - Physical verification:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>Verify all luminaires powered and DALI wired</li>
                  <li>Check bus continuity and voltage (16V DC)</li>
                  <li>Confirm no short circuits on DALI lines</li>
                </ul>
                <p className="mt-2"><strong>Step 2 - Device discovery:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>Connect commissioning tool/software</li>
                  <li>Run auto-discover to identify all control gear</li>
                  <li>Verify count matches installation drawings</li>
                </ul>
                <p className="mt-2"><strong>Step 3 - Addressing:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>Assign short addresses (manual or automatic)</li>
                  <li>Identify luminaires using flash function</li>
                  <li>Document address allocation</li>
                </ul>
                <p className="mt-2"><strong>Step 4 - Groups and scenes:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>Assign luminaires to groups per design</li>
                  <li>Program scene levels for each scene number</li>
                  <li>Configure fade times as required</li>
                </ul>
                <p className="mt-2"><strong>Step 5 - Testing and handover:</strong></p>
                <ul className="list-disc list-outside ml-5 space-y-1">
                  <li>Test all control scenarios (switch, dim, scene)</li>
                  <li>Verify sensor operation if applicable</li>
                  <li>Produce commissioning record and as-built data</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Commissioning tools:</strong> Use manufacturer commissioning software or universal DALI tools (handheld programmers, USB interfaces) for addressing and programming.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 1: DALI Bus Current Calculation</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Calculate if 48 LED luminaires can share a single DALI bus.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Given:</p>
                <p className="ml-4">- 48 DALI LED drivers</p>
                <p className="ml-4">- Each driver: 2mA standby current (typical)</p>
                <p className="ml-4">- Maximum bus current: 250mA</p>
                <p className="mt-2">Calculation:</p>
                <p className="ml-4">Total bus current = 48 × 2mA = 96mA</p>
                <p className="mt-2 text-green-400">96mA &lt; 250mA maximum</p>
                <p className="text-green-400">Result: 48 drivers can operate on single bus with 154mA headroom</p>
                <p className="mt-2 text-white/60">Note: Also within 64 address limit (48 &lt; 64)</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 2: Multi-Bus System Design</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Design DALI architecture for 180 luminaires across 3 floors.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Requirements:</p>
                <p className="ml-4">- Floor 1: 62 luminaires</p>
                <p className="ml-4">- Floor 2: 58 luminaires</p>
                <p className="ml-4">- Floor 3: 60 luminaires</p>
                <p className="ml-4">- Individual control required</p>
                <p className="ml-4">- BMS integration via BACnet/IP</p>
                <p className="mt-2">Solution:</p>
                <p className="ml-4">- 3 DALI buses (one per floor)</p>
                <p className="ml-4">- 4-channel DALI controller (spare capacity)</p>
                <p className="ml-4">- BACnet/IP gateway integrated</p>
                <p className="ml-4">- One PSU per bus</p>
                <p className="mt-2">Bus allocation:</p>
                <p className="ml-4">Bus 1: Addresses 0-61 (Floor 1)</p>
                <p className="ml-4">Bus 2: Addresses 0-57 (Floor 2)</p>
                <p className="ml-4">Bus 3: Addresses 0-59 (Floor 3)</p>
                <p className="mt-2 text-green-400">All floors within 64-address limit per bus</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Example 3: Scene Programming for Meeting Room</h3>
              <p className="text-sm text-white mb-2">
                <strong>Scenario:</strong> Programme 4 scenes for a meeting room with 8 luminaires.
              </p>
              <div className="bg-black/30 p-3 rounded text-sm font-mono text-white/90">
                <p>Luminaire arrangement:</p>
                <p className="ml-4">- 4 downlights over table (Addr 0-3)</p>
                <p className="ml-4">- 2 wall washers at screen end (Addr 4-5)</p>
                <p className="ml-4">- 2 perimeter luminaires (Addr 6-7)</p>
                <p className="mt-2">Scene programming (DALI level 0-254):</p>
                <p className="mt-2 text-elec-yellow/80">Scene 0 - Full brightness:</p>
                <p className="ml-4">All luminaires: 254 (100%)</p>
                <p className="mt-2 text-elec-yellow/80">Scene 1 - Presentation:</p>
                <p className="ml-4">Downlights (0-3): 127 (50%)</p>
                <p className="ml-4">Wall washers (4-5): 0 (Off)</p>
                <p className="ml-4">Perimeter (6-7): 76 (30%)</p>
                <p className="mt-2 text-elec-yellow/80">Scene 2 - Video conference:</p>
                <p className="ml-4">Downlights (0-3): 178 (70%)</p>
                <p className="ml-4">Wall washers (4-5): 127 (50%)</p>
                <p className="ml-4">Perimeter (6-7): 127 (50%)</p>
                <p className="mt-2 text-elec-yellow/80">Scene 3 - Cleaning:</p>
                <p className="ml-4">All luminaires: 254 (100%)</p>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">DALI Installation Checklist</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Verify luminaire DALI compatibility before procurement</li>
                <li className="pl-1">Calculate bus current (typically 2mA per driver)</li>
                <li className="pl-1">Check total bus length including all branches (&lt;300m)</li>
                <li className="pl-1">Install bus PSU at optimal location for voltage distribution</li>
                <li className="pl-1">Label DALI wiring clearly throughout installation</li>
                <li className="pl-1">Test bus voltage before connecting luminaires</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Key Values to Remember</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Addresses per bus: <strong>64</strong> (0-63)</li>
                <li className="pl-1">Groups per bus: <strong>16</strong> (0-15)</li>
                <li className="pl-1">Scenes per device: <strong>16</strong> (0-15)</li>
                <li className="pl-1">Bus voltage: <strong>16V DC</strong> (9.5V-22.5V)</li>
                <li className="pl-1">Maximum current: <strong>250mA</strong></li>
                <li className="pl-1">Maximum length: <strong>300m</strong></li>
                <li className="pl-1">Data rate: <strong>1,200 bps</strong></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Exceeding 64 addresses</strong> - check device count before specifying single bus</li>
                <li className="pl-1"><strong>Forgetting bus PSU</strong> - every bus needs dedicated power supply</li>
                <li className="pl-1"><strong>Creating loops</strong> - DALI is not a ring topology, no closed loops</li>
                <li className="pl-1"><strong>Mixing DALI-1 and DALI-2</strong> - older devices may not respond to DALI-2 commands</li>
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
                <p className="font-medium text-white mb-1">DALI Protocol Limits</p>
                <ul className="space-y-0.5">
                  <li>64 individual addresses (0-63)</li>
                  <li>16 groups (0-15)</li>
                  <li>16 scenes (0-15)</li>
                  <li>300m maximum bus length</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Electrical Parameters</p>
                <ul className="space-y-0.5">
                  <li>16V DC bus voltage (SELV)</li>
                  <li>250mA maximum bus current</li>
                  <li>~2mA per driver (standby)</li>
                  <li>1,200 bits/second data rate</li>
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
            <Link to="../h-n-c-module7-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../h-n-c-module7-section4-2">
              Next: KNX and Building Automation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default HNCModule7Section4_1;
