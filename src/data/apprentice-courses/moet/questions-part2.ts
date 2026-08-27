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
    question: 'What is the primary function of a circuit breaker in an HV substation?',
    options: [
      'To step the voltage down from transmission level to distribution level for local supply',
      'To interrupt fault current and isolate sections of the network under both normal and abnormal conditions',
      'To correct the power factor of the network by switching in capacitor banks',
      'To provide a means of frequently switching the motor on and off under control of external signals (start/stop, PLC output)',
    ],
    correctAnswer: 1,
    explanation:
      'A circuit breaker is a switching device designed to make, carry, and break current under normal conditions, and to interrupt fault current under abnormal conditions (such as short circuits). In HV substations, circuit breakers use arc-quenching media such as SF6 gas, vacuum, or oil to extinguish the arc formed when interrupting high fault currents.',
    section: 'Switchgear',
    difficulty: 'basic',
    topic: 'Circuit Breakers',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 42,
    question: 'What is the purpose of interlocking on switchgear panels?',
    options: [
      'To improve the power factor of the connected load and reduce energy losses',
      'To limit the prospective fault current that the switchgear must be able to interrupt',
      'To prevent dangerous switching sequences and ensure safe operating procedures are followed',
      'To provide automatic changeover to a standby supply when the main supply fails',
    ],
    correctAnswer: 2,
    explanation:
      'Interlocking on switchgear prevents dangerous operating sequences. For example, a circuit breaker interlock may prevent the panel door from being opened while the breaker is in the closed (ON) position, or prevent an earth switch from being closed while the main circuit breaker is closed. This is a critical safety feature that must be maintained and never bypassed.',
    section: 'Switchgear',
    difficulty: 'intermediate',
    topic: 'Interlocking',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 43,
    question:
      'In an 11 kV/400 V distribution substation, what type of transformer cooling is most commonly used for indoor installations up to 1000 kVA?',
    options: [
      'Oil-filled naturally cooled (ONAN)',
      'Water-cooled transformer',
      'Forced air cooled (OFAF)',
      'Cast resin dry-type transformer',
    ],
    correctAnswer: 3,
    explanation:
      'Cast resin dry-type transformers are preferred for indoor installations as they eliminate the fire risk associated with oil-filled transformers and do not require oil containment (bunding). They use epoxy resin encapsulated windings with natural air cooling (AN). Oil-filled transformers (ONAN) are more commonly used for outdoor installations.',
    section: 'Substations',
    difficulty: 'intermediate',
    topic: 'Transformer Types',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 44,
    question:
      "What does the term 'fault level' (or prospective fault current) mean at a point in an electrical distribution system?",
    options: [
      'The maximum current that would flow in the event of a short circuit at that point',
      'The maximum continuous load current the circuit is designed to carry under normal use',
      'The rated current at which the upstream protective device is set to trip on overload',
      'The leakage current flowing to earth under healthy (no-fault) operating conditions',
    ],
    correctAnswer: 0,
    explanation:
      'The fault level (prospective fault current or prospective short circuit current - PSCC) is the maximum current that would flow if a short circuit occurred at that point. It depends on the source impedance (transformer rating, cable lengths/sizes upstream). All switchgear must have a rated short circuit capacity equal to or greater than the fault level at its point of installation.',
    section: 'Switchgear',
    difficulty: 'intermediate',
    topic: 'Fault Level',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 45,
    question: 'What is the function of a bus-section switch in a main switchboard?',
    options: [
      'To limit the prospective fault current available at each outgoing way, so that smaller and cheaper protective devices can be used on the board',
      'To divide the busbars into sections, allowing part of the board to be isolated for maintenance while maintaining supply to other sections',
      'To correct the overall power factor of the loads on the switchboard, by switching capacitor stages in and out as demand varies',
      'To provide the overcurrent and short-circuit protection for every individual outgoing circuit, and for the incoming supply to the switchboard',
    ],
    correctAnswer: 1,
    explanation:
      'A bus-section switch (or bus coupler) divides the busbar system into independent sections. This allows maintenance to be carried out on one section while the other remains energised and supplying loads. In dual-supply configurations, it also enables automatic changeover between normal and standby supplies.',
    section: 'Switchgear',
    difficulty: 'intermediate',
    topic: 'Switchboard Design',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 46,
    question: 'What is the purpose of Buchholz relay fitted to an oil-filled power transformer?',
    options: [
      'To regulate the secondary output voltage by automatically operating the tap changer as the load on the transformer varies',
      'To cool the transformer oil by circulating it through the external radiator banks whenever the winding temperature rises',
      'To detect internal faults by monitoring gas accumulation and oil surge caused by arcing or overheating within the transformer',
      'To provide overcurrent protection by tripping the transformer when the secondary load exceeds the rated full-load current',
    ],
    correctAnswer: 2,
    explanation:
      'A Buchholz relay is a gas and oil-actuated protection device fitted in the pipe between the transformer tank and the conservator. Minor faults cause slow gas accumulation (alarm stage), while major faults cause a rapid oil surge (trip stage). It detects internal faults such as winding insulation breakdown, core faults, and tap changer failures.',
    section: 'Substations',
    difficulty: 'advanced',
    topic: 'Transformer Protection',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 47,
    question:
      'What is the minimum safe working distance (approach distance) for an unqualified person near 11 kV exposed live conductors?',
    options: [
      '0.5 metres',
      '1.2 metres',
      '5 metres',
      '3 metres',
    ],
    correctAnswer: 3,
    explanation:
      'For 11 kV systems, the safe approach distance for unqualified (untrained) persons is typically 3 metres as specified in ENA TS 43-8. Authorised persons working under formal safety rules may work closer with appropriate precautions. These distances are critical for maintenance technicians who may work in areas adjacent to HV equipment.',
    section: 'Substations',
    difficulty: 'intermediate',
    topic: 'Safe Distances',
    category: 'Electrical Plant & Systems',
  },

  // Motor Starters, VSDs & Control Panels (Questions 48-54)
  {
    id: 48,
    question: 'What is the purpose of a star-delta starter for a three-phase induction motor?',
    options: [
      'To reduce the starting current to approximately one-third of the DOL starting current by initially connecting windings in star, then switching to delta',
      'To raise the starting torque well above the direct-on-line value, by connecting the windings in delta first and then switching to star',
      'To vary the motor speed continuously, by adjusting the frequency of the supply to the stator once the windings have been switched from star into delta for running',
      'To reverse the direction of rotation of the motor, by swapping two of the three supply phases as the starter changes over from star into delta at the end of the timed period',
    ],
    correctAnswer: 0,
    explanation:
      'A star-delta starter reduces the starting current by initially connecting the motor windings in star configuration, which applies only 1/root(3) of the line voltage to each winding. This reduces the starting current to approximately one-third of the DOL value. After a timed delay, the windings are reconnected in delta for normal running at full voltage.',
    section: 'Motor Starters',
    difficulty: 'intermediate',
    topic: 'Star-Delta Starting',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 49,
    question: 'A variable speed drive (VSD) controls motor speed by varying which parameters?',
    options: [
      'The supply voltage alone (a rising V/Hz ratio at 50 Hz)',
      'Frequency and voltage (V/f ratio) of the supply to the motor',
      'The winding resistance of the stator and rotor (ohms/phase)',
      'The number of stator pole pairs (p) and hence the rev/min',
    ],
    correctAnswer: 1,
    explanation:
      'A VSD (also called a variable frequency drive or inverter) converts the fixed-frequency mains supply to a variable frequency and voltage output. By maintaining a constant voltage-to-frequency (V/f) ratio, the motor operates with approximately constant flux and torque capability across the speed range. Modern VSDs use PWM (pulse width modulation) techniques.',
    section: 'VSDs',
    difficulty: 'intermediate',
    topic: 'VSD Operation',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 50,
    question: 'What potential issue can VSDs cause on the electrical supply network?',
    options: [
      'A permanent rise in the supply frequency across the whole installation caused by the inverter output',
      'A leading power factor at the supply transformer that drives the busbar voltage above its rated value',
      'Harmonic distortion of the supply waveform due to the non-linear nature of the rectifier input stage',
      'A reduction in the prospective fault current available at the main switchboard feeding the drive',
    ],
    correctAnswer: 2,
    explanation:
      'VSDs draw non-sinusoidal current from the supply due to the six-pulse rectifier at the input stage. This generates harmonic currents (particularly 5th, 7th, 11th, 13th) which distort the supply voltage waveform. Mitigation measures include line reactors, DC link chokes, active front ends, or harmonic filters. Excessive harmonics can cause overheating of transformers and nuisance tripping of sensitive equipment.',
    section: 'VSDs',
    difficulty: 'advanced',
    topic: 'Harmonics',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 51,
    question: 'In a motor control centre (MCC), what is the function of a contactor?',
    options: [
      'To interrupt the high prospective short-circuit fault current (Ipf) of the motor circuit, without help from any upstream fuse/MCCB',
      'To protect the motor windings from a sustained overload, by opening the circuit when the current exceeds the set full-load current (FLC/FLA)',
      'To vary the speed of the driven motor, by adjusting the supply frequency (V/f control) delivered to its stator windings',
      'To provide a means of frequently switching the motor on and off under control of external signals (start/stop, PLC output)',
    ],
    correctAnswer: 3,
    explanation:
      'A contactor is an electromechanically operated switch designed for frequent switching of motor circuits. It is controlled by the coil voltage (typically 24 V DC, 110 V AC, or 230 V AC) which can be energised by push buttons, PLC outputs, or other control signals. Contactors differ from circuit breakers in that they are designed for frequent operation but not for interrupting fault current.',
    section: 'Motor Starters',
    difficulty: 'basic',
    topic: 'Contactors',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 52,
    question: 'What is the purpose of an overload relay in a motor starter?',
    options: [
      'To protect the motor windings from damage caused by sustained overcurrent (overload) conditions',
      'To interrupt the high fault current (Ipf) that flows during a short circuit at the motor terminals',
      'To provide isolation (secure lock-off) of the motor circuit for safe maintenance',
      'To smooth the motor starting current by ramping the voltage up gradually (soft start)',
    ],
    correctAnswer: 0,
    explanation:
      "An overload relay protects the motor against sustained overcurrent (overload) conditions that would cause the motor windings to overheat and potentially suffer insulation failure. Overload relays are set to the motor's full load current (FLC) and have an inverse time characteristic - the higher the overload, the faster they trip. They do not protect against short circuits; that is the function of fuses or MCCBs.",
    section: 'Motor Starters',
    difficulty: 'basic',
    topic: 'Overload Protection',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 53,
    question:
      "A VSD displays an 'overcurrent' fault during motor acceleration. What is the most likely cause?",
    options: [
      'The deceleration ramp time is set too long, causing the DC bus voltage to rise above its trip threshold',
      'The acceleration time is set too short for the mechanical load, or there is a mechanical seizure',
      'The motor is lightly loaded, and is running well below its rated full-load current on all three phases',
      'The supply frequency is too high, causing the motor to overspeed as it starts against the load inertia',
    ],
    correctAnswer: 1,
    explanation:
      'An overcurrent fault during acceleration typically indicates that the VSD is being asked to accelerate the motor faster than the available current limit allows. The most common causes are: acceleration ramp time set too short for the load inertia, a mechanical jam or seizure, or incorrect motor parameters in the VSD. The solution is to increase the acceleration time or investigate the mechanical load.',
    section: 'VSDs',
    difficulty: 'intermediate',
    topic: 'VSD Fault Finding',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 54,
    question:
      'What type of control panel enclosure rating would be required for a motor starter installed in a washdown area of a food processing plant?',
    options: [
      'IP20 or IP21',
      'IP54 or IP55',
      'IP65 or IP66',
      'IP00 or IP10',
    ],
    correctAnswer: 2,
    explanation:
      'Washdown areas in food processing plants require enclosures rated to IP65 (dust tight, protected against water jets from any direction) or IP66 (dust tight, protected against powerful water jets). The IP rating is defined by BS EN 60529. IP65/66 enclosures prevent ingress of water during cleaning operations which typically involve high-pressure hoses and chemical cleaning agents.',
    section: 'Control Panels',
    difficulty: 'intermediate',
    topic: 'IP Ratings',
    category: 'Electrical Plant & Systems',
  },

  // Lighting, UPS & Renewables (Questions 55-60)
  {
    id: 55,
    question:
      'What is the purpose of an uninterruptible power supply (UPS) in a critical installation?',
    options: [
      'To correct the power factor of the critical load, so that less reactive power is drawn from the incoming mains supply',
      'To step the incoming supply voltage up or down, so that it always matches the rated input voltage of the equipment',
      'To provide the overcurrent and earth fault protection for every critical load circuit, in place of the distribution board',
      'To provide continuous, conditioned power to critical loads during mains supply disturbances or failure, with no break in supply',
    ],
    correctAnswer: 3,
    explanation:
      'A UPS provides continuous power to critical loads (servers, control systems, medical equipment) by conditioning the mains supply and providing battery backup during outages. Online (double conversion) UPS systems provide seamless switchover with zero transfer time. The battery provides power for a defined autonomy period (typically 10-30 minutes) until a standby generator starts or normal supply is restored.',
    section: 'UPS',
    difficulty: 'basic',
    topic: 'UPS Function',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 56,
    question:
      'What type of UPS topology provides the highest level of protection with zero transfer time?',
    options: [
      'Online double-conversion UPS',
      'Line-interactive UPS with an automatic voltage regulator',
      'Offline standby UPS with a mechanical transfer switch',
      'Rotary UPS with a short break while the flywheel runs up',
    ],
    correctAnswer: 0,
    explanation:
      'An online double-conversion UPS continuously converts AC mains to DC (rectifier) and back to AC (inverter). The load is always supplied from the inverter, providing zero transfer time, voltage regulation, frequency regulation, and isolation from mains disturbances. If the mains fails, the DC bus is seamlessly supplied by the battery with no interruption to the output.',
    section: 'UPS',
    difficulty: 'intermediate',
    topic: 'UPS Topology',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 57,
    question:
      'A maintenance technician is required to replace a fluorescent luminaire with an LED equivalent. What important consideration must be addressed regarding the control gear?',
    options: [
      'The supply voltage must be reduced to 110 V at a site transformer, before an LED luminaire can be connected to the circuit',
      'The existing fluorescent ballast must be bypassed or removed, and the circuit verified for compatibility with the LED driver',
      'A dedicated radial circuit must be installed for every individual LED luminaire, each with its own protective device',
      'The lighting circuit must be converted from an AC supply to a DC supply, to suit the rectifier stage in the LED driver',
    ],
    correctAnswer: 1,
    explanation:
      'When retrofitting LED luminaires in place of fluorescent fittings, the existing magnetic or electronic ballast is generally incompatible with LED operation. The ballast must typically be bypassed or removed and the luminaire circuit rewired for direct mains connection or connection to the integral LED driver. This work must be carried out by a competent person and recorded on an electrical installation minor works certificate.',
    section: 'Lighting',
    difficulty: 'intermediate',
    topic: 'LED Retrofit',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 58,
    question:
      'Under BS 5266, what is the minimum rated duration for maintained emergency escape lighting in most premises?',
    options: [
      '1 hour',
      '30 minutes',
      '3 hours',
      '8 hours',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266-1 specifies that emergency escape lighting should have a minimum rated duration of 3 hours for most premises. In some cases, such as sleeping accommodation, 3 hours is mandatory. For premises where evacuation is expected to be rapid (such as cinemas), 1 hour may be acceptable. The 3-hour requirement ensures sufficient illumination for evacuation and for essential safety operations.',
    section: 'Lighting',
    difficulty: 'intermediate',
    topic: 'Emergency Lighting',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 59,
    question:
      'What safety measure is required before working on a photovoltaic (PV) solar panel system?',
    options: [
      'Isolate the AC side at the inverter alone (AC isolator only), because the DC side is made safe automatically as soon as the inverter stops exporting to the grid',
      'Cover the array with an opaque sheet (blackout cover), because this removes the DC voltage at the panel terminals and makes the whole string safe to touch',
      'Wait until after dark (no daylight) and then work on the array, because a PV panel cannot produce a hazardous DC voltage once the daylight has gone',
      'Isolate both the DC side (PV array isolator) and AC side (inverter and AC isolator), and be aware that PV panels generate DC voltage whenever exposed to light',
    ],
    correctAnswer: 3,
    explanation:
      'PV panels generate DC voltage whenever exposed to light, and this cannot be switched off. Safe working requires isolation of both the DC side (PV array isolator at the panels and at the inverter DC input) and the AC side (inverter and AC isolator). Even after isolation, the DC cables between panels and the DC isolator may still be live. Opaque covers may reduce but not eliminate the voltage.',
    section: 'Renewables',
    difficulty: 'intermediate',
    topic: 'PV Safety',
    category: 'Electrical Plant & Systems',
  },
  {
    id: 60,
    question:
      'What is the purpose of an anti-islanding protection system on a grid-connected inverter?',
    options: [
      'To ensure the inverter disconnects from the grid when the mains supply fails, preventing back-feeding of the network',
      'To maximise the power exported, by continuously tracking the peak power point of the PV array as the irradiance changes',
      'To correct the power factor of the exported supply, so that it matches the requirement set by the network operator',
      'To protect the PV array against overvoltage, caused by lightning strikes or by switching surges on the grid',
    ],
    correctAnswer: 0,
    explanation:
      "Anti-islanding protection (as required by G99 or G98 for UK grid-connected installations) ensures that the inverter automatically disconnects from the grid when the mains supply fails. This prevents the inverter from 'back-feeding' into the de-energised network, which would create a serious danger to network engineers who may be working on what they believe to be a dead circuit.",
    section: 'Renewables',
    difficulty: 'advanced',
    topic: 'Grid Connection',
    category: 'Electrical Plant & Systems',
  },

  // ============================================================
  // MODULE 4: MAINTENANCE & FAULT DIAGNOSIS (Questions 61-80)
  // ============================================================

  // PPM & Condition Monitoring (Questions 61-67)
  {
    id: 61,
    question:
      'What is the primary difference between planned preventive maintenance (PPM) and reactive maintenance?',
    options: [
      'PPM is carried out only by external specialist contractors under contract, while reactive maintenance is always handled by the in-house maintenance team',
      'PPM is scheduled maintenance carried out at predetermined intervals to prevent failures, while reactive maintenance responds to breakdowns after they occur',
      'PPM is triggered by condition-monitoring readings taken on the plant, while reactive maintenance follows a fixed time-based schedule of routine inspection tasks',
      'PPM applies only to mechanical plant such as pumps and gearboxes, while reactive maintenance applies only to electrical plant such as motors, drives and switchgear',
    ],
    correctAnswer: 1,
    explanation:
      'Planned preventive maintenance (PPM) is a proactive strategy where maintenance activities are scheduled at predetermined intervals (time-based or usage-based) to prevent failures and maintain equipment reliability. Reactive (breakdown) maintenance responds to failures after they occur. A balanced maintenance strategy typically combines PPM with condition-based and reactive approaches.',
    section: 'Maintenance Strategy',
    difficulty: 'basic',
    topic: 'PPM vs Reactive',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 62,
    question:
      'Infrared thermography is a condition monitoring technique used in electrical maintenance. What type of faults can it typically detect?',
    options: [
      'Internal winding insulation breakdown, incipient turn-to-turn shorts, and other faults not yet producing surface heat',
      'Loose mechanical fixings, structural cracks in an enclosure, and misalignment between a motor and its driven load',
      'Loose connections, overloaded circuits, unbalanced phases, and failing components identified by abnormal temperature rise',
      'Harmonic distortion of the supply waveform, voltage notching, and flicker caused by the drives on the switchboard',
    ],
    correctAnswer: 2,
    explanation:
      'Infrared (IR) thermography detects abnormal heat patterns that indicate potential problems. In electrical systems, hot spots typically indicate: loose or high-resistance connections, overloaded conductors, unbalanced phase loads, failing components (capacitors, fuses, breakers), and poor contact surfaces. It is a non-invasive technique that can be performed while equipment is energised.',
    section: 'Condition Monitoring',
    difficulty: 'intermediate',
    topic: 'Thermography',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 63,
    question:
      'What does vibration analysis typically indicate when monitoring rotating electrical machinery?',
    options: [
      'Gradual degradation of the stator winding insulation, and moisture ingress over the working life of the machine',
      'Loose or high-resistance electrical connections, inside the terminal box and at the incoming cable glands',
      'Excessive leakage current flowing to earth from the stator windings, and the resulting fall in the insulation readings',
      'Mechanical issues such as bearing wear, misalignment, unbalance, looseness, and electrical faults such as rotor bar defects',
    ],
    correctAnswer: 3,
    explanation:
      'Vibration analysis is a powerful condition monitoring technique for rotating machinery. Different fault types produce characteristic vibration signatures: imbalance (1x shaft speed), misalignment (2x shaft speed), bearing defects (specific frequencies related to bearing geometry), looseness (multiple harmonics), and electrical faults such as broken rotor bars (sidebands around electrical frequencies).',
    section: 'Condition Monitoring',
    difficulty: 'intermediate',
    topic: 'Vibration Analysis',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 64,
    question:
      'What is the recommended minimum insulation resistance value for a motor with a rated voltage of 400 V, according to BS 7671 and IEC 60364?',
    options: [
      '1 megohm',
      '0.5 megohm',
      '2 megohm',
      '0.25 megohm',
    ],
    correctAnswer: 0,
    explanation:
      'For circuits up to and including 500 V (other than SELV/PELV), which includes 400 V motors, BS 7671 Table 64 specifies a minimum insulation resistance of 1.0 megohm when tested at 500 V DC. In practice, a healthy motor should have a much higher insulation resistance, and values approaching the minimum should be investigated as a sign of insulation degradation.',
    section: 'Testing',
    difficulty: 'intermediate',
    topic: 'Insulation Resistance',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 65,
    question: 'What is condition-based maintenance (CBM)?',
    options: [
      'Maintenance activities carried out strictly at fixed calendar intervals, regardless of the measured condition of the individual item of equipment served',
      'Maintenance activities triggered by the actual measured condition of the equipment, using monitoring techniques to determine when maintenance is needed',
      'Maintenance activities performed once the equipment has already broken down, restoring it to service as quickly as the spares allow',
      'Maintenance activities limited to a complete overhaul of every item of plant, carried out during a single annual shutdown of the whole production facility',
    ],
    correctAnswer: 1,
    explanation:
      'Condition-based maintenance (CBM) uses monitoring and diagnostic techniques (vibration analysis, thermography, oil analysis, insulation testing) to assess the actual condition of equipment and determine when maintenance intervention is needed. CBM optimises maintenance timing - avoiding unnecessary maintenance on healthy equipment while intervening before failure occurs.',
    section: 'Maintenance Strategy',
    difficulty: 'basic',
    topic: 'CBM',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 66,
    question:
      'A motor insulation resistance test shows a reading that has been steadily declining over successive tests from 50 megohm to 5 megohm over two years. The motor has not yet failed. What action should be taken?',
    options: [
      'Leave the motor in service and take no further action, as 5 megohm is still well above the 1 megohm minimum for a machine of this rating',
      'Run the motor through to failure and replace it then, since insulation trends cannot predict a breakdown',
      'Schedule the motor for rewinding or replacement during the next planned shutdown, and increase monitoring frequency',
      'Reduce the test voltage used at the next test, so that the recorded reading is brought back above 50 megohm',
    ],
    correctAnswer: 2,
    explanation:
      'A steadily declining insulation resistance indicates progressive deterioration of the motor winding insulation. While 5 megohm is still above the minimum 1 megohm value, the trend is more significant than any single reading. The motor should be scheduled for rewinding or replacement during the next convenient planned shutdown, and the monitoring frequency should be increased to track any accelerated deterioration.',
    section: 'Condition Monitoring',
    difficulty: 'advanced',
    topic: 'Trend Analysis',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 67,
    question:
      'What is the purpose of oil analysis as a condition monitoring technique for oil-filled transformers?',
    options: [
      'To top up the oil level in the tank, and so restore the dielectric strength of the insulation to the value stated by the maker',
      'To measure the secondary output voltage of the transformer as the load varies, confirming that the tap changer has been set correctly for the site conditions',
      'To monitor the operating temperature of the windings and the core, so that the cooling fans and oil pumps are started at the correct moment as the load rises',
      'To detect degradation products, moisture content, dissolved gases, and contaminants that indicate the condition of the insulation system and internal faults',
    ],
    correctAnswer: 3,
    explanation:
      'Transformer oil analysis includes: dissolved gas analysis (DGA) to detect internal arcing, overheating, and partial discharge; moisture content measurement; dielectric breakdown voltage testing; acidity testing; and particle counting. Each dissolved gas type (hydrogen, acetylene, methane, ethylene) indicates specific fault types, making DGA a powerful diagnostic tool.',
    section: 'Condition Monitoring',
    difficulty: 'advanced',
    topic: 'Oil Analysis',
    category: 'Maintenance & Fault Diagnosis',
  },

  // Fault Finding, Repair & Testing (Questions 68-74)
  {
    id: 68,
    question:
      'A three-phase motor fails to start. The overload relay has not tripped and the contactor is not pulling in. What is the logical first step in fault diagnosis?',
    options: [
      'Check the control circuit: verify the control supply is present, check start/stop buttons, check for open circuits in the control wiring and safety interlocks',
      'Strip and rewind the motor straight away, because a contactor that fails to pull in shows the stator windings have gone open circuit at the star/delta links',
      'Replace all three of the main power fuses first, because blown power fuses are by far the most likely reason a motor will not start on a DOL/star-delta starter',
      'Measure the earth fault loop impedance Zs/Ze at the motor terminals before making any other check, since this proves the supply is healthy',
    ],
    correctAnswer: 0,
    explanation:
      'Since the contactor is not pulling in, the fault is most likely in the control circuit rather than the power circuit. Logical fault finding follows a systematic approach: start with the simplest and most accessible checks. Verify control supply voltage, check push button operation, check for open circuits in interlock chains (safety switches, pressure/temperature trips), and check the contactor coil and overload relay contact.',
    section: 'Fault Finding',
    difficulty: 'intermediate',
    topic: 'Systematic Fault Finding',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 69,
    question:
      'When measuring earth fault loop impedance (Zs) on a circuit, what does a high reading indicate?',
    options: [
      'The insulation resistance of the circuit has fallen too low, and the cable must be replaced before the circuit is re-energised',
      'The earth fault path has high impedance, which may prevent the protective device from operating within the required disconnection time',
      'The prospective short-circuit current at the distribution board is dangerously high, and exceeds the breaking capacity of the device',
      'The protective device is oversized for the circuit it protects, and will trip whenever the normal load current is drawn',
    ],
    correctAnswer: 1,
    explanation:
      'A high earth fault loop impedance (Zs) means that in the event of an earth fault, the fault current flowing may be insufficient to operate the protective device (fuse or circuit breaker) within the maximum disconnection time required by BS 7671. This could be caused by a poor earth connection, damaged earth conductor, high-resistance joint, or an incorrectly sized earth conductor.',
    section: 'Testing',
    difficulty: 'intermediate',
    topic: 'Earth Loop Impedance',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 70,
    question: 'What is the half-split method of fault finding?',
    options: [
      'Testing every component in turn, from the supply end towards the load end, until the faulty item is finally reached',
      'Replacing each suspect component one at a time, and re-energising the equipment after every change until it works correctly again without further fault',
      'Testing at the midpoint of a system or circuit to determine which half contains the fault, then repeating to narrow down the fault location',
      'Dividing the circuit permanently into two halves, each protected by its own device, so that any fault can affect only one half of the installation',
    ],
    correctAnswer: 2,
    explanation:
      'The half-split (or binary search) method is an efficient fault-finding technique where you test at the midpoint of a circuit or system. The result tells you which half contains the fault. You then test at the midpoint of the faulty half, and repeat until the fault is isolated. This method minimises the number of tests needed, reducing downtime. It is particularly effective for series circuits and long cable runs.',
    section: 'Fault Finding',
    difficulty: 'basic',
    topic: 'Fault Finding Methods',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 71,
    question:
      'After replacing a faulty component in a motor starter, what tests should be performed before returning the equipment to service?',
    options: [
      'Visual inspection and functional test alone, since the replacement component was supplied new and had already been tested and certified by the manufacturer before dispatch',
      'Visual inspection alone before energising and handing back to operations, with all further testing left until the next planned maintenance visit',
      'A continuity check on the replaced conductors alone, since the original fault has been removed and the starter is known to have worked correctly before',
      'Visual inspection, continuity check, insulation resistance test, functional test, and confirmation that all safety interlocks and protection are operative',
    ],
    correctAnswer: 3,
    explanation:
      'Before returning repaired equipment to service, a comprehensive set of checks must be completed: visual inspection (correct component, secure connections, no damage), continuity of protective conductors, insulation resistance testing, functional testing (correct operation under control), verification that all safety interlocks and protective devices are in place and operative. These checks should be recorded on the maintenance work order.',
    section: 'Repair',
    difficulty: 'intermediate',
    topic: 'Return to Service',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 72,
    question:
      'A lighting circuit keeps tripping the RCD. The fault is intermittent. What is the most effective approach to identify the faulty circuit?',
    options: [
      'Systematically disconnect sections of the circuit and monitor to identify which section causes the tripping, then inspect that section for damaged insulation, moisture ingress, or faulty fittings',
      'Replace the residual current device with a higher-rated unit so that the standing leakage of the lighting circuit no longer reaches the tripping threshold, and record the change on the work order',
      'Bypass the residual current device with a temporary link so that the lighting stays on, then wait for the intermittent fault to become permanent before beginning any investigation of the circuit',
      'Increase the rating of the upstream circuit breaker so that it will carry more current, which stops the residual current device downstream from tripping whenever leakage occurs on the lighting circuit',
    ],
    correctAnswer: 0,
    explanation:
      'An intermittent RCD trip on a lighting circuit typically indicates an insulation breakdown that occurs under certain conditions (heat, vibration, moisture). The systematic approach is to disconnect sections of the circuit one at a time and monitor for the fault. Once the faulty section is identified, inspect for damaged cable insulation, moisture ingress into fittings, or faulty luminaires. Never bypass an RCD as it provides essential protection.',
    section: 'Fault Finding',
    difficulty: 'intermediate',
    topic: 'Intermittent Faults',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 73,
    question: 'What is the purpose of a loop impedance test on a final circuit?',
    options: [
      'To confirm that the insulation resistance between the live conductors and earth is high enough to meet the minimum value given in Table 64 of BS 7671',
      'To verify that the earth fault loop impedance is low enough to ensure the protective device will operate within the required disconnection time specified in BS 7671',
      'To measure the continuity of the circuit protective conductor from the distribution board out to the furthest point of the circuit and record the measured value in ohms',
      'To check that the residual current device protecting the circuit disconnects within the operating time specified in BS 7671 for its rated residual operating current and type',
    ],
    correctAnswer: 1,
    explanation:
      'The earth fault loop impedance test measures the total impedance of the earth fault path from the point of measurement, through the protective conductor, back through the source (transformer). This value (Zs) must be low enough that, in the event of an earth fault, sufficient current flows to operate the protective device within the maximum disconnection time specified in BS 7671 (0.4s for final circuits up to 63 A in TN systems).',
    section: 'Testing',
    difficulty: 'intermediate',
    topic: 'Loop Impedance Purpose',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 74,
    question:
      'A three-phase motor is running but drawing significantly more current on one phase than the other two. What is the most likely cause?',
    options: [
      'The motor is correctly loaded, and a current difference of this size is normal and expected in service',
      'The supply frequency has drifted slightly above its nominal 50 Hz value, raising the current in one phase',
      'A single-phasing condition or winding fault on one phase, or a supply voltage imbalance',
      'The motor is running unloaded, and is drawing only its no-load magnetising current on that phase',
    ],
    correctAnswer: 2,
    explanation:
      'Unbalanced phase currents in a three-phase motor can be caused by: a developing winding fault (inter-turn short circuit) on one phase, single-phasing (loss of one supply phase causing the motor to try to run on two phases), high-resistance connection on one phase, or supply voltage imbalance. A current imbalance greater than 5% should be investigated, as it indicates a potentially serious fault that could lead to motor failure.',
    section: 'Fault Finding',
    difficulty: 'advanced',
    topic: 'Phase Imbalance',
    category: 'Maintenance & Fault Diagnosis',
  },

  // RCA & RCM (Questions 75-80)
  {
    id: 75,
    question: 'What is root cause analysis (RCA) in the context of maintenance engineering?',
    options: [
      'A structured process for restoring a failed asset to service in the shortest possible time, once a breakdown has been reported to the maintenance team',
      'A programme of routine inspections carried out at fixed calendar intervals, in order to catch failures on the plant as they develop into breakdowns',
      'A technique for ranking spare parts by their purchase cost, so that the most expensive items are always the ones held in the stores and reordered first',
      'A systematic process for identifying the fundamental underlying cause of a failure, not just the immediate symptoms, to prevent recurrence',
    ],
    correctAnswer: 3,
    explanation:
      'Root cause analysis (RCA) is a structured problem-solving methodology that looks beyond the immediate (proximate) cause of a failure to identify the fundamental root cause. Techniques include the 5 Whys, fishbone (Ishikawa) diagrams, and fault tree analysis. By addressing root causes rather than symptoms, recurrence of the failure is prevented, improving overall equipment reliability.',
    section: 'RCA',
    difficulty: 'basic',
    topic: 'RCA Principles',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 76,
    question: "In reliability-centred maintenance (RCM), what is a 'failure mode'?",
    options: [
      'The specific way in which a component or system can fail to perform its required function',
      'The total cost incurred by the business each time a particular asset fails in normal service',
      'The average time taken by the maintenance team to repair a failed component and return it to duty',
      'The probability that a given asset will operate without any failure over a set period of time',
    ],
    correctAnswer: 0,
    explanation:
      'In RCM analysis, a failure mode is the specific way in which a component, system, or process can fail to meet its required function. For example, a motor bearing could fail by: seizure due to lack of lubrication, fatigue spalling of the rolling elements, or contamination. Each failure mode has its own causes, effects, and appropriate maintenance strategy.',
    section: 'RCM',
    difficulty: 'intermediate',
    topic: 'Failure Modes',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 77,
    question:
      'A motor bearing failure keeps recurring every 6 months despite being replaced each time. Using the 5 Whys technique, what approach should be taken?',
    options: [
      'Fit a higher-specification bearing at each replacement, and accept that the six-monthly failures will continue until the motor is replaced',
      "Ask 'why' repeatedly to trace back from the bearing failure to identify the root cause, such as misalignment, incorrect lubrication, or shaft current damage",
      'Shorten the replacement interval to three months, so that the bearing is always changed out before it can reach the point of failure',
      'Replace the complete motor at the next failure instead of the bearing, so that the new machine starts its life with a complete set of new bearings fitted',
    ],
    correctAnswer: 1,
    explanation:
      'The 5 Whys technique traces back from the symptom to the root cause. For example: Why did the bearing fail? Excessive wear. Why excessive wear? Contamination. Why contamination? Seal failure. Why seal failure? Incorrect seal type for the operating environment. Why incorrect seal type? Specification not reviewed during last replacement. The root cause is a process failure in specification, not the bearing itself.',
    section: 'RCA',
    difficulty: 'intermediate',
    topic: '5 Whys Method',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 78,
    question: 'What does MTBF (Mean Time Between Failures) represent?',
    options: [
      'The average time taken to repair a piece of equipment once it has failed, expressed in hours per repair',
      'The total number of failures recorded against an asset over its working life, whatever their cause',
      'The average time a piece of equipment operates between failures, used as a measure of reliability',
      'The maximum time a piece of equipment can be left out of service, before it must be scrapped and replaced',
    ],
    correctAnswer: 2,
    explanation:
      'MTBF (Mean Time Between Failures) is a measure of reliability that represents the average operating time between failures of repairable equipment. A higher MTBF indicates more reliable equipment. It is used in conjunction with MTTR (Mean Time To Repair) to calculate equipment availability: Availability = MTBF / (MTBF + MTTR). Both metrics are key performance indicators (KPIs) for maintenance departments.',
    section: 'RCM',
    difficulty: 'intermediate',
    topic: 'Reliability Metrics',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 79,
    question:
      'What is the purpose of a failure mode and effects analysis (FMEA) in maintenance planning?',
    options: [
      'To record the actual labour and parts cost of every breakdown, so that the annual maintenance budget can be set from historical spending',
      'To rank completed work orders by the time each one took, so that the performance of individual technicians can be appraised at review',
      'To schedule the routine replacement of every component at fixed calendar intervals, so that no part is ever left in service beyond its stated design life',
      'To systematically identify potential failure modes, assess their effects and severity, and determine appropriate maintenance or design actions to mitigate them',
    ],
    correctAnswer: 3,
    explanation:
      'FMEA is a systematic, proactive methodology that identifies potential failure modes for each component or system, assesses the severity of their effects, estimates the likelihood of occurrence, and evaluates the ability to detect the failure before it causes harm. Each failure mode is assigned a Risk Priority Number (RPN = Severity x Occurrence x Detection) to prioritise corrective actions.',
    section: 'RCM',
    difficulty: 'advanced',
    topic: 'FMEA',
    category: 'Maintenance & Fault Diagnosis',
  },
  {
    id: 80,
    question:
      'A maintenance team is reviewing their strategy for a critical production line. Which of the following describes a reliability-centred maintenance (RCM) approach?',
    options: [
      'Selecting the most appropriate maintenance strategy for each failure mode based on its consequences and the ability to predict or prevent it',
      'Applying the same fixed time-based replacement schedule uniformly to every asset on the production line whatever its duty or criticality may be',
      'Running every item on the line through to failure and then repairing it as quickly as the available spares and labour will allow on the day of the breakdown',
      'Choosing the maintenance tasks for each asset solely from its purchase cost with the most expensive items of plant maintained most often of all',
    ],
    correctAnswer: 0,
    explanation:
      'RCM is a structured framework for determining the most effective maintenance strategy for each asset based on its functions, failure modes, and the consequences of failure. It may result in different strategies for different failure modes: condition-based monitoring for critical predictable failures, time-based replacement for age-related failures, run-to-failure for non-critical items, and design changes for unacceptable failure modes.',
    section: 'RCM',
    difficulty: 'intermediate',
    topic: 'RCM Strategy',
    category: 'Maintenance & Fault Diagnosis',
  },
];
