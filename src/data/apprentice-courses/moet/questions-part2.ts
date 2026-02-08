// MOET Level 3 - Maintenance & Operations Engineering Technician (ST1426)
// Electrical Engineering Maintenance Technician Pathway
// Questions Part 2: Module 3 (Electrical Plant & Systems) and Module 4 (Maintenance & Fault Diagnosis)
// Questions 41-80

import type { StandardMockQuestion } from '@/types/standardMockExam';

export const questionsPart2: StandardMockQuestion[] = [
  // ============================================================
  // MODULE 3: ELECTRICAL PLANT & SYSTEMS (Questions 41-60)
  // ============================================================

  // Switchgear & Substations (Questions 41-47)
  {
    id: 41,
    question: "What is the primary function of a circuit breaker in an HV substation?",
    options: [
      "To regulate voltage output",
      "To interrupt fault current and isolate sections of the network under both normal and abnormal conditions",
      "To convert AC to DC",
      "To monitor energy consumption"
    ],
    correctAnswer: 1,
    explanation: "A circuit breaker is a switching device designed to make, carry, and break current under normal conditions, and to interrupt fault current under abnormal conditions (such as short circuits). In HV substations, circuit breakers use arc-quenching media such as SF6 gas, vacuum, or oil to extinguish the arc formed when interrupting high fault currents.",
    section: "Switchgear",
    difficulty: "basic",
    topic: "Circuit Breakers",
    category: "Electrical Plant & Systems"
  },
  {
    id: 42,
    question: "What is the purpose of interlocking on switchgear panels?",
    options: [
      "To prevent unauthorised access to the building",
      "To prevent dangerous switching sequences and ensure safe operating procedures are followed",
      "To synchronise multiple generators",
      "To improve the power factor of the installation"
    ],
    correctAnswer: 1,
    explanation: "Interlocking on switchgear prevents dangerous operating sequences. For example, a circuit breaker interlock may prevent the panel door from being opened while the breaker is in the closed (ON) position, or prevent an earth switch from being closed while the main circuit breaker is closed. This is a critical safety feature that must be maintained and never bypassed.",
    section: "Switchgear",
    difficulty: "intermediate",
    topic: "Interlocking",
    category: "Electrical Plant & Systems"
  },
  {
    id: 43,
    question: "In an 11 kV/400 V distribution substation, what type of transformer cooling is most commonly used for indoor installations up to 1000 kVA?",
    options: [
      "Oil-filled naturally cooled (ONAN)",
      "Cast resin dry-type transformer",
      "Forced air cooled (OFAF)",
      "Water-cooled transformer"
    ],
    correctAnswer: 1,
    explanation: "Cast resin dry-type transformers are preferred for indoor installations as they eliminate the fire risk associated with oil-filled transformers and do not require oil containment (bunding). They use epoxy resin encapsulated windings with natural air cooling (AN). Oil-filled transformers (ONAN) are more commonly used for outdoor installations.",
    section: "Substations",
    difficulty: "intermediate",
    topic: "Transformer Types",
    category: "Electrical Plant & Systems"
  },
  {
    id: 44,
    question: "What does the term 'fault level' (or prospective fault current) mean at a point in an electrical distribution system?",
    options: [
      "The normal operating current at that point",
      "The maximum current that would flow in the event of a short circuit at that point",
      "The current at which protective devices trip",
      "The leakage current to earth at that point"
    ],
    correctAnswer: 1,
    explanation: "The fault level (prospective fault current or prospective short circuit current - PSCC) is the maximum current that would flow if a short circuit occurred at that point. It depends on the source impedance (transformer rating, cable lengths/sizes upstream). All switchgear must have a rated short circuit capacity equal to or greater than the fault level at its point of installation.",
    section: "Switchgear",
    difficulty: "intermediate",
    topic: "Fault Level",
    category: "Electrical Plant & Systems"
  },
  {
    id: 45,
    question: "What is the function of a bus-section switch in a main switchboard?",
    options: [
      "To connect the switchboard to the incoming supply",
      "To divide the busbars into sections, allowing part of the board to be isolated for maintenance while maintaining supply to other sections",
      "To measure the busbar voltage",
      "To connect power factor correction capacitors"
    ],
    correctAnswer: 1,
    explanation: "A bus-section switch (or bus coupler) divides the busbar system into independent sections. This allows maintenance to be carried out on one section while the other remains energised and supplying loads. In dual-supply configurations, it also enables automatic changeover between normal and standby supplies.",
    section: "Switchgear",
    difficulty: "intermediate",
    topic: "Switchboard Design",
    category: "Electrical Plant & Systems"
  },
  {
    id: 46,
    question: "What is the purpose of Buchholz relay fitted to an oil-filled power transformer?",
    options: [
      "To regulate the output voltage",
      "To detect internal faults by monitoring gas accumulation and oil surge caused by arcing or overheating within the transformer",
      "To measure the oil temperature only",
      "To control the cooling fans"
    ],
    correctAnswer: 1,
    explanation: "A Buchholz relay is a gas and oil-actuated protection device fitted in the pipe between the transformer tank and the conservator. Minor faults cause slow gas accumulation (alarm stage), while major faults cause a rapid oil surge (trip stage). It detects internal faults such as winding insulation breakdown, core faults, and tap changer failures.",
    section: "Substations",
    difficulty: "advanced",
    topic: "Transformer Protection",
    category: "Electrical Plant & Systems"
  },
  {
    id: 47,
    question: "What is the minimum safe working distance (approach distance) for an unqualified person near 11 kV exposed live conductors?",
    options: [
      "0.5 metres",
      "1.2 metres",
      "3 metres",
      "5 metres"
    ],
    correctAnswer: 2,
    explanation: "For 11 kV systems, the safe approach distance for unqualified (untrained) persons is typically 3 metres as specified in ENA TS 43-8. Authorised persons working under formal safety rules may work closer with appropriate precautions. These distances are critical for maintenance technicians who may work in areas adjacent to HV equipment.",
    section: "Substations",
    difficulty: "intermediate",
    topic: "Safe Distances",
    category: "Electrical Plant & Systems"
  },

  // Motor Starters, VSDs & Control Panels (Questions 48-54)
  {
    id: 48,
    question: "What is the purpose of a star-delta starter for a three-phase induction motor?",
    options: [
      "To reverse the motor direction",
      "To reduce the starting current to approximately one-third of the DOL starting current by initially connecting windings in star, then switching to delta",
      "To vary the motor speed continuously",
      "To improve the power factor during running"
    ],
    correctAnswer: 1,
    explanation: "A star-delta starter reduces the starting current by initially connecting the motor windings in star configuration, which applies only 1/root(3) of the line voltage to each winding. This reduces the starting current to approximately one-third of the DOL value. After a timed delay, the windings are reconnected in delta for normal running at full voltage.",
    section: "Motor Starters",
    difficulty: "intermediate",
    topic: "Star-Delta Starting",
    category: "Electrical Plant & Systems"
  },
  {
    id: 49,
    question: "A variable speed drive (VSD) controls motor speed by varying which parameters?",
    options: [
      "Supply voltage only",
      "Frequency and voltage (V/f ratio) of the supply to the motor",
      "The number of motor poles",
      "The motor winding resistance"
    ],
    correctAnswer: 1,
    explanation: "A VSD (also called a variable frequency drive or inverter) converts the fixed-frequency mains supply to a variable frequency and voltage output. By maintaining a constant voltage-to-frequency (V/f) ratio, the motor operates with approximately constant flux and torque capability across the speed range. Modern VSDs use PWM (pulse width modulation) techniques.",
    section: "VSDs",
    difficulty: "intermediate",
    topic: "VSD Operation",
    category: "Electrical Plant & Systems"
  },
  {
    id: 50,
    question: "What potential issue can VSDs cause on the electrical supply network?",
    options: [
      "Reduced voltage on the supply",
      "Harmonic distortion of the supply waveform due to the non-linear nature of the rectifier input stage",
      "Increased supply frequency",
      "Reduced fault level"
    ],
    correctAnswer: 1,
    explanation: "VSDs draw non-sinusoidal current from the supply due to the six-pulse rectifier at the input stage. This generates harmonic currents (particularly 5th, 7th, 11th, 13th) which distort the supply voltage waveform. Mitigation measures include line reactors, DC link chokes, active front ends, or harmonic filters. Excessive harmonics can cause overheating of transformers and nuisance tripping of sensitive equipment.",
    section: "VSDs",
    difficulty: "advanced",
    topic: "Harmonics",
    category: "Electrical Plant & Systems"
  },
  {
    id: 51,
    question: "In a motor control centre (MCC), what is the function of a contactor?",
    options: [
      "To provide overload protection for the motor",
      "To provide a means of frequently switching the motor on and off under control of external signals (start/stop, PLC output)",
      "To limit the short circuit current",
      "To measure the motor current"
    ],
    correctAnswer: 1,
    explanation: "A contactor is an electromechanically operated switch designed for frequent switching of motor circuits. It is controlled by the coil voltage (typically 24 V DC, 110 V AC, or 230 V AC) which can be energised by push buttons, PLC outputs, or other control signals. Contactors differ from circuit breakers in that they are designed for frequent operation but not for interrupting fault current.",
    section: "Motor Starters",
    difficulty: "basic",
    topic: "Contactors",
    category: "Electrical Plant & Systems"
  },
  {
    id: 52,
    question: "What is the purpose of an overload relay in a motor starter?",
    options: [
      "To protect the motor from short circuit faults",
      "To protect the motor windings from damage caused by sustained overcurrent (overload) conditions",
      "To regulate the motor speed",
      "To provide earth fault protection"
    ],
    correctAnswer: 1,
    explanation: "An overload relay protects the motor against sustained overcurrent (overload) conditions that would cause the motor windings to overheat and potentially suffer insulation failure. Overload relays are set to the motor's full load current (FLC) and have an inverse time characteristic - the higher the overload, the faster they trip. They do not protect against short circuits; that is the function of fuses or MCCBs.",
    section: "Motor Starters",
    difficulty: "basic",
    topic: "Overload Protection",
    category: "Electrical Plant & Systems"
  },
  {
    id: 53,
    question: "A VSD displays an 'overcurrent' fault during motor acceleration. What is the most likely cause?",
    options: [
      "The supply voltage is too high",
      "The acceleration time is set too short for the mechanical load, or there is a mechanical seizure",
      "The motor is running too slowly",
      "The ambient temperature is too low"
    ],
    correctAnswer: 1,
    explanation: "An overcurrent fault during acceleration typically indicates that the VSD is being asked to accelerate the motor faster than the available current limit allows. The most common causes are: acceleration ramp time set too short for the load inertia, a mechanical jam or seizure, or incorrect motor parameters in the VSD. The solution is to increase the acceleration time or investigate the mechanical load.",
    section: "VSDs",
    difficulty: "intermediate",
    topic: "VSD Fault Finding",
    category: "Electrical Plant & Systems"
  },
  {
    id: 54,
    question: "What type of control panel enclosure rating would be required for a motor starter installed in a washdown area of a food processing plant?",
    options: [
      "IP20",
      "IP54",
      "IP65 or IP66",
      "IP00"
    ],
    correctAnswer: 2,
    explanation: "Washdown areas in food processing plants require enclosures rated to IP65 (dust tight, protected against water jets from any direction) or IP66 (dust tight, protected against powerful water jets). The IP rating is defined by BS EN 60529. IP65/66 enclosures prevent ingress of water during cleaning operations which typically involve high-pressure hoses and chemical cleaning agents.",
    section: "Control Panels",
    difficulty: "intermediate",
    topic: "IP Ratings",
    category: "Electrical Plant & Systems"
  },

  // Lighting, UPS & Renewables (Questions 55-60)
  {
    id: 55,
    question: "What is the purpose of an uninterruptible power supply (UPS) in a critical installation?",
    options: [
      "To generate electricity from renewable sources",
      "To provide continuous, conditioned power to critical loads during mains supply disturbances or failure, with no break in supply",
      "To reduce the electricity consumption of the building",
      "To provide emergency lighting only"
    ],
    correctAnswer: 1,
    explanation: "A UPS provides continuous power to critical loads (servers, control systems, medical equipment) by conditioning the mains supply and providing battery backup during outages. Online (double conversion) UPS systems provide seamless switchover with zero transfer time. The battery provides power for a defined autonomy period (typically 10-30 minutes) until a standby generator starts or normal supply is restored.",
    section: "UPS",
    difficulty: "basic",
    topic: "UPS Function",
    category: "Electrical Plant & Systems"
  },
  {
    id: 56,
    question: "What type of UPS topology provides the highest level of protection with zero transfer time?",
    options: [
      "Offline (standby) UPS",
      "Line-interactive UPS",
      "Online double-conversion UPS",
      "Rotary UPS"
    ],
    correctAnswer: 2,
    explanation: "An online double-conversion UPS continuously converts AC mains to DC (rectifier) and back to AC (inverter). The load is always supplied from the inverter, providing zero transfer time, voltage regulation, frequency regulation, and isolation from mains disturbances. If the mains fails, the DC bus is seamlessly supplied by the battery with no interruption to the output.",
    section: "UPS",
    difficulty: "intermediate",
    topic: "UPS Topology",
    category: "Electrical Plant & Systems"
  },
  {
    id: 57,
    question: "A maintenance technician is required to replace a fluorescent luminaire with an LED equivalent. What important consideration must be addressed regarding the control gear?",
    options: [
      "LED luminaires always use the same control gear as fluorescent",
      "The existing fluorescent ballast must be bypassed or removed, and the circuit verified for compatibility with the LED driver",
      "No changes to wiring are ever required",
      "LED luminaires do not require any driver or control gear"
    ],
    correctAnswer: 1,
    explanation: "When retrofitting LED luminaires in place of fluorescent fittings, the existing magnetic or electronic ballast is generally incompatible with LED operation. The ballast must typically be bypassed or removed and the luminaire circuit rewired for direct mains connection or connection to the integral LED driver. This work must be carried out by a competent person and recorded on an electrical installation minor works certificate.",
    section: "Lighting",
    difficulty: "intermediate",
    topic: "LED Retrofit",
    category: "Electrical Plant & Systems"
  },
  {
    id: 58,
    question: "Under BS 5266, what is the minimum rated duration for maintained emergency escape lighting in most premises?",
    options: [
      "1 hour",
      "3 hours",
      "30 minutes",
      "8 hours"
    ],
    correctAnswer: 1,
    explanation: "BS 5266-1 specifies that emergency escape lighting should have a minimum rated duration of 3 hours for most premises. In some cases, such as sleeping accommodation, 3 hours is mandatory. For premises where evacuation is expected to be rapid (such as cinemas), 1 hour may be acceptable. The 3-hour requirement ensures sufficient illumination for evacuation and for essential safety operations.",
    section: "Lighting",
    difficulty: "intermediate",
    topic: "Emergency Lighting",
    category: "Electrical Plant & Systems"
  },
  {
    id: 59,
    question: "What safety measure is required before working on a photovoltaic (PV) solar panel system?",
    options: [
      "Simply switch off the AC isolator and begin work",
      "Isolate both the DC side (PV array isolator) and AC side (inverter and AC isolator), and be aware that PV panels generate DC voltage whenever exposed to light",
      "Cover the panels with a tarpaulin and begin work",
      "Only work at night when panels are not generating"
    ],
    correctAnswer: 1,
    explanation: "PV panels generate DC voltage whenever exposed to light, and this cannot be switched off. Safe working requires isolation of both the DC side (PV array isolator at the panels and at the inverter DC input) and the AC side (inverter and AC isolator). Even after isolation, the DC cables between panels and the DC isolator may still be live. Opaque covers may reduce but not eliminate the voltage.",
    section: "Renewables",
    difficulty: "intermediate",
    topic: "PV Safety",
    category: "Electrical Plant & Systems"
  },
  {
    id: 60,
    question: "What is the purpose of an anti-islanding protection system on a grid-connected inverter?",
    options: [
      "To prevent the inverter from overheating",
      "To ensure the inverter disconnects from the grid when the mains supply fails, preventing back-feeding of the network",
      "To maximise the energy output of the PV system",
      "To regulate the battery charging current"
    ],
    correctAnswer: 1,
    explanation: "Anti-islanding protection (as required by G99 or G98 for UK grid-connected installations) ensures that the inverter automatically disconnects from the grid when the mains supply fails. This prevents the inverter from 'back-feeding' into the de-energised network, which would create a serious danger to network engineers who may be working on what they believe to be a dead circuit.",
    section: "Renewables",
    difficulty: "advanced",
    topic: "Grid Connection",
    category: "Electrical Plant & Systems"
  },

  // ============================================================
  // MODULE 4: MAINTENANCE & FAULT DIAGNOSIS (Questions 61-80)
  // ============================================================

  // PPM & Condition Monitoring (Questions 61-67)
  {
    id: 61,
    question: "What is the primary difference between planned preventive maintenance (PPM) and reactive maintenance?",
    options: [
      "PPM is more expensive and less effective",
      "PPM is scheduled maintenance carried out at predetermined intervals to prevent failures, while reactive maintenance responds to breakdowns after they occur",
      "Reactive maintenance is always the preferred strategy",
      "PPM only applies to mechanical equipment"
    ],
    correctAnswer: 1,
    explanation: "Planned preventive maintenance (PPM) is a proactive strategy where maintenance activities are scheduled at predetermined intervals (time-based or usage-based) to prevent failures and maintain equipment reliability. Reactive (breakdown) maintenance responds to failures after they occur. A balanced maintenance strategy typically combines PPM with condition-based and reactive approaches.",
    section: "Maintenance Strategy",
    difficulty: "basic",
    topic: "PPM vs Reactive",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 62,
    question: "Infrared thermography is a condition monitoring technique used in electrical maintenance. What type of faults can it typically detect?",
    options: [
      "Insulation resistance faults only",
      "Loose connections, overloaded circuits, unbalanced phases, and failing components identified by abnormal temperature rise",
      "Earth fault loop impedance issues",
      "Harmonic distortion problems"
    ],
    correctAnswer: 1,
    explanation: "Infrared (IR) thermography detects abnormal heat patterns that indicate potential problems. In electrical systems, hot spots typically indicate: loose or high-resistance connections, overloaded conductors, unbalanced phase loads, failing components (capacitors, fuses, breakers), and poor contact surfaces. It is a non-invasive technique that can be performed while equipment is energised.",
    section: "Condition Monitoring",
    difficulty: "intermediate",
    topic: "Thermography",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 63,
    question: "What does vibration analysis typically indicate when monitoring rotating electrical machinery?",
    options: [
      "Only the speed of the machine",
      "Mechanical issues such as bearing wear, misalignment, unbalance, looseness, and electrical faults such as rotor bar defects",
      "The power consumption of the machine",
      "The insulation condition of the windings"
    ],
    correctAnswer: 1,
    explanation: "Vibration analysis is a powerful condition monitoring technique for rotating machinery. Different fault types produce characteristic vibration signatures: imbalance (1x shaft speed), misalignment (2x shaft speed), bearing defects (specific frequencies related to bearing geometry), looseness (multiple harmonics), and electrical faults such as broken rotor bars (sidebands around electrical frequencies).",
    section: "Condition Monitoring",
    difficulty: "intermediate",
    topic: "Vibration Analysis",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 64,
    question: "What is the recommended minimum insulation resistance value for a motor with a rated voltage of 400 V, according to BS 7671 and IEC 60364?",
    options: [
      "0.5 megohm",
      "1 megohm",
      "2 megohm",
      "0.25 megohm"
    ],
    correctAnswer: 1,
    explanation: "For circuits with a rated voltage above 120 V DC or 50 V AC up to 500 V (which includes 400 V motors), BS 7671 Table 6.1 specifies a minimum insulation resistance of 1 megohm when tested at 500 V DC. In practice, a healthy motor should have a much higher insulation resistance. Values approaching the minimum should be investigated as an indication of insulation degradation.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Insulation Resistance",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 65,
    question: "What is condition-based maintenance (CBM)?",
    options: [
      "Maintenance carried out on a fixed calendar schedule regardless of equipment condition",
      "Maintenance activities triggered by the actual measured condition of the equipment, using monitoring techniques to determine when maintenance is needed",
      "Maintenance only performed when equipment has completely failed",
      "Maintenance based solely on manufacturer recommendations"
    ],
    correctAnswer: 1,
    explanation: "Condition-based maintenance (CBM) uses monitoring and diagnostic techniques (vibration analysis, thermography, oil analysis, insulation testing) to assess the actual condition of equipment and determine when maintenance intervention is needed. CBM optimises maintenance timing - avoiding unnecessary maintenance on healthy equipment while intervening before failure occurs.",
    section: "Maintenance Strategy",
    difficulty: "basic",
    topic: "CBM",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 66,
    question: "A motor insulation resistance test shows a reading that has been steadily declining over successive tests from 50 megohm to 5 megohm over two years. The motor has not yet failed. What action should be taken?",
    options: [
      "No action needed as the value is still above the minimum",
      "Schedule the motor for rewinding or replacement during the next planned shutdown, and increase monitoring frequency",
      "Replace the motor immediately as it has failed",
      "Increase the applied test voltage to get a higher reading"
    ],
    correctAnswer: 1,
    explanation: "A steadily declining insulation resistance indicates progressive deterioration of the motor winding insulation. While 5 megohm is still above the minimum 1 megohm value, the trend is more significant than any single reading. The motor should be scheduled for rewinding or replacement during the next convenient planned shutdown, and the monitoring frequency should be increased to track any accelerated deterioration.",
    section: "Condition Monitoring",
    difficulty: "advanced",
    topic: "Trend Analysis",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 67,
    question: "What is the purpose of oil analysis as a condition monitoring technique for oil-filled transformers?",
    options: [
      "To check the oil level only",
      "To detect degradation products, moisture content, dissolved gases, and contaminants that indicate the condition of the insulation system and internal faults",
      "To determine the transformer's power rating",
      "To measure the transformer's efficiency"
    ],
    correctAnswer: 1,
    explanation: "Transformer oil analysis includes: dissolved gas analysis (DGA) to detect internal arcing, overheating, and partial discharge; moisture content measurement; dielectric breakdown voltage testing; acidity testing; and particle counting. Each dissolved gas type (hydrogen, acetylene, methane, ethylene) indicates specific fault types, making DGA a powerful diagnostic tool.",
    section: "Condition Monitoring",
    difficulty: "advanced",
    topic: "Oil Analysis",
    category: "Maintenance & Fault Diagnosis"
  },

  // Fault Finding, Repair & Testing (Questions 68-74)
  {
    id: 68,
    question: "A three-phase motor fails to start. The overload relay has not tripped and the contactor is not pulling in. What is the logical first step in fault diagnosis?",
    options: [
      "Replace the motor immediately",
      "Check the control circuit: verify the control supply is present, check start/stop buttons, check for open circuits in the control wiring and safety interlocks",
      "Measure the insulation resistance of the motor",
      "Check the supply voltage at the main switchboard"
    ],
    correctAnswer: 1,
    explanation: "Since the contactor is not pulling in, the fault is most likely in the control circuit rather than the power circuit. Logical fault finding follows a systematic approach: start with the simplest and most accessible checks. Verify control supply voltage, check push button operation, check for open circuits in interlock chains (safety switches, pressure/temperature trips), and check the contactor coil and overload relay contact.",
    section: "Fault Finding",
    difficulty: "intermediate",
    topic: "Systematic Fault Finding",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 69,
    question: "When measuring earth fault loop impedance (Zs) on a circuit, what does a high reading indicate?",
    options: [
      "The circuit is in perfect condition",
      "The earth fault path has high impedance, which may prevent the protective device from operating within the required disconnection time",
      "The circuit has a short circuit fault",
      "The RCD is faulty"
    ],
    correctAnswer: 1,
    explanation: "A high earth fault loop impedance (Zs) means that in the event of an earth fault, the fault current flowing may be insufficient to operate the protective device (fuse or circuit breaker) within the maximum disconnection time required by BS 7671. This could be caused by a poor earth connection, damaged earth conductor, high-resistance joint, or an incorrectly sized earth conductor.",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Earth Loop Impedance",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 70,
    question: "What is the half-split method of fault finding?",
    options: [
      "Splitting the maintenance team in half to cover more area",
      "Testing at the midpoint of a system or circuit to determine which half contains the fault, then repeating to narrow down the fault location",
      "Replacing half the components in a circuit",
      "Only testing during the first half of the shift"
    ],
    correctAnswer: 1,
    explanation: "The half-split (or binary search) method is an efficient fault-finding technique where you test at the midpoint of a circuit or system. The result tells you which half contains the fault. You then test at the midpoint of the faulty half, and repeat until the fault is isolated. This method minimises the number of tests needed, reducing downtime. It is particularly effective for series circuits and long cable runs.",
    section: "Fault Finding",
    difficulty: "basic",
    topic: "Fault Finding Methods",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 71,
    question: "After replacing a faulty component in a motor starter, what tests should be performed before returning the equipment to service?",
    options: [
      "No tests are needed after a like-for-like replacement",
      "Visual inspection, continuity check, insulation resistance test, functional test, and confirmation that all safety interlocks and protection are operative",
      "Only a visual inspection",
      "Only check that the motor runs"
    ],
    correctAnswer: 1,
    explanation: "Before returning repaired equipment to service, a comprehensive set of checks must be completed: visual inspection (correct component, secure connections, no damage), continuity of protective conductors, insulation resistance testing, functional testing (correct operation under control), verification that all safety interlocks and protective devices are in place and operative. These checks should be recorded on the maintenance work order.",
    section: "Repair",
    difficulty: "intermediate",
    topic: "Return to Service",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 72,
    question: "A lighting circuit keeps tripping the RCD. The fault is intermittent. What is the most effective approach to identify the faulty circuit?",
    options: [
      "Replace the RCD with a higher rated unit",
      "Systematically disconnect sections of the circuit and monitor to identify which section causes the tripping, then inspect that section for damaged insulation, moisture ingress, or faulty fittings",
      "Reset the RCD repeatedly until it holds",
      "Bypass the RCD to keep the lights on"
    ],
    correctAnswer: 1,
    explanation: "An intermittent RCD trip on a lighting circuit typically indicates an insulation breakdown that occurs under certain conditions (heat, vibration, moisture). The systematic approach is to disconnect sections of the circuit one at a time and monitor for the fault. Once the faulty section is identified, inspect for damaged cable insulation, moisture ingress into fittings, or faulty luminaires. Never bypass an RCD as it provides essential protection.",
    section: "Fault Finding",
    difficulty: "intermediate",
    topic: "Intermittent Faults",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 73,
    question: "What is the purpose of a loop impedance test on a final circuit?",
    options: [
      "To measure the resistance of the cable insulation",
      "To verify that the earth fault loop impedance is low enough to ensure the protective device will operate within the required disconnection time specified in BS 7671",
      "To check the circuit loading",
      "To measure the supply voltage"
    ],
    correctAnswer: 1,
    explanation: "The earth fault loop impedance test measures the total impedance of the earth fault path from the point of measurement, through the protective conductor, back through the source (transformer). This value (Zs) must be low enough that, in the event of an earth fault, sufficient current flows to operate the protective device within the maximum disconnection time specified in BS 7671 (0.4s for final circuits up to 63 A in TN systems).",
    section: "Testing",
    difficulty: "intermediate",
    topic: "Loop Impedance Purpose",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 74,
    question: "A three-phase motor is running but drawing significantly more current on one phase than the other two. What is the most likely cause?",
    options: [
      "The motor is overloaded",
      "A single-phasing condition or winding fault on one phase, or a supply voltage imbalance",
      "The motor is running at the wrong speed",
      "The starter overload is set incorrectly"
    ],
    correctAnswer: 1,
    explanation: "Unbalanced phase currents in a three-phase motor can be caused by: a developing winding fault (inter-turn short circuit) on one phase, single-phasing (loss of one supply phase causing the motor to try to run on two phases), high-resistance connection on one phase, or supply voltage imbalance. A current imbalance greater than 5% should be investigated, as it indicates a potentially serious fault that could lead to motor failure.",
    section: "Fault Finding",
    difficulty: "advanced",
    topic: "Phase Imbalance",
    category: "Maintenance & Fault Diagnosis"
  },

  // RCA & RCM (Questions 75-80)
  {
    id: 75,
    question: "What is root cause analysis (RCA) in the context of maintenance engineering?",
    options: [
      "Finding the cheapest way to repair a fault",
      "A systematic process for identifying the fundamental underlying cause of a failure, not just the immediate symptoms, to prevent recurrence",
      "Analysing the cost of spare parts",
      "Reviewing the maintenance budget"
    ],
    correctAnswer: 1,
    explanation: "Root cause analysis (RCA) is a structured problem-solving methodology that looks beyond the immediate (proximate) cause of a failure to identify the fundamental root cause. Techniques include the 5 Whys, fishbone (Ishikawa) diagrams, and fault tree analysis. By addressing root causes rather than symptoms, recurrence of the failure is prevented, improving overall equipment reliability.",
    section: "RCA",
    difficulty: "basic",
    topic: "RCA Principles",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 76,
    question: "In reliability-centred maintenance (RCM), what is a 'failure mode'?",
    options: [
      "The time at which equipment is expected to fail",
      "The specific way in which a component or system can fail to perform its required function",
      "The cost of a failure",
      "The warranty period for the equipment"
    ],
    correctAnswer: 1,
    explanation: "In RCM analysis, a failure mode is the specific way in which a component, system, or process can fail to meet its required function. For example, a motor bearing could fail by: seizure due to lack of lubrication, fatigue spalling of the rolling elements, or contamination. Each failure mode has its own causes, effects, and appropriate maintenance strategy.",
    section: "RCM",
    difficulty: "intermediate",
    topic: "Failure Modes",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 77,
    question: "A motor bearing failure keeps recurring every 6 months despite being replaced each time. Using the 5 Whys technique, what approach should be taken?",
    options: [
      "Accept that bearings need replacing every 6 months and schedule accordingly",
      "Ask 'why' repeatedly to trace back from the bearing failure to identify the root cause, such as misalignment, incorrect lubrication, or shaft current damage",
      "Install a higher-quality bearing",
      "Replace the motor with a new one"
    ],
    correctAnswer: 1,
    explanation: "The 5 Whys technique traces back from the symptom to the root cause. For example: Why did the bearing fail? Excessive wear. Why excessive wear? Contamination. Why contamination? Seal failure. Why seal failure? Incorrect seal type for the operating environment. Why incorrect seal type? Specification not reviewed during last replacement. The root cause is a process failure in specification, not the bearing itself.",
    section: "RCA",
    difficulty: "intermediate",
    topic: "5 Whys Method",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 78,
    question: "What does MTBF (Mean Time Between Failures) represent?",
    options: [
      "The average time taken to repair equipment after failure",
      "The average time a piece of equipment operates between failures, used as a measure of reliability",
      "The maximum time before maintenance is required",
      "The minimum time for a component to fail"
    ],
    correctAnswer: 1,
    explanation: "MTBF (Mean Time Between Failures) is a measure of reliability that represents the average operating time between failures of repairable equipment. A higher MTBF indicates more reliable equipment. It is used in conjunction with MTTR (Mean Time To Repair) to calculate equipment availability: Availability = MTBF / (MTBF + MTTR). Both metrics are key performance indicators (KPIs) for maintenance departments.",
    section: "RCM",
    difficulty: "intermediate",
    topic: "Reliability Metrics",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 79,
    question: "What is the purpose of a failure mode and effects analysis (FMEA) in maintenance planning?",
    options: [
      "To record the history of past failures only",
      "To systematically identify potential failure modes, assess their effects and severity, and determine appropriate maintenance or design actions to mitigate them",
      "To calculate the cost of spare parts",
      "To schedule overtime for maintenance staff"
    ],
    correctAnswer: 1,
    explanation: "FMEA is a systematic, proactive methodology that identifies potential failure modes for each component or system, assesses the severity of their effects, estimates the likelihood of occurrence, and evaluates the ability to detect the failure before it causes harm. Each failure mode is assigned a Risk Priority Number (RPN = Severity x Occurrence x Detection) to prioritise corrective actions.",
    section: "RCM",
    difficulty: "advanced",
    topic: "FMEA",
    category: "Maintenance & Fault Diagnosis"
  },
  {
    id: 80,
    question: "A maintenance team is reviewing their strategy for a critical production line. Which of the following describes a reliability-centred maintenance (RCM) approach?",
    options: [
      "Replacing all components at fixed intervals regardless of condition",
      "Selecting the most appropriate maintenance strategy for each failure mode based on its consequences and the ability to predict or prevent it",
      "Only repairing equipment when it breaks down",
      "Outsourcing all maintenance to a specialist contractor"
    ],
    correctAnswer: 1,
    explanation: "RCM is a structured framework for determining the most effective maintenance strategy for each asset based on its functions, failure modes, and the consequences of failure. It may result in different strategies for different failure modes: condition-based monitoring for critical predictable failures, time-based replacement for age-related failures, run-to-failure for non-critical items, and design changes for unacceptable failure modes.",
    section: "RCM",
    difficulty: "intermediate",
    topic: "RCM Strategy",
    category: "Maintenance & Fault Diagnosis"
  }
];
