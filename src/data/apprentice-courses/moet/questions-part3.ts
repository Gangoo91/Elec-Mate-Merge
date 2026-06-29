// MOET Level 3 - Maintenance & Operations Engineering Technician (ST1426)
// Electrical Engineering Maintenance Technician Pathway
// Questions Part 3: Module 5 (Control & Automation) and Module 6 (Documentation)
// Questions 81-120

import type { StandardMockQuestion } from '@/types/standardMockExam';

export const questionsPart3: StandardMockQuestion[] = [
  // ============================================================
  // MODULE 5: CONTROL & AUTOMATION (Questions 81-100)
  // ============================================================

  // Sensors & Instrumentation (Questions 81-86)
  {
    id: 81,
    question:
      'A 4-20 mA current loop is commonly used for process instrumentation signals. What does a signal of 4 mA represent?',
    options: [
      'A cable or sensor fault, since a healthy signal never falls as low as 4 mA',
      'The zero or minimum value of the measured range',
      'The full-scale (maximum) value of the measured range',
      'The mid-point (50 percent) of the measured range',
    ],
    correctAnswer: 1,
    explanation:
      "In a 4-20 mA current loop, 4 mA represents the zero (minimum) value and 20 mA represents the full-scale (maximum) value of the measured range. The 'live zero' at 4 mA allows the system to distinguish between a zero reading and a cable break or instrument failure (which would show 0 mA). This is a key advantage over 0-20 mA systems.",
    section: 'Instrumentation',
    difficulty: 'basic',
    topic: '4-20 mA Signals',
    category: 'Control & Automation',
  },
  {
    id: 82,
    question:
      'What type of sensor would be most appropriate for measuring the temperature of a motor bearing in the range 0-200 degrees C with high accuracy?',
    options: [
      'A type K thermocouple, chosen for its very high accuracy at low temperatures',
      'A bimetallic strip thermostat reading the bearing surface temperature',
      'A PT100 resistance temperature detector (RTD)',
      'An infrared (non-contact) pyrometer aimed at the bearing housing',
    ],
    correctAnswer: 2,
    explanation:
      'A PT100 RTD (platinum resistance thermometer with 100 ohm resistance at 0 degrees C) provides high accuracy (typically +/- 0.3 degrees C) and excellent stability in the range of -200 to +600 degrees C. It is the preferred choice for precision temperature measurement on bearings and windings. Thermocouples have a wider range but lower accuracy. RTDs are connected in 2-wire, 3-wire, or 4-wire configurations to compensate for lead resistance.',
    section: 'Sensors',
    difficulty: 'intermediate',
    topic: 'Temperature Sensors',
    category: 'Control & Automation',
  },
  {
    id: 83,
    question: 'What is the function of a proximity sensor fitted to a conveyor system?',
    options: [
      'To measure the precise weight of each object passing along the conveyor belt',
      'To vary the speed of the conveyor motor in response to the load being carried',
      'To physically stop the belt by making mechanical contact with each passing object',
      'To detect the presence or absence of an object without physical contact',
    ],
    correctAnswer: 3,
    explanation:
      'A proximity sensor detects the presence or absence of an object within its sensing range without making physical contact. Types include inductive (metal objects), capacitive (any material), and photoelectric (light beam). On conveyor systems, they are used for object counting, jam detection, position sensing, and speed monitoring. They are non-contact, have no moving parts, and are highly reliable.',
    section: 'Sensors',
    difficulty: 'basic',
    topic: 'Proximity Sensors',
    category: 'Control & Automation',
  },
  {
    id: 84,
    question: 'An inductive proximity sensor can detect which type of materials?',
    options: [
      'Metallic (ferrous and non-ferrous) materials only',
      'Any solid material, whether metallic, plastic, glass, or liquid',
      'Non-metallic materials such as plastic, wood, and glass only',
      'Transparent materials only, by detecting an interrupted light beam',
    ],
    correctAnswer: 0,
    explanation:
      'Inductive proximity sensors work by generating a high-frequency electromagnetic field that is disturbed when a metallic object enters the sensing zone. They can detect both ferrous (iron, steel) and non-ferrous (aluminium, copper, brass) metals, although sensing distances are typically reduced for non-ferrous metals. For non-metallic materials, capacitive or photoelectric sensors should be used instead.',
    section: 'Sensors',
    difficulty: 'basic',
    topic: 'Inductive Sensors',
    category: 'Control & Automation',
  },
  {
    id: 85,
    question: 'What is the purpose of calibration of a process instrument?',
    options: [
      'To clean the instrument internally and replace any worn sensing components',
      'To compare the reading against a known reference and adjust it if necessary',
      'To increase the measuring range of the instrument beyond its original specification',
      'To convert the instrument output from a 4-20 mA signal to a digital protocol',
    ],
    correctAnswer: 1,
    explanation:
      "Calibration is the process of comparing an instrument's reading against a known traceable reference standard (calibrator) and adjusting if necessary to bring the reading within the specified accuracy tolerance. Calibration must be performed at regular intervals, documented with before and after readings (as-found and as-left), and traceable to national standards (UKAS in the UK).",
    section: 'Calibration',
    difficulty: 'basic',
    topic: 'Calibration Purpose',
    category: 'Control & Automation',
  },
  {
    id: 86,
    question:
      'A pressure transmitter has a range of 0-10 bar and outputs 4-20 mA. What output signal should the transmitter produce at 5 bar?',
    options: [
      '10 mA',
      '8 mA',
      '12 mA',
      '16 mA',
    ],
    correctAnswer: 2,
    explanation:
      'At 5 bar (50% of range), the output should be at the midpoint of the 4-20 mA range. The span is 16 mA (20 - 4). At 50%: output = 4 + (0.5 x 16) = 4 + 8 = 12 mA. This linear relationship allows the formula: mA = 4 + (measured value / full scale) x 16. Checking this calculation is a standard part of instrument calibration verification.',
    section: 'Calibration',
    difficulty: 'intermediate',
    topic: 'Signal Calculation',
    category: 'Control & Automation',
  },

  // PLCs & Safety Circuits (Questions 87-93)
  {
    id: 87,
    question: 'What are the three main sections of a PLC (Programmable Logic Controller)?',
    options: [
      'Rectifier, smoothing capacitor, and inverter stage',
      'Sensor, transmitter, and final control element',
      'Display screen, keypad, and printer interface',
      'Input module, central processing unit (CPU), and output module',
    ],
    correctAnswer: 3,
    explanation:
      'A PLC consists of three main functional sections: the input module (receives signals from sensors, switches, and other field devices), the CPU (processes the program logic and makes decisions based on the input states), and the output module (sends control signals to actuators, contactors, valves, and indicators). Additionally, a power supply unit provides the required voltages.',
    section: 'PLCs',
    difficulty: 'basic',
    topic: 'PLC Architecture',
    category: 'Control & Automation',
  },
  {
    id: 88,
    question:
      "In PLC programming, what does a 'normally open' (NO) contact instruction represent in ladder logic?",
    options: [
      'An instruction that is TRUE (passes logic continuity) when the associated input or memory bit is in the ON (1) state',
      'An instruction that is TRUE (passes logic continuity) only when the associated bit is in the OFF (0) state',
      'An output instruction that energises a coil whenever the rung above it is FALSE',
      'A timer instruction that delays the rung result by a preset number of seconds',
    ],
    correctAnswer: 0,
    explanation:
      'In ladder logic, a normally open (NO) contact instruction ( ] [ ) passes logic continuity (is TRUE) when the associated bit address is ON (logic 1). When the bit is OFF (logic 0), the contact is open and does not pass continuity. This mirrors the behaviour of a physical normally open switch contact. Conversely, a normally closed (NC) contact ( ]/[ ) passes continuity when its bit is OFF.',
    section: 'PLCs',
    difficulty: 'intermediate',
    topic: 'Ladder Logic',
    category: 'Control & Automation',
  },
  {
    id: 89,
    question: 'What is the PLC scan cycle?',
    options: [
      'The one-off sequence the PLC runs only at power-up to load its program into memory',
      'The repetitive cycle where the PLC reads all inputs, executes the program logic, and updates all outputs',
      'The process of downloading a new program from the laptop into the PLC CPU',
      'The diagnostic routine that scans the I/O modules for hardware faults on demand',
    ],
    correctAnswer: 1,
    explanation:
      'The PLC scan cycle is a continuous repetitive process: (1) read all inputs and store in the input image table, (2) execute the program from top to bottom using the input image data, (3) update the output image table, (4) write output image to physical outputs. A typical scan time is 1-100 milliseconds depending on program size and CPU speed. Understanding the scan cycle is essential for troubleshooting timing-related issues.',
    section: 'PLCs',
    difficulty: 'intermediate',
    topic: 'Scan Cycle',
    category: 'Control & Automation',
  },
  {
    id: 90,
    question:
      'What is the fundamental requirement of a safety-related control circuit complying with BS EN ISO 13849?',
    options: [
      'It must use only intrinsically safe components rated for use in explosive atmospheres',
      'It must be powered from a separated extra-low voltage (SELV) supply at all times',
      'It must achieve the required Performance Level (PL) for the assessed risk',
      'It must be controlled by a dedicated single-channel PLC with no redundancy required',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN ISO 13849-1 requires safety-related control systems to achieve a specified Performance Level (PL a to PL e) based on risk assessment. This is achieved through the combination of: designated architecture (Category B, 1, 2, 3, or 4), component reliability (MTTFd), diagnostic coverage (DC), and common cause failure avoidance (CCF). Higher categories provide greater redundancy and fault tolerance.',
    section: 'Safety Circuits',
    difficulty: 'advanced',
    topic: 'Performance Levels',
    category: 'Control & Automation',
  },
  {
    id: 91,
    question:
      'An emergency stop circuit is classified as a safety function. What category should it typically achieve under BS EN ISO 13849?',
    options: [
      'No specific category is required',
      'Category 1 (single channel with well-tried components)',
      'Category B (basic)',
      'Category 3 or 4 (redundant channels with monitoring and fault detection)',
    ],
    correctAnswer: 3,
    explanation:
      'Emergency stop circuits typically require Category 3 or Category 4 under BS EN ISO 13849-1. Category 3 uses redundant channels where a single fault does not lead to loss of the safety function, and the fault is detected at or before the next demand. Category 4 adds the requirement that accumulation of undetected faults does not lead to loss of safety function. Safety relays or safety PLCs are commonly used to achieve these categories.',
    section: 'Safety Circuits',
    difficulty: 'advanced',
    topic: 'E-Stop Categories',
    category: 'Control & Automation',
  },
  {
    id: 92,
    question: 'What is the purpose of a safety relay module in an emergency stop circuit?',
    options: [
      'To monitor the stop circuit for faults and prevent restart until reset',
      'To boost the low-voltage stop signal up to mains voltage so it can switch the motor directly',
      'To time the delay between pressing the stop button and the machine coming to rest',
      'To allow a single emergency stop button to control several unrelated machines at once',
    ],
    correctAnswer: 0,
    explanation:
      'A safety relay module provides: dual-channel monitoring of the emergency stop circuit (detecting wiring faults, welded contacts), forced-guided relay contacts for redundant switching of the safety outputs, cross-monitoring between channels to detect discrepancies, and anti-restart (manual reset) to prevent automatic restart after the emergency stop is released. This achieves Category 3 or 4 safety performance.',
    section: 'Safety Circuits',
    difficulty: 'intermediate',
    topic: 'Safety Relays',
    category: 'Control & Automation',
  },
  {
    id: 93,
    question:
      'A light curtain is used as a safety device on a press machine. If a person breaks the light beam during the pressing cycle, what should happen?',
    options: [
      'The machine sounds an audible alarm but completes the current stroke before stopping',
      'The machine immediately stops in a safe state, preventing the press from completing the stroke',
      'The machine slows to a controlled stop only at the end of the production batch',
      'The machine continues running and logs the interruption for later investigation',
    ],
    correctAnswer: 1,
    explanation:
      'A light curtain (also called an active opto-electronic protective device - AOPD) must initiate an immediate machine stop when any of its beams are interrupted. The machine must reach a safe state before any part of the body could enter the danger zone. The stopping performance and the safety distance between the light curtain and the hazard point must be calculated in accordance with BS EN ISO 13855.',
    section: 'Safety Circuits',
    difficulty: 'intermediate',
    topic: 'Light Curtains',
    category: 'Control & Automation',
  },

  // Process Control, SCADA & Industrial Networking (Questions 94-100)
  {
    id: 94,
    question: "In a PID control loop, what does the 'I' (integral) term do?",
    options: [
      'Responds in proportion to the present error, giving an immediate corrective output',
      'Responds to the rate of change of the error, anticipating and damping rapid swings',
      'Accumulates the error over time and adjusts the output to eliminate steady-state error (offset)',
      'Sets a fixed maximum and minimum limit on the controller output signal',
    ],
    correctAnswer: 2,
    explanation:
      "The integral (I) term in a PID controller accumulates (integrates) the error over time. It adds a correction proportional to both the magnitude and duration of the error, which eliminates the steady-state offset that a proportional-only controller would leave. Too much integral action causes overshoot and oscillation; too little leaves residual offset. Integral 'wind-up' can occur if the output saturates.",
    section: 'Process Control',
    difficulty: 'advanced',
    topic: 'PID Control',
    category: 'Control & Automation',
  },
  {
    id: 95,
    question: 'What is a SCADA system and what role does it play in industrial operations?',
    options: [
      'A single-loop controller that regulates one process variable against a fixed setpoint',
      'A protective relay that isolates a feeder automatically when a fault is detected',
      'A handheld configuration tool used to program individual PLCs on the plant floor',
      'A Supervisory Control And Data Acquisition system for centralised plant monitoring',
    ],
    correctAnswer: 3,
    explanation:
      'SCADA (Supervisory Control And Data Acquisition) systems provide centralised monitoring and control of geographically distributed industrial processes. They collect real-time data from remote terminal units (RTUs) or PLCs via communication networks, display process status on HMI screens, allow operator control actions, log historical data, and generate alarms. SCADA is used extensively in utilities, manufacturing, and building management.',
    section: 'SCADA',
    difficulty: 'basic',
    topic: 'SCADA Overview',
    category: 'Control & Automation',
  },
  {
    id: 96,
    question:
      'What communication protocol is most commonly used for industrial automation networking between PLCs and field devices?',
    options: [
      'PROFINET, EtherNet/IP, or Modbus TCP/IP',
      'HDMI, DisplayPort, or VGA video links',
      'Bluetooth, Zigbee, or NFC short-range wireless',
      'HTTP, SMTP, or FTP standard office internet protocols',
    ],
    correctAnswer: 0,
    explanation:
      'Industrial automation commonly uses dedicated industrial Ethernet protocols such as PROFINET (Siemens), EtherNet/IP (Rockwell/Allen-Bradley), and Modbus TCP/IP (open standard). These protocols provide deterministic, real-time communication suitable for process control. Older fieldbus protocols such as PROFIBUS and DeviceNet are still in use but are being superseded by Ethernet-based protocols.',
    section: 'Industrial Networking',
    difficulty: 'intermediate',
    topic: 'Communication Protocols',
    category: 'Control & Automation',
  },
  {
    id: 97,
    question:
      'What is the purpose of an HMI (Human Machine Interface) on an industrial control panel?',
    options: [
      'To supply the regulated DC control voltage required by the PLC and field devices',
      'To provide a graphical interface for operators to monitor process variables, view alarms, and control equipment',
      'To execute the ladder logic program that controls the connected machinery',
      'To convert analogue sensor signals into the digital format used by the network',
    ],
    correctAnswer: 1,
    explanation:
      'An HMI provides a graphical user interface for operators to interact with the control system. It displays real-time process values, equipment status, trends, and alarms. Operators can enter setpoints, start/stop equipment, and acknowledge alarms through the HMI touchscreen. Modern HMIs communicate with PLCs via industrial Ethernet (PROFINET, EtherNet/IP) or serial protocols.',
    section: 'SCADA',
    difficulty: 'basic',
    topic: 'HMI Function',
    category: 'Control & Automation',
  },
  {
    id: 98,
    question:
      'What is the purpose of network segregation (segmentation) in an industrial control system?',
    options: [
      'To increase the raw data transmission speed of the industrial Ethernet network',
      'To allow every device on the plant to share a single common IP address',
      'To separate the control network from the IT network and internet for cybersecurity',
      'To remove the need for any firewall between the control system and the internet',
    ],
    correctAnswer: 2,
    explanation:
      'Network segregation separates the operational technology (OT) control network from the information technology (IT) corporate network using firewalls, DMZs (demilitarised zones), and VLANs. This follows the Purdue Model / IEC 62443 framework and prevents: cybersecurity threats from reaching critical control systems, non-essential network traffic from disrupting real-time control, and unauthorised access to safety-critical equipment.',
    section: 'Industrial Networking',
    difficulty: 'advanced',
    topic: 'Cybersecurity',
    category: 'Control & Automation',
  },
  {
    id: 99,
    question:
      'A maintenance technician needs to replace a PLC input module. What precaution must be taken regarding the PLC programme?',
    options: [
      'Delete the existing PLC programme so the new module loads its own default logic',
      'Rewrite the entire ladder programme from scratch to suit the replacement module',
      'Change the I/O addressing of all other modules to match the new module&rsquo;s address',
      'Confirm the module type and I/O addressing match, and back up the programme first',
    ],
    correctAnswer: 3,
    explanation:
      'Before replacing a PLC I/O module: verify the replacement is the same type and part number, ensure the I/O addressing and configuration match the original (particularly for analogue modules with scaling parameters), back up the current PLC programme, follow safe isolation and LOTO procedures, and test each I/O point after replacement to confirm correct operation. Some PLC systems support hot-swap modules without needing to stop the CPU.',
    section: 'PLCs',
    difficulty: 'intermediate',
    topic: 'PLC Maintenance',
    category: 'Control & Automation',
  },
  {
    id: 100,
    question: 'What is Modbus RTU and how does it differ from Modbus TCP?',
    options: [
      'Modbus RTU uses serial communication (RS-485/RS-232) with binary encoding, while Modbus TCP uses Ethernet with TCP/IP encapsulation of the Modbus protocol',
      'Modbus RTU is a wireless protocol, while Modbus TCP requires a fibre-optic connection',
      'Modbus RTU is used only between PLCs, while Modbus TCP is used only for HMI displays',
      'Modbus RTU carries analogue signals, while Modbus TCP carries only digital on/off signals',
    ],
    correctAnswer: 0,
    explanation:
      'Modbus RTU (Remote Terminal Unit) is a serial communication protocol that uses RS-485 (multi-drop) or RS-232 (point-to-point) physical connections with binary data encoding. Modbus TCP encapsulates the same Modbus protocol data unit within TCP/IP packets for transmission over Ethernet networks. Both use the same register-based data model but Modbus TCP offers higher speed, longer distances (via standard networking), and easier integration with modern systems.',
    section: 'Industrial Networking',
    difficulty: 'advanced',
    topic: 'Modbus Protocols',
    category: 'Control & Automation',
  },

  // ============================================================
  // MODULE 6: DOCUMENTATION (Questions 101-120)
  // ============================================================

  // Engineering Drawings & Schematics (Questions 101-108)
  {
    id: 101,
    question:
      "On an electrical schematic diagram, what does the symbol '-|>|-' (triangle between two lines) typically represent?",
    options: [
      'A resistor',
      'A diode',
      'A capacitor',
      'An inductor',
    ],
    correctAnswer: 1,
    explanation:
      'The triangle symbol between two lines represents a diode, which allows current to flow in one direction only (from anode to cathode). The triangle points in the direction of conventional current flow. Diodes are commonly found in rectifier circuits, protection circuits (flyback/freewheeling diodes across relay coils), and LED indicator circuits. Reading electrical schematics is an essential skill for maintenance technicians.',
    section: 'Schematics',
    difficulty: 'basic',
    topic: 'Electrical Symbols',
    category: 'Documentation',
  },
  {
    id: 102,
    question: 'What is the difference between a schematic diagram and a wiring diagram?',
    options: [
      'A schematic is always drawn to scale, whereas a wiring diagram is never drawn to scale',
      'A schematic is used only for AC circuits, whereas a wiring diagram is used only for DC circuits',
      'A schematic shows the functional relationship between components using standard symbols, while a wiring diagram shows the physical routing and connections of cables and conductors',
      'A schematic is produced by the manufacturer, whereas a wiring diagram is produced only on site',
    ],
    correctAnswer: 2,
    explanation:
      'A schematic (circuit) diagram shows the electrical function and logical connections using standard symbols (BS EN 60617). It focuses on how the circuit works. A wiring diagram shows the physical layout, cable routes, terminal numbers, and actual connections between components. Both are needed for maintenance: the schematic for understanding circuit operation and fault diagnosis, the wiring diagram for physically locating and connecting components.',
    section: 'Schematics',
    difficulty: 'basic',
    topic: 'Drawing Types',
    category: 'Documentation',
  },
  {
    id: 103,
    question: "On a motor control schematic, what does 'KM1' typically designate?",
    options: [
      'A circuit breaker (the first moulded-case breaker in the circuit)',
      'A control fuse (the first fuse protecting the control circuit)',
      'A push-button (the first start button in the control circuit)',
      'A contactor (the first contactor in the circuit)',
    ],
    correctAnswer: 3,
    explanation:
      "In IEC/BS EN 81346 designation, 'K' denotes a relay or contactor, and 'M' specifies it as a main (power) contactor. 'KM1' is therefore the first main contactor in the circuit. Other common designations include: KA (auxiliary relay), QF (circuit breaker), FU (fuse), SB (pushbutton), and HL (indicator lamp). Understanding these designations is essential for reading control panel schematics.",
    section: 'Schematics',
    difficulty: 'intermediate',
    topic: 'Component Designations',
    category: 'Documentation',
  },
  {
    id: 104,
    question:
      'What information does a single-line diagram (SLD) of an electrical distribution system show?',
    options: [
      'A simplified power distribution layout using single lines for three-phase circuits',
      'The physical layout of every cable route and tray within the building, drawn to scale',
      'The detailed internal wiring of a single control panel, showing every terminal connection',
      'The logical sequence of a control program, showing how outputs respond to inputs',
    ],
    correctAnswer: 0,
    explanation:
      'A single-line diagram (SLD) or one-line diagram is a simplified representation of a three-phase power system where a single line represents all three phases. It shows the overall system architecture: incoming supplies, transformers, switchgear, protection devices, cable sizes, and major loads. SLDs are essential for understanding the power distribution hierarchy, fault level calculations, and planning switching operations.',
    section: 'Schematics',
    difficulty: 'intermediate',
    topic: 'Single-Line Diagrams',
    category: 'Documentation',
  },
  {
    id: 105,
    question: 'What is the purpose of cross-referencing on a multi-page control schematic?',
    options: [
      'To list the revision history of the drawing so the latest version can be identified',
      'To show where a relay coil on one page has its associated contacts shown on other pages, enabling the technician to trace the complete circuit',
      'To indicate the physical cable route between two components on different floors',
      'To record the torque settings required for each terminal connection on the page',
    ],
    correctAnswer: 1,
    explanation:
      'Cross-referencing on multi-page schematics enables a technician to trace complete circuits across multiple drawing pages. For example, a relay coil KA1 shown on page 3 may have contacts on pages 5, 7, and 12. The cross-reference notation at the coil symbol lists these page/line numbers, and each contact references back to the coil location. This is essential for efficient fault diagnosis on complex control systems.',
    section: 'Schematics',
    difficulty: 'intermediate',
    topic: 'Cross-Referencing',
    category: 'Documentation',
  },
  {
    id: 106,
    question:
      "On a piping and instrumentation diagram (P&ID), what does the instrument tag 'TT-101' represent?",
    options: [
      'A test terminal block, terminal number 101',
      'A timer relay with a 101-second preset delay',
      'A temperature transmitter, instrument number 101',
      'A pressure transmitter, instrument number 101',
    ],
    correctAnswer: 2,
    explanation:
      'In ISA/BS EN 62424 instrumentation nomenclature, the first letter indicates the measured variable (T = temperature), the second letter indicates the function (T = transmitter), and the number is the instrument loop number. So TT-101 is Temperature Transmitter number 101. Other examples: PT = pressure transmitter, FT = flow transmitter, LT = level transmitter. P&IDs are used extensively in process industries.',
    section: 'P&IDs',
    difficulty: 'intermediate',
    topic: 'Instrument Tagging',
    category: 'Documentation',
  },
  {
    id: 107,
    question: 'What is the purpose of a cable schedule in an electrical installation?',
    options: [
      'To list the planned dates on which each cable run is to be installed on site',
      'To record the calibration status of every test instrument used on the installation',
      'To set out the maintenance tasks and intervals for each circuit in the installation',
      'To provide a tabulated record of every cable: reference, type, size, origin and destination',
    ],
    correctAnswer: 3,
    explanation:
      'A cable schedule is a tabulated document listing every cable in an installation. It typically includes: cable reference number, cable type and size, number of cores, origin (from) and destination (to), route description, length, voltage rating, and associated circuit number. Cable schedules are essential for maintenance, fault finding, cable identification, and planning modifications to the installation.',
    section: 'Schematics',
    difficulty: 'basic',
    topic: 'Cable Schedules',
    category: 'Documentation',
  },
  {
    id: 108,
    question: 'When reading a control panel layout drawing, what does the arrangement view show?',
    options: [
      'The physical position of components within the panel enclosure',
      'The logical operation of the control circuit using standard schematic symbols',
      'The list of every cable entering the panel with its size, origin, and destination',
      'The sequence of operations the panel performs once it is energised and running',
    ],
    correctAnswer: 0,
    explanation:
      'A panel layout (arrangement) drawing shows the physical position of all components inside the control panel enclosure. It includes the location of DIN rails, cable trunking/ducts, terminal blocks, PLCs, relays, contactors, circuit breakers, power supplies, and ventilation. This drawing is used during panel assembly and is essential for maintenance technicians to physically locate components identified from the schematic diagram.',
    section: 'Schematics',
    difficulty: 'basic',
    topic: 'Panel Layout',
    category: 'Documentation',
  },

  // Maintenance Records & CMMS (Questions 109-115)
  {
    id: 109,
    question:
      'What is the primary function of a CMMS (Computerised Maintenance Management System)?',
    options: [
      'To control plant machinery directly in real time, replacing the site PLCs',
      'To manage, schedule, and record all maintenance activities and assets',
      'To monitor live process variables and display them to operators on an HMI screen',
      'To prepare and store the engineering drawings and schematics for the installation',
    ],
    correctAnswer: 1,
    explanation:
      'A CMMS is a software system used to manage maintenance operations. Core functions include: work order management (creation, assignment, tracking, completion), asset register and history, planned preventive maintenance scheduling, spare parts inventory management, labour tracking, and reporting on maintenance KPIs (MTBF, MTTR, backlog, costs). Accurate data entry by maintenance technicians is essential for the system to provide value.',
    section: 'CMMS',
    difficulty: 'basic',
    topic: 'CMMS Function',
    category: 'Documentation',
  },
  {
    id: 110,
    question: 'What information should a maintenance work order contain upon completion?',
    options: [
      'Only the date the work order was raised and the name of the technician assigned',
      'Only confirmation that the equipment is now running, with no further detail required',
      'Work performed, parts used, time taken, fault found and any follow-up required',
      'Only the purchase cost of the replacement parts used during the repair',
    ],
    correctAnswer: 2,
    explanation:
      'A completed work order should contain: description of work requested and work actually performed, root cause/fault found, corrective actions taken, parts and materials used (with part numbers), labour time (travel, diagnosis, repair), any follow-up work identified, safety observations, and asset condition assessment. This data feeds into the CMMS for trend analysis, reliability improvement, and maintenance planning.',
    section: 'Maintenance Records',
    difficulty: 'basic',
    topic: 'Work Orders',
    category: 'Documentation',
  },
  {
    id: 111,
    question: 'Why is it important to maintain an accurate asset register in a CMMS?',
    options: [
      'It is only needed for financial depreciation and has no bearing on maintenance work',
      'It records the live operating status of each machine, replacing the need for a SCADA system',
      'It lists only the spare parts held in the stores, with no link to individual assets',
      'To record every maintainable asset with its location, criticality and history',
    ],
    correctAnswer: 3,
    explanation:
      'An accurate asset register is the foundation of effective maintenance management. It enables: identification and location of all equipment, recording of maintenance history and costs against each asset, planning of PPM schedules based on manufacturer recommendations and operating experience, spare parts association, criticality ranking for maintenance prioritisation, and lifecycle cost analysis for replacement decisions.',
    section: 'CMMS',
    difficulty: 'intermediate',
    topic: 'Asset Register',
    category: 'Documentation',
  },
  {
    id: 112,
    question: 'What is the purpose of a maintenance log or shift handover report?',
    options: [
      'To pass on equipment status, ongoing work and safety concerns between shifts',
      'To record the hours worked by each technician for payroll and overtime purposes',
      'To list the spare parts that need to be ordered from suppliers that week',
      'To provide formal training records demonstrating each technician&rsquo;s competencies',
    ],
    correctAnswer: 0,
    explanation:
      'Shift handover reports are critical for maintaining continuity of maintenance operations. They communicate: equipment status (running, on standby, out of service), ongoing maintenance work and its current stage, any abnormal conditions or alarms, safety concerns and active permits to work, outstanding work orders, and any instructions from management. Poor handover communication is a contributing factor in many industrial incidents.',
    section: 'Maintenance Records',
    difficulty: 'basic',
    topic: 'Shift Handover',
    category: 'Documentation',
  },
  {
    id: 113,
    question: 'What is a maintenance backlog and why is it an important KPI?',
    options: [
      'The number of breakdowns that occurred on a single asset during the past year',
      'The total of outstanding, uncompleted maintenance work orders awaiting execution',
      'The average time taken to repair equipment once a fault has been reported',
      'The proportion of maintenance carried out reactively rather than as planned work',
    ],
    correctAnswer: 1,
    explanation:
      'The maintenance backlog represents all outstanding work orders that are ready to be executed but have not yet been completed. It is typically measured in person-hours or weeks of work. A growing backlog indicates that the maintenance team is falling behind demand, which may lead to: equipment deterioration, increased breakdown frequency, safety risks, and deferred maintenance becoming more expensive. Industry benchmark is typically 2-4 weeks of backlog.',
    section: 'CMMS',
    difficulty: 'intermediate',
    topic: 'Maintenance KPIs',
    category: 'Documentation',
  },
  {
    id: 114,
    question:
      'Under the Electricity at Work Regulations 1989, what records should be kept for electrical maintenance and testing?',
    options: [
      'Only the dates on which electrical equipment was purchased and first installed',
      'Only a copy of the manufacturer&rsquo;s instructions supplied with each item of equipment',
      'Maintenance, inspection and test records with results, dates and the competent person',
      'Only the names of staff who hold an electrical qualification, with no test data',
    ],
    correctAnswer: 2,
    explanation:
      "While EAWR 1989 does not explicitly require specific record formats, Regulation 4(2) requires that systems are maintained to prevent danger. Maintaining adequate records is essential to demonstrate compliance. Records should include: what was inspected/tested/maintained, test results, date, the competent person's name, any defects found, and remedial actions taken. BS 7671 specifies record formats for initial verification and periodic inspection.",
    section: 'Maintenance Records',
    difficulty: 'intermediate',
    topic: 'Legal Requirements',
    category: 'Documentation',
  },
  {
    id: 115,
    question:
      "What is the benefit of recording 'as-found' and 'as-left' readings during instrument calibration?",
    options: [
      'It removes the need to record the traceable reference standard used for the calibration',
      'It allows the calibration to be carried out without isolating the instrument from the process',
      'It confirms which technician is qualified to adjust the instrument in future',
      'To track instrument drift over time and evidence calibration accuracy',
    ],
    correctAnswer: 3,
    explanation:
      'Recording as-found (before adjustment) and as-left (after adjustment) readings provides: evidence that the instrument was within or outside specification at the time of calibration, data to track instrument drift trends over time, a basis for adjusting calibration intervals (more frequently if drift is excessive, less frequently if consistently within limits), and documented proof of calibration accuracy for audit and quality purposes.',
    section: 'Calibration',
    difficulty: 'intermediate',
    topic: 'Calibration Records',
    category: 'Documentation',
  },

  // Handovers & Technical Documentation (Questions 116-120)
  {
    id: 116,
    question:
      'After completing a maintenance task on a safety-critical system, what documentation should be provided during the handover back to operations?',
    options: [
      'Completed work order, test records, permit cancellation and interlock confirmation',
      'A verbal confirmation to the operator that the work is finished, with no paperwork',
      'Only the updated asset register entry, which operations can review at a later date',
      'Only the supplier&rsquo;s invoice for any replacement parts used during the maintenance',
    ],
    correctAnswer: 0,
    explanation:
      'Handover of a safety-critical system requires comprehensive documentation: completed maintenance work order with details of work performed, test certificates/records confirming correct operation, cancelled permit to work signed by both issuer and recipient, confirmation that all safety devices and interlocks have been tested and verified operative, and formal acceptance by operations. This documented handover protects both the maintenance team and operations.',
    section: 'Handovers',
    difficulty: 'intermediate',
    topic: 'Safety-Critical Handover',
    category: 'Documentation',
  },
  {
    id: 117,
    question:
      'What is the purpose of a technical file or O&M manual for an electrical installation?',
    options: [
      'To record only the commercial cost of the installation for the client&rsquo;s accounts',
      'To provide all the information needed to safely operate, maintain and modify it',
      'To list only the names and contact details of the contractors who did the work',
      'To provide marketing brochures for the equipment installed in the building',
    ],
    correctAnswer: 1,
    explanation:
      'An O&M (Operation and Maintenance) manual provides the comprehensive technical documentation needed for the safe and effective operation and maintenance of an installation throughout its life. It includes: as-built drawings, equipment data sheets, commissioning records, test certificates, maintenance schedules, spare parts lists, operating instructions, and safety information. Under CDM Regulations, the health and safety file serves a similar purpose.',
    section: 'Technical Documentation',
    difficulty: 'basic',
    topic: 'O&M Manuals',
    category: 'Documentation',
  },
  {
    id: 118,
    question:
      'Why is it important to update drawings and documentation after a modification to an electrical installation?',
    options: [
      'Because the original designer must be paid a fee each time the drawing is reissued',
      'Because building regulations require drawings to be redrawn every twelve months',
      'So the documentation matches the actual installation for safe future work',
      'Because the drawing software automatically deletes any drawing not updated regularly',
    ],
    correctAnswer: 2,
    explanation:
      'Outdated documentation is a significant safety risk. If drawings do not reflect modifications, maintenance technicians may: isolate the wrong circuit, not be aware of new sources of supply, use incorrect cable routes, or apply incorrect settings. All modifications must be marked up on as-built drawings (red-line mark-ups) and then formally updated. Document control procedures should ensure only the latest revision is in use.',
    section: 'Technical Documentation',
    difficulty: 'basic',
    topic: 'Drawing Updates',
    category: 'Documentation',
  },
  {
    id: 119,
    question: 'What is the purpose of a method statement for an electrical maintenance task?',
    options: [
      'To provide a tabulated list of every cable involved in the maintenance task',
      'To record the test results obtained after the maintenance work is finished',
      'To set the planned dates and intervals for routine maintenance of the asset',
      'To set out step-by-step how the work is done, with hazards and controls at each stage',
    ],
    correctAnswer: 3,
    explanation:
      'A method statement (also called a safe system of work or SSOW) describes the step-by-step procedure for carrying out a task safely. It identifies: the scope of work, hazards and controls at each step, PPE requirements, isolation and LOTO requirements, personnel and competencies required, tools and equipment needed, emergency procedures, and environmental considerations. It is a key document for high-risk maintenance work.',
    section: 'Technical Documentation',
    difficulty: 'basic',
    topic: 'Method Statements',
    category: 'Documentation',
  },
  {
    id: 120,
    question:
      "A maintenance technician is working from a control panel schematic and notices that the drawing revision is 'Rev C' but the panel has components that do not match the drawing. What should the technician do?",
    options: [
      'Stop work, check for a later revision and report the discrepancy before relying on it',
      'Continue working from the Rev C drawing and assume the panel components are wrong',
      'Modify the panel components on site so they match the existing Rev C drawing',
      'Amend the Rev C drawing in pencil to match the panel and carry on without reporting it',
    ],
    correctAnswer: 0,
    explanation:
      'A discrepancy between a drawing and the actual installation is a potential safety risk. The technician should stop work and establish the correct status: check whether a later revision exists that reflects the modifications, verify the actual installation against any available documentation, and report the discrepancy so that the drawings can be formally updated. Working from inaccurate drawings can lead to incorrect isolation, wrong connections, or missed hazards.',
    section: 'Technical Documentation',
    difficulty: 'intermediate',
    topic: 'Document Control',
    category: 'Documentation',
  },
];
