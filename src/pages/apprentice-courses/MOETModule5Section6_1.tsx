import { ArrowLeft, Network, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Fieldbus and Profibus Systems - MOET Module 5 Section 6.1";
const DESCRIPTION = "Comprehensive guide to industrial fieldbus communication for maintenance technicians: Profibus DP and PA protocols, network architecture, GSD configuration, cable standards, termination, and systematic troubleshooting with dedicated analysers. ST1426 aligned.";

const quickCheckQuestions = [
  {
    id: "fieldbus-concept",
    question: "What is a fieldbus in industrial automation?",
    options: [
      "A bus that transports field workers between plant areas",
      "A digital communication network replacing individual analogue wiring between field devices and the control system",
      "A type of high-voltage power cable used in hazardous areas",
      "A wireless sensor network for environmental monitoring"
    ],
    correctIndex: 1,
    explanation: "A fieldbus is a digital, serial communication network that connects field devices (sensors, actuators, transmitters) to the control system over a shared bus cable, replacing individual 4-20 mA analogue runs. This dramatically reduces wiring, improves diagnostics, and enables remote configuration of intelligent field devices."
  },
  {
    id: "profibus-dp-advantage",
    question: "What is the main advantage of Profibus DP over traditional analogue wiring?",
    options: [
      "Lower cost cable per metre",
      "Multiple devices on a single cable with digital diagnostics, reducing wiring, improving data quality, and enabling remote configuration",
      "Faster analogue signal transmission over longer distances",
      "Simpler installation with no configuration required"
    ],
    correctIndex: 1,
    explanation: "Profibus DP carries multiple device signals on a single shielded twisted pair cable, provides rich diagnostic data from intelligent devices, supports remote configuration and parameterisation, and eliminates the need for individual analogue cable runs to each instrument — significantly reducing installation cost and commissioning time."
  },
  {
    id: "profibus-pa-definition",
    question: "What does Profibus PA stand for and what makes it special?",
    options: [
      "Process Automation — it uses MBP technology for intrinsically safe operation in hazardous areas",
      "Programmable Automation — it allows PLCs to be programmed remotely",
      "Power Amplification — it boosts signal strength for long cable runs",
      "Panel Assembly — it connects devices within a single control panel"
    ],
    correctIndex: 0,
    explanation: "Profibus PA (Process Automation) is the variant designed for process instrumentation in potentially explosive atmospheres. It uses MBP (Manchester Bus Powered) technology at 31.25 kbit/s, carrying both power and data on the same two-wire cable, enabling intrinsically safe operation in Ex zones."
  },
  {
    id: "gsd-file-purpose",
    question: "What is a GSD file and why is it needed during Profibus commissioning?",
    options: [
      "A graphical system diagram showing the physical layout of the bus",
      "A General Station Description file that describes the device's communication parameters, enabling the PLC or DCS to configure communication with the device",
      "A safety certification document required by the HSE",
      "A calibration record format stored on the device's memory"
    ],
    correctIndex: 1,
    explanation: "The GSD (General Station Description) file is provided by the device manufacturer and contains all the information the master controller needs to communicate with the device — supported data types, diagnostic capabilities, communication parameters, and module options. Without the correct GSD file, the master cannot configure the device on the bus."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What communication speed does Profibus DP typically operate at in industrial installations?",
    options: [
      "9600 baud",
      "Up to 12 Mbit/s (commonly 1.5 Mbit/s in practice)",
      "100 Mbit/s",
      "1 Gbit/s"
    ],
    correctAnswer: 1,
    explanation: "Profibus DP supports speeds from 9.6 kbit/s to 12 Mbit/s. The most common speed in industrial applications is 1.5 Mbit/s, which provides a good balance between data throughput and maximum cable length. Higher speeds reduce the permissible cable length."
  },
  {
    id: 2,
    question: "What type of cable is specified for Profibus DP installations?",
    options: [
      "Standard Ethernet Cat 5e unshielded cable",
      "Purple shielded twisted pair cable (Type A) per IEC 61158 with 150 ohm impedance",
      "75 ohm coaxial cable with BNC connectors",
      "Multimode fibre optic cable only"
    ],
    correctAnswer: 1,
    explanation: "Profibus DP uses a purple shielded twisted pair cable (Type A) with specific impedance characteristics of 150 ohms. The purple colour is the internationally recognised identification for Profibus cables, making them easy to distinguish from other cabling on site."
  },
  {
    id: 3,
    question: "What is the maximum number of devices (stations) on a single Profibus DP segment without repeaters?",
    options: [
      "16 stations",
      "32 stations (including the master)",
      "127 stations",
      "256 stations"
    ],
    correctAnswer: 1,
    explanation: "A single Profibus RS-485 segment supports up to 32 stations (including the master controller). Repeaters can be used to extend the network — the protocol supports a maximum of 127 addressable stations across all segments."
  },
  {
    id: 4,
    question: "What is the purpose of bus termination resistors on a Profibus network?",
    options: [
      "To limit the number of devices that can be connected",
      "To prevent signal reflections at the ends of the bus cable that could corrupt data",
      "To provide power to the field devices on the bus",
      "To encrypt the data travelling on the bus"
    ],
    correctAnswer: 1,
    explanation: "Termination resistors (a 390/220/390 ohm network built into the Profibus connectors) must be activated at both physical ends of each bus segment. They absorb signals at the cable ends and prevent reflections that would corrupt data frames and cause communication errors."
  },
  {
    id: 5,
    question: "How does Profibus PA differ from Profibus DP at the physical layer?",
    options: [
      "They use identical cable and signalling — only the software differs",
      "PA uses MBP (Manchester Bus Powered) signalling at 31.25 kbit/s with power and data on the same two wires, suitable for hazardous areas",
      "PA uses fibre optic cable exclusively for all connections",
      "PA operates at higher speed than DP for faster process response"
    ],
    correctAnswer: 1,
    explanation: "Profibus PA uses MBP technology at 31.25 kbit/s, carrying both power and data on the same two-wire cable. This enables intrinsically safe (Ex ia/ib) operation in hazardous areas. The lower speed is a deliberate design choice to keep power levels within intrinsic safety limits."
  },
  {
    id: 6,
    question: "What device connects a Profibus PA segment to a Profibus DP backbone?",
    options: [
      "A standard cable connector or junction box",
      "A DP/PA coupler or link device that converts between the two physical layers",
      "A wireless bridge operating at 2.4 GHz",
      "No connection is possible — they are separate protocols"
    ],
    correctAnswer: 1,
    explanation: "DP/PA couplers or link devices convert between the DP (RS-485) and PA (MBP) physical layers. A coupler provides transparent protocol conversion; a link device provides additional buffering and diagnostic capabilities. This allows PA field instruments in hazardous areas to communicate with the DP master controller."
  },
  {
    id: 7,
    question: "A Profibus network experiences intermittent communication failures. What is the most likely cause?",
    options: [
      "Too few devices connected to the bus",
      "Incorrect termination, cable damage, missing or duplicate addresses, or connector wiring faults",
      "The bus is running at too low a baud rate",
      "The GSD files are too old"
    ],
    correctAnswer: 1,
    explanation: "Common Profibus faults include incorrect or missing termination (causing reflections), cable shield discontinuities (increasing noise susceptibility), connector wiring errors (swapped A/B data lines), duplicate station addresses (causing bus collisions), and damaged cables (reducing signal levels). Systematic diagnosis requires a Profibus analyser."
  },
  {
    id: 8,
    question: "What specialist tool is used to measure Profibus signal quality on site?",
    options: [
      "A standard digital multimeter with a frequency counter",
      "A dedicated Profibus tester or analyser that measures signal levels, timing, and bus topology",
      "A general-purpose oscilloscope with no protocol decoding",
      "No special tools are needed — the PLC diagnostics are sufficient"
    ],
    correctAnswer: 1,
    explanation: "Dedicated Profibus testers (such as Softing BC-600-PB, Procentec ProfiTrace, or Siemens Diagnostic Repeater) measure signal amplitude, rise times, noise levels, and can identify the signal quality of each individual device on the bus. They are essential for systematic fault-finding and preventive maintenance."
  },
  {
    id: 9,
    question: "What is Foundation Fieldbus H1 and how does it relate to Profibus PA?",
    options: [
      "It is the first version of Profibus, now obsolete",
      "An alternative fieldbus using the same physical layer as Profibus PA (31.25 kbit/s MBP) but with a different application layer supporting control in the field",
      "A high-speed Ethernet protocol for factory automation only",
      "A wireless mesh network for process instrumentation"
    ],
    correctAnswer: 1,
    explanation: "Foundation Fieldbus H1 uses the same physical layer (IEC 61158-2, 31.25 kbit/s MBP) as Profibus PA but has a fundamentally different application layer. Foundation Fieldbus supports function blocks running directly in field devices, enabling control to be distributed to the field level rather than centralised in the controller."
  },
  {
    id: 10,
    question: "What is the maximum cable length for a Profibus DP segment at 1.5 Mbit/s?",
    options: [
      "1200 metres",
      "200 metres",
      "100 metres",
      "50 metres"
    ],
    correctAnswer: 1,
    explanation: "At 1.5 Mbit/s (the most common industrial speed), the maximum segment length is 200 metres using Type A cable. Longer distances require repeaters. At lower speeds the cable can be longer (e.g., 1200 m at 93.75 kbit/s), and at higher speeds it must be shorter (100 m at 12 Mbit/s)."
  },
  {
    id: 11,
    question: "In a Profibus DP network, what is the role of a Class 1 master versus a Class 2 master?",
    options: [
      "Class 1 handles safety functions; Class 2 handles non-safety functions",
      "Class 1 is the main controller that cyclically exchanges I/O data with slaves; Class 2 is an engineering or diagnostic tool that accesses devices for configuration",
      "Class 1 operates at 1 Mbit/s; Class 2 operates at 2 Mbit/s",
      "They are identical — the terms are interchangeable"
    ],
    correctAnswer: 1,
    explanation: "A Class 1 master (typically the PLC or DCS controller) cyclically polls each slave device and exchanges I/O data in every scan cycle. A Class 2 master (an engineering workstation or diagnostic tool) can access slave devices on demand for configuration, parameterisation, and diagnostic readout without disrupting the cyclic data exchange."
  },
  {
    id: 12,
    question: "What other major fieldbus protocols exist besides Profibus, and where are they commonly found?",
    options: [
      "No other fieldbus protocols are in use — Profibus is the only standard",
      "Foundation Fieldbus (process industries, Americas), DeviceNet (Allen-Bradley factory automation), AS-Interface (simple binary sensors/actuators), and HART (digital over 4-20 mA)",
      "Only Ethernet-based protocols exist alongside Profibus",
      "Bluetooth and Wi-Fi are the only alternatives"
    ],
    correctAnswer: 1,
    explanation: "Major fieldbus alternatives include Foundation Fieldbus (common in process industries, especially in the Americas), DeviceNet (based on CAN, common in Rockwell Automation factory environments), AS-Interface (a simple, cost-effective solution for connecting binary sensors and actuators), and HART (digital communication superimposed on 4-20 mA analogue wiring)."
  }
];

const faqs = [
  {
    question: "Is Profibus still relevant or has it been replaced by Ethernet?",
    answer: "Profibus remains widely installed and actively supported, particularly Profibus PA in process industries. Whilst new installations increasingly use Profinet (Industrial Ethernet), Profibus has a massive installed base and will continue in service for many years. Migration strategies typically involve Profinet at the controller level with Profibus PA retained at the field level via proxy devices."
  },
  {
    question: "What is the maximum cable length for Profibus DP?",
    answer: "Maximum segment length depends on baud rate: 1200 m at 93.75 kbit/s, 1000 m at 187.5 kbit/s, 400 m at 500 kbit/s, 200 m at 1.5 Mbit/s, and 100 m at 12 Mbit/s. Repeaters can extend the total network length up to 9.6 km (with up to 9 repeaters in series at lower baud rates)."
  },
  {
    question: "How do I troubleshoot intermittent Profibus communication?",
    answer: "Use a dedicated Profibus analyser to measure signal quality on each segment. Check for: marginal signal levels (should be greater than 4V peak-to-peak), excessive noise, incorrect termination, damaged cables or connectors, earth loops from shield bonding issues, and devices with poor transmitter quality. The analyser's live list shows which devices are experiencing retries or diagnostic messages."
  },
  {
    question: "What other fieldbus protocols exist besides Profibus?",
    answer: "Major alternatives include Foundation Fieldbus (common in process industries, especially in the Americas), DeviceNet (Allen-Bradley systems, mainly factory automation), AS-Interface (simple binary sensors and actuators), and HART (digital communication over analogue 4-20 mA wiring). Each has different strengths and is suited to different applications and vendor ecosystems."
  },
  {
    question: "Can Profibus and Foundation Fieldbus devices coexist on the same plant?",
    answer: "Yes, many plants use both protocols. They share the same physical layer (IEC 61158-2 MBP at 31.25 kbit/s) but use different application layers, so they cannot share the same bus segment. Integration is achieved at the control system level, where the DCS or SCADA system communicates with both networks via their respective interfaces. Gateways can also translate between protocols where needed."
  }
];

const MOETModule5Section6_1 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section6">
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
            <Network className="h-4 w-4" />
            <span>Module 5.6.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Fieldbus and Profibus Systems
          </h1>
          <p className="text-white/80">
            Digital serial communication networks replacing analogue wiring in process and factory automation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fieldbus</strong> replaces individual 4-20 mA wiring with a shared digital cable carrying multiple device signals</li>
              <li className="pl-1"><strong>Profibus DP</strong> uses RS-485 at up to 12 Mbit/s for fast I/O exchange with drives and remote I/O</li>
              <li className="pl-1"><strong>Profibus PA</strong> uses MBP at 31.25 kbit/s for intrinsically safe process instrumentation</li>
              <li className="pl-1"><strong>Termination</strong>, correct cabling, and GSD files are critical for reliable operation</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Fault-finding:</strong> Using Profibus analysers to measure signal quality and identify failing devices</li>
              <li className="pl-1"><strong>Commissioning:</strong> Importing GSD files, setting station addresses, verifying bus communication</li>
              <li className="pl-1"><strong>Replacement:</strong> Matching device type, GSD version, address, and connector wiring</li>
              <li className="pl-1"><strong>ST1426:</strong> Maps to industrial networking and communication knowledge requirements</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Explain the concept of fieldbus communication and its advantages over analogue wiring",
              "Describe Profibus DP and PA protocols, physical layers, and typical applications",
              "Identify network components: cables, connectors, terminators, repeaters, and couplers",
              "Configure devices using GSD files and station address assignment",
              "Troubleshoot common Profibus faults using dedicated analysers",
              "Compare Profibus with Foundation Fieldbus, DeviceNet, and HART"
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

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Fieldbus Fundamentals
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Traditional process instrumentation uses individual 4-20 mA analogue signals — one pair of wires per instrument running back to the control room. For a plant with thousands of instruments, this requires enormous quantities of cable, marshalling cabinets, and I/O cards. A fieldbus replaces this approach with a digital serial communication network where multiple devices share a single cable, dramatically reducing wiring, installation cost, and commissioning time.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Benefits Beyond Wiring Reduction</p>
              <p className="text-sm text-white mb-3">
                Fieldbus communication provides substantial advantages over traditional analogue wiring for both new installations and plant upgrades:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Diagnostic data:</strong> Intelligent field devices report their health status, fault codes, and configuration back to the control system</li>
                <li className="pl-1"><strong>Remote configuration:</strong> Change ranges, engineering units, damping, and alarm limits from the control room without visiting the device</li>
                <li className="pl-1"><strong>Multi-variable transmission:</strong> A single device can report multiple process variables (e.g., a Coriolis meter reports mass flow, density, and temperature)</li>
                <li className="pl-1"><strong>Higher data integrity:</strong> Digital signals are less susceptible to noise and earth loops than analogue signals</li>
                <li className="pl-1"><strong>Reduced I/O cards:</strong> One fieldbus interface card replaces multiple analogue input cards</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Major Fieldbus Standards</p>
              <p className="text-sm text-white mb-3">
                Several fieldbus standards exist for different applications and industries, all defined under the IEC 61158 umbrella:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Profibus (IEC 61158 Type 3):</strong> The most widely installed fieldbus in Europe and process industries worldwide</li>
                <li className="pl-1"><strong>Foundation Fieldbus (IEC 61158 Type 1):</strong> Strong in the Americas and the Middle East, supports distributed control in field devices</li>
                <li className="pl-1"><strong>DeviceNet (based on CAN):</strong> Common in factory automation, particularly in Rockwell Automation ecosystems</li>
                <li className="pl-1"><strong>AS-Interface:</strong> A simple, low-cost solution for connecting binary sensors and actuators at the lowest field level</li>
                <li className="pl-1"><strong>Modbus RTU/ASCII (RS-485):</strong> An older but still widely used serial protocol for simple device communication</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> When working on a fieldbus installation for the first time, always obtain the network documentation showing the bus topology, device list with addresses, cable routing, and termination locations. Without this, systematic fault-finding is extremely difficult.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Profibus DP — Decentralised Periphery
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Profibus DP is designed for fast, cyclic data exchange between controllers and distributed I/O modules, variable speed drives, and intelligent field devices. It uses RS-485 signalling over shielded twisted pair cable at speeds up to 12 Mbit/s. A master controller (PLC or DCS) polls slave devices in a cyclic manner, exchanging I/O data in each scan cycle.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Master-Slave Architecture</p>
              <p className="text-sm text-white mb-3">
                The Profibus DP network operates on a master-slave principle with two classes of master:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Class 1 Master (controller):</strong> The PLC or DCS that cyclically polls each slave for its I/O data — this is the main controller running the process</li>
                <li className="pl-1"><strong>Class 2 Master (engineering tool):</strong> An engineering workstation or diagnostic tool that accesses devices for configuration, parameterisation, and diagnostics</li>
                <li className="pl-1"><strong>Slave devices:</strong> Remote I/O modules, drives, transmitters, valve positioners — each with a unique station address (1 to 126)</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Profibus DP Speed vs Cable Length</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Baud Rate</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Max Segment Length</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Typical Application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">93.75 kbit/s</td><td className="border border-white/10 px-3 py-2">1200 m</td><td className="border border-white/10 px-3 py-2">Long distances, slow processes</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">187.5 kbit/s</td><td className="border border-white/10 px-3 py-2">1000 m</td><td className="border border-white/10 px-3 py-2">Process automation backbone</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">500 kbit/s</td><td className="border border-white/10 px-3 py-2">400 m</td><td className="border border-white/10 px-3 py-2">Medium-speed applications</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">1.5 Mbit/s</td><td className="border border-white/10 px-3 py-2">200 m</td><td className="border border-white/10 px-3 py-2">Most common industrial speed</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">12 Mbit/s</td><td className="border border-white/10 px-3 py-2">100 m</td><td className="border border-white/10 px-3 py-2">High-speed drives, motion</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-white/60 mt-2">Repeaters can extend the total network length. Up to 32 stations per segment; 127 total with repeaters.</p>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">GSD Files and Commissioning</p>
              <p className="text-sm text-white mb-3">
                Each Profibus device type has a GSD (General Station Description) file provided by the manufacturer. This file must be imported into the master's configuration tool before the device can be used:
              </p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">The GSD file describes the device's supported data types, diagnostic capabilities, and communication parameters</li>
                <li className="pl-1">Station addresses (1-126) are set via DIP switches, rotary selectors, or software during commissioning</li>
                <li className="pl-1">Each device must have a unique address — duplicate addresses cause bus collisions and communication failures</li>
                <li className="pl-1">Always use the correct GSD version for the firmware installed on the device</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> When replacing a Profibus slave device, ensure the new device has the same (or compatible) GSD file, set the correct station address, and verify the module configuration matches the master's expectations. A mismatch will prevent communication.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Profibus PA — Process Automation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Profibus PA is designed specifically for process instrumentation in potentially hazardous (explosive) areas. It uses MBP (Manchester Bus Powered) technology at 31.25 kbit/s, carrying both power and data on the same two-wire cable. This enables intrinsically safe operation in Ex zones — a fundamental requirement for chemical plants, refineries, and gas processing facilities.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Physical Layer Differences</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">MBP signalling at 31.25 kbit/s (fixed speed)</li>
                  <li className="pl-1">Power and data on the same two wires</li>
                  <li className="pl-1">Bus-powered devices (typically 10-15 mA per device)</li>
                  <li className="pl-1">Trunk and spur topology with field junction boxes</li>
                  <li className="pl-1">Maximum trunk length depends on Ex certification</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">DP/PA Integration</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">PA segments connect to DP backbone via couplers or links</li>
                  <li className="pl-1">DP/PA coupler — transparent protocol conversion</li>
                  <li className="pl-1">DP/PA link — adds buffering and diagnostics</li>
                  <li className="pl-1">Segment power supply provides bus power to PA devices</li>
                  <li className="pl-1">Each PA segment is a separate intrinsic safety entity</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Hazardous Area Consideration</p>
              <p className="text-sm text-white">
                Profibus PA installations in hazardous areas must comply with the ATEX Directive (in the UK, the Equipment and Protective Systems Intended for Use in Potentially Explosive Atmospheres Regulations). The entity concept is used to verify that the total cable capacitance, inductance, and number of devices on each PA segment remain within the certified limits. Exceeding these limits invalidates the intrinsic safety certification and creates an explosion risk.
              </p>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Network Installation and Cabling
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Correct installation is critical for reliable Profibus operation. The majority of Profibus faults in the field are caused by cabling and installation errors rather than device failures. Following the cabling standards precisely prevents the vast majority of communication problems.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Profibus DP Cabling Rules</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Cable type:</strong> Purple Type A shielded twisted pair, 150 ohm impedance (IEC 61158)</li>
                <li className="pl-1"><strong>Topology:</strong> Linear bus — devices connect via T-connectors or spur cables (maximum 6.6 m spurs)</li>
                <li className="pl-1"><strong>Termination:</strong> Active termination resistors (390/220/390 ohm network) at both physical ends of each segment — and nowhere else</li>
                <li className="pl-1"><strong>Shielding:</strong> Continuous cable shield with proper earthing at one point per segment to avoid earth loops</li>
                <li className="pl-1"><strong>Connectors:</strong> Use genuine Profibus connectors (DB9 or M12) with built-in termination switches</li>
                <li className="pl-1"><strong>Separation:</strong> Maintain at least 200 mm separation from power cables; cross at 90 degrees where necessary</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Installation Errors</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Error</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Symptom</th>
                      <th className="border border-white/10 px-3 py-2 text-left">How to Detect</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border border-white/10 px-3 py-2">Missing termination</td><td className="border border-white/10 px-3 py-2">Intermittent comms failures</td><td className="border border-white/10 px-3 py-2">Analyser shows reflections</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Extra termination (middle of bus)</td><td className="border border-white/10 px-3 py-2">Low signal levels</td><td className="border border-white/10 px-3 py-2">Analyser shows reduced amplitude</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Swapped A/B data lines</td><td className="border border-white/10 px-3 py-2">Device does not communicate</td><td className="border border-white/10 px-3 py-2">Check wiring at connector</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Duplicate address</td><td className="border border-white/10 px-3 py-2">Both devices intermittently fail</td><td className="border border-white/10 px-3 py-2">Live list shows conflicts</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Damaged cable</td><td className="border border-white/10 px-3 py-2">Reduced signal amplitude</td><td className="border border-white/10 px-3 py-2">TDR or analyser waveform</td></tr>
                    <tr><td className="border border-white/10 px-3 py-2">Shield discontinuity</td><td className="border border-white/10 px-3 py-2">Noise-related errors</td><td className="border border-white/10 px-3 py-2">Continuity test on screen</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Maintenance tip:</strong> Keep a Profibus connector removal tool in your kit. The DB9 connectors have a specific A/B wiring orientation that must be maintained. When replacing a connector, always photograph the existing wiring before disconnecting, and verify the termination switch position matches the network documentation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Troubleshooting with Profibus Analysers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic troubleshooting of Profibus networks requires dedicated test equipment. A standard multimeter can confirm voltage and continuity, but cannot assess signal quality, timing, or protocol-level errors. Profibus analysers are purpose-built tools that every maintenance technician working with fieldbus should be familiar with.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What a Profibus Analyser Measures</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Signal amplitude:</strong> Peak-to-peak voltage of the bus signal (should be greater than 4V for DP, typically 6-7V)</li>
                <li className="pl-1"><strong>Signal symmetry:</strong> The positive and negative halves of the waveform should be balanced</li>
                <li className="pl-1"><strong>Noise level:</strong> Interference on the bus measured between valid telegrams</li>
                <li className="pl-1"><strong>Rise/fall times:</strong> Signal edges must meet timing specifications</li>
                <li className="pl-1"><strong>Live list:</strong> All active devices, their communication status, retry counts, and diagnostic flags</li>
                <li className="pl-1"><strong>Topology map:</strong> Physical layout of devices on the bus showing cable lengths</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Preventive Maintenance</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Annual bus health check with analyser</li>
                  <li className="pl-1">Trend signal quality over time</li>
                  <li className="pl-1">Identify degrading connections early</li>
                  <li className="pl-1">Document baseline readings for comparison</li>
                  <li className="pl-1">Check all termination switches during inspections</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Popular Analyser Tools</h3>
                <ul className="text-sm text-white space-y-1 list-disc list-outside ml-5">
                  <li className="pl-1">Procentec ProfiTrace — portable bus analysis</li>
                  <li className="pl-1">Softing BC-600-PB — comprehensive diagnostics</li>
                  <li className="pl-1">Siemens Diagnostic Repeater — permanent monitoring</li>
                  <li className="pl-1">Indu-Sol PB-Qone — signal quality testing</li>
                  <li className="pl-1">Endress+Hauser FieldCare — device configuration</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">Safety Consideration</p>
              <p className="text-sm text-white">
                Before connecting test equipment to a live Profibus PA segment in a hazardous area, verify that the test equipment is certified for use in the relevant Ex zone. Connecting uncertified equipment to an intrinsically safe bus segment can compromise the safety integrity of the entire segment, creating an explosion risk. Always check the test equipment's ATEX or IECEx certification before use.
              </p>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Note:</strong> Under ST1426, maintenance technicians are expected to understand fieldbus communication principles, identify fieldbus components, carry out basic fault-finding using appropriate test equipment, and replace faulty devices following correct procedures for the bus type and hazardous area classification.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

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
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section Overview
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module5-section6-2">
              Next: Industrial Ethernet
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule5Section6_1;
