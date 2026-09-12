/**
 * MOET · Module 5 · Section 6 · Subsection 1 — Fieldbus and Profibus Systems
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here. The conversion brief for this course does not list a Module 5
 * KSB set, so only a statement that already appears verbatim in the brief's
 * verified lists for other modules — and that genuinely fits this page's
 * content — is used here.
 *   Knowledge  · "Electrical. Electrical fault-finding and rectification
 *                 techniques; diagnostic equipment."
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt. The original
 * page had no "Quick Reference" block (unlike its sibling pages), so
 * KeyTakeaways here condenses facts already stated in the body prose rather
 * than a separate summary box.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Fieldbus and Profibus Systems - MOET Module 5 Section 6.1';
const DESCRIPTION =
  'Comprehensive guide to industrial fieldbus communication for maintenance technicians: Profibus DP and PA protocols, network architecture, GSD configuration, cable standards, termination, and systematic troubleshooting with dedicated analysers. ST1426 aligned.';

const quickCheckQuestions = [
  {
    id: 'fieldbus-concept',
    question: 'What is a fieldbus in industrial automation?',
    options: [
      'A high-current busbar that distributes mains power around the factory floor',
      'A backup battery system that keeps field instruments running during a power cut',
      'A digital network replacing individual analogue wiring between devices and control',
      'A safety relay that isolates the field devices when an emergency stop is pressed',
    ],
    correctIndex: 2,
    explanation:
      'A fieldbus is a digital, serial communication network that connects field devices (sensors, actuators, transmitters) to the control system over a shared bus cable, replacing individual 4-20 mA analogue runs. This dramatically reduces wiring, improves diagnostics, and enables remote configuration of intelligent field devices.',
  },
  {
    id: 'profibus-dp-advantage',
    question: 'What is the main advantage of Profibus DP over traditional analogue wiring?',
    options: [
      'Multiple devices on one cable with digital diagnostics and remote configuration',
      'It removes the need for any control system, as the devices control themselves',
      'It allows field devices to run at a higher voltage, increasing their power output',
      'It removes the need for cable shielding, as digital signals cannot be disrupted',
    ],
    correctIndex: 0,
    explanation:
      'Profibus DP carries multiple device signals on a single shielded twisted pair cable, provides rich diagnostic data from intelligent devices, supports remote configuration and parameterisation, and eliminates the need for individual analogue cable runs to each instrument — significantly reducing installation cost and commissioning time.',
  },
  {
    id: 'profibus-pa-definition',
    question: 'What does Profibus PA stand for and what makes it special?',
    options: [
      'Power Amplification — it boosts the signal strength for long cable runs',
      'Panel Assembly — it connects devices within a single control panel',
      'Programmable Automation — it lets PLCs be programmed remotely over the bus',
      'Process Automation — it uses MBP for intrinsically safe use in hazardous areas',
    ],
    correctIndex: 3,
    explanation:
      'Profibus PA (Process Automation) is the variant designed for process instrumentation in potentially explosive atmospheres. It uses MBP (Manchester Bus Powered) technology at 31.25 kbit/s, carrying both power and data on the same two-wire cable, enabling intrinsically safe operation in Ex zones.',
  },
  {
    id: 'gsd-file-purpose',
    question: 'What is a GSD file and why is it needed during Profibus commissioning?',
    options: [
      'A General Specification Datasheet listing the recommended spare parts for the device',
      "A General Station Description file of the device's parameters, used by the PLC or DCS",
      'A Global System Diagnostic log that records every single fault the device has reported',
      "A Generic Setup Data file that stores the commissioning engineer's preferred settings",
    ],
    correctIndex: 1,
    explanation:
      'The GSD (General Station Description) file is provided by the device manufacturer and contains all the information the master controller needs to communicate with the device — supported data types, diagnostic capabilities, communication parameters, and module options. Without the correct GSD file, the master cannot configure the device on the bus.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What communication speed does Profibus DP typically operate at in industrial installations?',
    options: [
      'A fixed 9.6 kbit/s, the same as a standard RS-232 serial link',
      'Up to 12 Mbit/s (commonly 1.5 Mbit/s in practice)',
      'A fixed 100 Mbit/s, matching standard industrial Ethernet',
      'A fixed 31.25 kbit/s, the same as Profibus PA',
    ],
    correctAnswer: 1,
    explanation:
      'Profibus DP supports speeds from 9.6 kbit/s to 12 Mbit/s. The most common speed in industrial applications is 1.5 Mbit/s, which provides a good balance between data throughput and maximum cable length. Higher speeds reduce the permissible cable length.',
  },
  {
    id: 2,
    question: 'What type of cable is specified for Profibus DP installations?',
    options: [
      'Standard Cat 5e unshielded twisted pair cable with RJ45 connectors',
      'A single-core 2.5 mm² PVC-insulated conductor run in steel conduit',
      'Purple shielded twisted pair (Type A) per IEC 61158, 150 ohm impedance',
      'A coaxial cable with 50 ohm characteristic impedance and BNC connectors',
    ],
    correctAnswer: 2,
    explanation:
      'Profibus DP uses a purple shielded twisted pair cable (Type A) with specific impedance characteristics of 150 ohms. The purple colour is the internationally recognised identification for Profibus cables, making them easy to distinguish from other cabling on site.',
  },
  {
    id: 3,
    question:
      'What is the maximum number of devices (stations) on a single Profibus DP segment without repeaters?',
    options: [
      '8 stations (including the master)',
      '16 stations (including the master)',
      '64 stations (including the master)',
      '32 stations (including the master)',
    ],
    correctAnswer: 3,
    explanation:
      'A single Profibus RS-485 segment supports up to 32 stations (including the master controller). Repeaters can be used to extend the network — the protocol supports a maximum of 127 addressable stations across all segments.',
  },
  {
    id: 4,
    question: 'What is the purpose of bus termination resistors on a Profibus network?',
    options: [
      'To prevent signal reflections at the ends of the bus cable that could corrupt data',
      'To limit the current drawn by each device and protect the master controller',
      'To boost the signal voltage so the bus can reach more distant devices',
      'To earth the cable shield at every connector along the bus',
    ],
    correctAnswer: 0,
    explanation:
      'Termination resistors (a 390/220/390 ohm network built into the Profibus connectors) must be activated at both physical ends of each bus segment. They absorb signals at the cable ends and prevent reflections that would corrupt data frames and cause communication errors.',
  },
  {
    id: 5,
    question: 'How does Profibus PA differ from Profibus DP at the physical layer?',
    options: [
      'PA uses fibre-optic cable while DP uses ordinary copper twisted pair',
      'PA uses MBP signalling with power and data on two wires, for hazardous areas',
      'PA runs at a full 12 Mbit/s while DP is limited to just 31.25 kbit/s',
      'PA requires a separate power cable to each device, whereas DP does not',
    ],
    correctAnswer: 1,
    explanation:
      'Profibus PA uses MBP technology at 31.25 kbit/s, carrying both power and data on the same two-wire cable. This enables intrinsically safe (Ex ia/ib) operation in hazardous areas. The lower speed is a deliberate design choice to keep power levels within intrinsic safety limits.',
  },
  {
    id: 6,
    question: 'What device connects a Profibus PA segment to a Profibus DP backbone?',
    options: [
      'A standard RS-485 repeater that extends the DP segment length',
      'An Ethernet switch that routes traffic between the two networks',
      'A DP/PA coupler or link device that converts between the two physical layers',
      'A terminating resistor fitted at the junction between the two buses',
    ],
    correctAnswer: 2,
    explanation:
      'DP/PA couplers or link devices convert between the DP (RS-485) and PA (MBP) physical layers. A coupler provides transparent protocol conversion; a link device provides additional buffering and diagnostic capabilities. This allows PA field instruments in hazardous areas to communicate with the DP master controller.',
  },
  {
    id: 7,
    question:
      'A Profibus network experiences intermittent communication failures. What is the most likely cause?',
    options: [
      'The master controller is running a slightly out-of-date firmware version',
      'The ambient temperature in the control room is slightly above the limit',
      'The GSD files for the devices were imported into the master in the wrong order',
      'Incorrect termination, cable damage, duplicate addresses or wiring faults',
    ],
    correctAnswer: 3,
    explanation:
      'Common Profibus faults include incorrect or missing termination (causing reflections), cable shield discontinuities (increasing noise susceptibility), connector wiring errors (swapped A/B data lines), duplicate station addresses (causing bus collisions), and damaged cables (reducing signal levels). Systematic diagnosis requires a Profibus analyser.',
  },
  {
    id: 8,
    question: 'What specialist tool is used to measure Profibus signal quality on site?',
    options: [
      'A dedicated Profibus tester or analyser that measures signal levels, timing, and bus topology',
      'A standard digital multimeter set to measure AC voltage on the bus',
      'An insulation resistance tester applied between the data lines and earth',
      'A clamp meter measuring the current flowing in the bus cable',
    ],
    correctAnswer: 0,
    explanation:
      'Dedicated Profibus testers (such as Softing BC-600-PB, Procentec ProfiTrace, or Siemens Diagnostic Repeater) measure signal amplitude, rise times, noise levels, and can identify the signal quality of each individual device on the bus. They are essential for systematic fault-finding and preventive maintenance.',
  },
  {
    id: 9,
    question: 'What is Foundation Fieldbus H1 and how does it relate to Profibus PA?',
    options: [
      'A newer Siemens-only protocol that has now fully replaced Profibus PA',
      'A fieldbus sharing the PA physical layer but with field-control application layer',
      'A high-speed Ethernet variant of Profibus PA running at a full 100 Mbit/s',
      'The wireless version of Profibus PA used where fixed cabling is impractical',
    ],
    correctAnswer: 1,
    explanation:
      'Foundation Fieldbus H1 uses the same physical layer (IEC 61158-2, 31.25 kbit/s MBP) as Profibus PA but has a fundamentally different application layer. Foundation Fieldbus supports function blocks running directly in field devices, enabling control to be distributed to the field level rather than centralised in the controller.',
  },
  {
    id: 10,
    question: 'What is the maximum cable length for a Profibus DP segment at 1.5 Mbit/s?',
    options: ['1200 metres', '400 metres', '200 metres', '100 metres'],
    correctAnswer: 2,
    explanation:
      'At 1.5 Mbit/s (the most common industrial speed), the maximum segment length is 200 metres using Type A cable. Longer distances require repeaters. At lower speeds the cable can be longer (e.g., 1200 m at 93.75 kbit/s), and at higher speeds it must be shorter (100 m at 12 Mbit/s).',
  },
  {
    id: 11,
    question:
      'In a Profibus DP network, what is the role of a Class 1 master versus a Class 2 master?',
    options: [
      'Class 1 handles the high-speed devices and Class 2 the low-speed devices',
      'Class 1 is used in safe areas and Class 2 is certified for hazardous areas',
      'Class 1 provides the bus power and Class 2 provides the termination resistors',
      'Class 1 cyclically exchanges I/O data with slaves; Class 2 is a diagnostic tool',
    ],
    correctAnswer: 3,
    explanation:
      'A Class 1 master (typically the PLC or DCS controller) cyclically polls each slave device and exchanges I/O data in every scan cycle. A Class 2 master (an engineering workstation or diagnostic tool) can access slave devices on demand for configuration, parameterisation, and diagnostic readout without disrupting the cyclic data exchange.',
  },
  {
    id: 12,
    question:
      'What other major fieldbus protocols exist besides Profibus, and where are they commonly found?',
    options: [
      'Foundation Fieldbus, DeviceNet, AS-Interface and HART, in their own applications',
      'RS-232, USB, HDMI and Bluetooth, all of them common on the factory floor',
      'TCP/IP, FTP, HTTP and DNS, the standard everyday office networking protocols',
      'CAN, LIN, FlexRay and MOST, all developed specifically for the rail industry',
    ],
    correctAnswer: 0,
    explanation:
      'Major fieldbus alternatives include Foundation Fieldbus (common in process industries, especially in the Americas), DeviceNet (based on CAN, common in Rockwell Automation factory environments), AS-Interface (a simple, cost-effective solution for connecting binary sensors and actuators), and HART (digital communication superimposed on 4-20 mA analogue wiring).',
  },
];

const faqs = [
  {
    question: 'Is Profibus still relevant or has it been replaced by Ethernet?',
    answer:
      'Profibus remains widely installed and actively supported, particularly Profibus PA in process industries. Whilst new installations increasingly use Profinet (Industrial Ethernet), Profibus has a massive installed base and will continue in service for many years. Migration strategies typically involve Profinet at the controller level with Profibus PA retained at the field level via proxy devices.',
  },
  {
    question: 'What is the maximum cable length for Profibus DP?',
    answer:
      'Maximum segment length depends on baud rate: 1200 m at 93.75 kbit/s, 1000 m at 187.5 kbit/s, 400 m at 500 kbit/s, 200 m at 1.5 Mbit/s, and 100 m at 12 Mbit/s. Repeaters can extend the total network length up to 9.6 km (with up to 9 repeaters in series at lower baud rates).',
  },
  {
    question: 'How do I troubleshoot intermittent Profibus communication?',
    answer:
      "Use a dedicated Profibus analyser to measure signal quality on each segment. Check for: marginal signal levels (should be greater than 4V peak-to-peak), excessive noise, incorrect termination, damaged cables or connectors, earth loops from shield bonding issues, and devices with poor transmitter quality. The analyser's live list shows which devices are experiencing retries or diagnostic messages.",
  },
  {
    question: 'What other fieldbus protocols exist besides Profibus?',
    answer:
      'Major alternatives include Foundation Fieldbus (common in process industries, especially in the Americas), DeviceNet (Allen-Bradley systems, mainly factory automation), AS-Interface (simple binary sensors and actuators), and HART (digital communication over analogue 4-20 mA wiring). Each has different strengths and is suited to different applications and vendor ecosystems.',
  },
  {
    question: 'Can Profibus and Foundation Fieldbus devices coexist on the same plant?',
    answer:
      'Yes, many plants use both protocols. They share the same physical layer (IEC 61158-2 MBP at 31.25 kbit/s) but use different application layers, so they cannot share the same bus segment. Integration is achieved at the control system level, where the DCS or SCADA system communicates with both networks via their respective interfaces. Gateways can also translate between protocols where needed.',
  },
];

const MOETModule5Section6_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 5.6 · Subsection 1"
        title="Fieldbus and Profibus Systems"
        backTo="/study-centre/apprentice/m-o-e-t-module5-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Digital serial communication networks replacing analogue wiring in process and factory
            automation.
          </p>

          <TLDR
            points={[
              'Fieldbus replaces individual 4-20 mA wiring with a shared digital cable carrying multiple device signals.',
              'Profibus DP uses RS-485 at up to 12 Mbit/s for fast I/O exchange with drives and remote I/O.',
              'Profibus PA uses MBP at 31.25 kbit/s for intrinsically safe process instrumentation.',
              'Termination, correct cabling, and GSD files are critical for reliable operation.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain the concept of fieldbus communication and its advantages over analogue wiring',
              'Describe Profibus DP and PA protocols, physical layers, and typical applications',
              'Identify network components: cables, connectors, terminators, repeaters, and couplers',
              'Configure devices using GSD files and station address assignment',
              'Troubleshoot common Profibus faults using dedicated analysers',
              'Compare Profibus with Foundation Fieldbus, DeviceNet, and HART',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Fault-finding:</strong> using Profibus analysers to measure signal quality
                and identify failing devices.
              </li>
              <li>
                <strong>Commissioning:</strong> importing GSD files, setting station addresses,
                verifying bus communication.
              </li>
              <li>
                <strong>Replacement:</strong> matching device type, GSD version, address, and
                connector wiring.
              </li>
              <li>
                <strong>ST1426:</strong> maps to industrial networking and communication knowledge
                requirements.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Fieldbus fundamentals</ContentEyebrow>

          <ConceptBlock
            title="Fieldbus fundamentals"
            onSite="When working on a fieldbus installation for the first time, always obtain the network documentation showing the bus topology, device list with addresses, cable routing, and termination locations. Without this, systematic fault-finding is extremely difficult."
          >
            <p>
              Traditional process instrumentation uses individual 4-20 mA analogue signals — one
              pair of wires per instrument running back to the control room. For a plant with
              thousands of instruments, this requires enormous quantities of cable, marshalling
              cabinets, and I/O cards. A fieldbus replaces this approach with a digital serial
              communication network where multiple devices share a single cable, dramatically
              reducing wiring, installation cost, and commissioning time.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Benefits beyond wiring reduction">
            <p>
              Fieldbus communication provides substantial advantages over traditional analogue
              wiring for both new installations and plant upgrades:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Diagnostic data:</strong> intelligent field devices report their health
                status, fault codes, and configuration back to the control system.
              </li>
              <li>
                <strong>Remote configuration:</strong> change ranges, engineering units, damping,
                and alarm limits from the control room without visiting the device.
              </li>
              <li>
                <strong>Multi-variable transmission:</strong> a single device can report multiple
                process variables (e.g., a Coriolis meter reports mass flow, density, and
                temperature).
              </li>
              <li>
                <strong>Higher data integrity:</strong> digital signals are less susceptible to
                noise and earth loops than analogue signals.
              </li>
              <li>
                <strong>Reduced I/O cards:</strong> one fieldbus interface card replaces multiple
                analogue input cards.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Major fieldbus standards">
            <p>
              Several fieldbus standards exist for different applications and industries, all
              defined under the IEC 61158 umbrella:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Profibus (IEC 61158 Type 3):</strong> the most widely installed fieldbus in
                Europe and process industries worldwide.
              </li>
              <li>
                <strong>Foundation Fieldbus (IEC 61158 Type 1):</strong> strong in the Americas and
                the Middle East, supports distributed control in field devices.
              </li>
              <li>
                <strong>DeviceNet (based on CAN):</strong> common in factory automation,
                particularly in Rockwell Automation ecosystems.
              </li>
              <li>
                <strong>AS-Interface:</strong> a simple, low-cost solution for connecting binary
                sensors and actuators at the lowest field level.
              </li>
              <li>
                <strong>Modbus RTU/ASCII (RS-485):</strong> an older but still widely used serial
                protocol for simple device communication.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Profibus DP — decentralised periphery</ContentEyebrow>

          <ConceptBlock title="Profibus DP — decentralised periphery">
            <p>
              Profibus DP is designed for fast, cyclic data exchange between controllers and
              distributed I/O modules, variable speed drives, and intelligent field devices. It uses
              RS-485 signalling over shielded twisted pair cable at speeds up to 12 Mbit/s. A master
              controller (PLC or DCS) polls slave devices in a cyclic manner, exchanging I/O data in
              each scan cycle.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Master-slave architecture">
            <p>
              The Profibus DP network operates on a master-slave principle with two classes of
              master:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Class 1 Master (controller):</strong> the PLC or DCS that cyclically polls
                each slave for its I/O data — this is the main controller running the process.
              </li>
              <li>
                <strong>Class 2 Master (engineering tool):</strong> an engineering workstation or
                diagnostic tool that accesses devices for configuration, parameterisation, and
                diagnostics.
              </li>
              <li>
                <strong>Slave devices:</strong> remote I/O modules, drives, transmitters, valve
                positioners — each with a unique station address (1 to 126).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Profibus DP speed vs cable length">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Baud rate</th>
                    <th className="py-2 pr-4 font-medium text-white">Max segment length</th>
                    <th className="py-2 font-medium text-white">Typical application</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">93.75 kbit/s</td>
                    <td className="py-2 pr-4">1200 m</td>
                    <td className="py-2">Long distances, slow processes</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">187.5 kbit/s</td>
                    <td className="py-2 pr-4">1000 m</td>
                    <td className="py-2">Process automation backbone</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">500 kbit/s</td>
                    <td className="py-2 pr-4">400 m</td>
                    <td className="py-2">Medium-speed applications</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">1.5 Mbit/s</td>
                    <td className="py-2 pr-4">200 m</td>
                    <td className="py-2">Most common industrial speed</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">12 Mbit/s</td>
                    <td className="py-2 pr-4">100 m</td>
                    <td className="py-2">High-speed drives, motion</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[13px]">
              Repeaters can extend the total network length. Up to 32 stations per segment; 127
              total with repeaters.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="GSD files and commissioning"
            onSite="When replacing a Profibus slave device, ensure the new device has the same (or compatible) GSD file, set the correct station address, and verify the module configuration matches the master's expectations. A mismatch will prevent communication."
          >
            <p>
              Each Profibus device type has a GSD (General Station Description) file provided by the
              manufacturer. This file must be imported into the master&apos;s configuration tool
              before the device can be used:
            </p>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                The GSD file describes the device&apos;s supported data types, diagnostic
                capabilities, and communication parameters.
              </li>
              <li>
                Station addresses (1-126) are set via DIP switches, rotary selectors, or software
                during commissioning.
              </li>
              <li>
                Each device must have a unique address — duplicate addresses cause bus collisions
                and communication failures.
              </li>
              <li>Always use the correct GSD version for the firmware installed on the device.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Profibus PA — process automation</ContentEyebrow>

          <ConceptBlock title="Profibus PA — process automation">
            <p>
              Profibus PA is designed specifically for process instrumentation in potentially
              hazardous (explosive) areas. It uses MBP (Manchester Bus Powered) technology at 31.25
              kbit/s, carrying both power and data on the same two-wire cable. This enables
              intrinsically safe operation in Ex zones — a fundamental requirement for chemical
              plants, refineries, and gas processing facilities.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Physical layer differences">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>MBP signalling at 31.25 kbit/s (fixed speed).</li>
              <li>Power and data on the same two wires.</li>
              <li>Bus-powered devices (typically 10-15 mA per device).</li>
              <li>Trunk and spur topology with field junction boxes.</li>
              <li>Maximum trunk length depends on Ex certification.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="DP/PA integration">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>PA segments connect to DP backbone via couplers or links.</li>
              <li>DP/PA coupler — transparent protocol conversion.</li>
              <li>DP/PA link — adds buffering and diagnostics.</li>
              <li>Segment power supply provides bus power to PA devices.</li>
              <li>Each PA segment is a separate intrinsic safety entity.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Hazardous area consideration">
            <p>
              Profibus PA installations in hazardous areas must comply with the ATEX Directive (in
              the UK, the Equipment and Protective Systems Intended for Use in Potentially Explosive
              Atmospheres Regulations). The entity concept is used to verify that the total cable
              capacitance, inductance, and number of devices on each PA segment remain within the
              certified limits. Exceeding these limits invalidates the intrinsic safety
              certification and creates an explosion risk.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Network installation and cabling</ContentEyebrow>

          <ConceptBlock
            title="Network installation and cabling"
            onSite="Keep a Profibus connector removal tool in your kit. The DB9 connectors have a specific A/B wiring orientation that must be maintained. When replacing a connector, always photograph the existing wiring before disconnecting, and verify the termination switch position matches the network documentation."
          >
            <p>
              Correct installation is critical for reliable Profibus operation. The majority of
              Profibus faults in the field are caused by cabling and installation errors rather than
              device failures. Following the cabling standards precisely prevents the vast majority
              of communication problems.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Profibus DP cabling rules">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable type:</strong> purple Type A shielded twisted pair, 150 ohm impedance
                (IEC 61158).
              </li>
              <li>
                <strong>Topology:</strong> linear bus — devices connect via T-connectors or spur
                cables (maximum 6.6 m spurs).
              </li>
              <li>
                <strong>Termination:</strong> active termination resistors (390/220/390 ohm network)
                at both physical ends of each segment — and nowhere else.
              </li>
              <li>
                <strong>Shielding:</strong> continuous cable shield with proper earthing at one
                point per segment to avoid earth loops.
              </li>
              <li>
                <strong>Connectors:</strong> use genuine Profibus connectors (DB9 or M12) with
                built-in termination switches.
              </li>
              <li>
                <strong>Separation:</strong> maintain at least 200 mm separation from power cables;
                cross at 90 degrees where necessary.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Common installation errors">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Error</th>
                    <th className="py-2 pr-4 font-medium text-white">Symptom</th>
                    <th className="py-2 font-medium text-white">How to detect</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Missing termination</td>
                    <td className="py-2 pr-4">Intermittent comms failures</td>
                    <td className="py-2">Analyser shows reflections</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Extra termination (middle of bus)</td>
                    <td className="py-2 pr-4">Low signal levels</td>
                    <td className="py-2">Analyser shows reduced amplitude</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Swapped A/B data lines</td>
                    <td className="py-2 pr-4">Device does not communicate</td>
                    <td className="py-2">Check wiring at connector</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Duplicate address</td>
                    <td className="py-2 pr-4">Both devices intermittently fail</td>
                    <td className="py-2">Live list shows conflicts</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Damaged cable</td>
                    <td className="py-2 pr-4">Reduced signal amplitude</td>
                    <td className="py-2">TDR or analyser waveform</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Shield discontinuity</td>
                    <td className="py-2 pr-4">Noise-related errors</td>
                    <td className="py-2">Continuity test on screen</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ContentEyebrow>Troubleshooting with Profibus analysers</ContentEyebrow>

          <ConceptBlock
            title="Troubleshooting with Profibus analysers"
            onSite="Under ST1426, maintenance technicians are expected to understand fieldbus communication principles, identify fieldbus components, carry out basic fault-finding using appropriate test equipment, and replace faulty devices following correct procedures for the bus type and hazardous area classification."
          >
            <p>
              Systematic troubleshooting of Profibus networks requires dedicated test equipment. A
              standard multimeter can confirm voltage and continuity, but cannot assess signal
              quality, timing, or protocol-level errors. Profibus analysers are purpose-built tools
              that every maintenance technician working with fieldbus should be familiar with.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What a Profibus analyser measures">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Signal amplitude:</strong> peak-to-peak voltage of the bus signal (should be
                greater than 4V for DP, typically 6-7V).
              </li>
              <li>
                <strong>Signal symmetry:</strong> the positive and negative halves of the waveform
                should be balanced.
              </li>
              <li>
                <strong>Noise level:</strong> interference on the bus measured between valid
                telegrams.
              </li>
              <li>
                <strong>Rise/fall times:</strong> signal edges must meet timing specifications.
              </li>
              <li>
                <strong>Live list:</strong> all active devices, their communication status, retry
                counts, and diagnostic flags.
              </li>
              <li>
                <strong>Topology map:</strong> physical layout of devices on the bus showing cable
                lengths.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Preventive maintenance">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Annual bus health check with analyser.</li>
              <li>Trend signal quality over time.</li>
              <li>Identify degrading connections early.</li>
              <li>Document baseline readings for comparison.</li>
              <li>Check all termination switches during inspections.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Popular analyser tools">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Procentec ProfiTrace — portable bus analysis.</li>
              <li>Softing BC-600-PB — comprehensive diagnostics.</li>
              <li>Siemens Diagnostic Repeater — permanent monitoring.</li>
              <li>Indu-Sol PB-Qone — signal quality testing.</li>
              <li>Endress+Hauser FieldCare — device configuration.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Safety consideration">
            <p>
              Before connecting test equipment to a live Profibus PA segment in a hazardous area,
              verify that the test equipment is certified for use in the relevant Ex zone.
              Connecting uncertified equipment to an intrinsically safe bus segment can compromise
              the safety integrity of the entire segment, creating an explosion risk. Always check
              the test equipment&apos;s ATEX or IECEx certification before use.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Fieldbus replaces individual analogue wiring with a shared digital cable carrying multiple device signals, diagnostics and remote configuration.',
              'Profibus DP: RS-485, up to 12 Mbit/s, purple Type A shielded twisted pair, 150 ohm, up to 32 stations per segment (127 with repeaters).',
              'Profibus PA: MBP at a fixed 31.25 kbit/s, power and data on two wires, for intrinsically safe operation in Ex zones.',
              'A GSD file is required for the master to configure each device; station addresses (1-126) must be unique.',
              'Termination resistors belong only at both physical ends of a segment — nowhere else.',
              'A dedicated Profibus analyser, not a multimeter, is the correct tool for signal-quality and protocol-level fault-finding.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section6')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Back to section
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Networking and Industrial Communication
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module5-section6-2')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Industrial Ethernet
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule5Section6_1;
