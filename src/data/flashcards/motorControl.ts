import { FlashcardData } from './types';

export const motorControl: FlashcardData[] = [
  // === Motor Types (mc1–mc6) ===
  {
    id: 'mc1',
    question:
      'What is a three-phase squirrel cage induction motor, and why is it the most common industrial motor?',
    answer:
      'A squirrel cage induction motor has a rotor made of aluminium or copper bars short-circuited by end rings, resembling a cage. It is the most common industrial motor because it is robust, requires virtually no maintenance (no brushes or slip rings), is self-starting on three-phase supply, and is relatively inexpensive. It operates on the principle of a rotating magnetic field in the stator inducing current in the rotor bars.',
    category: 'Motor Types',
    difficulty: 'easy',
  },
  {
    id: 'mc2',
    question:
      'What is a wound rotor induction motor and what advantage does it have over a squirrel cage motor?',
    answer:
      'A wound rotor induction motor has rotor windings connected to external resistors via slip rings and brushes, rather than short-circuited bars. The key advantage is that the external resistance can be varied to control starting current and torque. This allows a high starting torque with reduced starting current, making it suitable for heavy-load applications such as cranes, hoists, and large compressors.',
    category: 'Motor Types',
    difficulty: 'medium',
  },
  {
    id: 'mc3',
    question: 'How does a capacitor-start single-phase motor achieve starting torque?',
    answer:
      'A capacitor-start motor uses an auxiliary winding in series with a capacitor to create a phase shift between the main and auxiliary winding currents. This produces a rotating magnetic field sufficient to generate starting torque. Once the motor reaches approximately 75% of full speed, a centrifugal switch disconnects the start winding and capacitor, and the motor continues running on the main winding alone.',
    category: 'Motor Types',
    difficulty: 'medium',
  },
  {
    id: 'mc4',
    question:
      'What is the difference between a capacitor-start motor and a capacitor-start-capacitor-run motor?',
    answer:
      'A capacitor-start motor uses a capacitor only during starting, which is then disconnected by a centrifugal switch. A capacitor-start-capacitor-run (CSCR) motor uses two capacitors: a larger electrolytic capacitor for starting (disconnected once running) and a smaller oil-filled capacitor that remains in circuit during running. The run capacitor improves power factor, efficiency, and reduces noise during normal operation.',
    category: 'Motor Types',
    difficulty: 'medium',
  },
  {
    id: 'mc5',
    question: 'How does a split-phase single-phase motor start, and what are its limitations?',
    answer:
      'A split-phase motor has two stator windings: a main (run) winding of thick wire with low resistance and high inductance, and an auxiliary (start) winding of thinner wire with higher resistance and lower inductance. The difference in impedance creates a small phase displacement between the two currents, producing a weak rotating field for starting. The start winding is disconnected by a centrifugal switch at about 75% speed. Its limitations are low starting torque and high starting current, making it suitable only for light-load applications such as fans and small pumps.',
    category: 'Motor Types',
    difficulty: 'medium',
  },
  {
    id: 'mc6',
    question: 'What information is found on a motor nameplate and why is each item important?',
    answer:
      'A motor nameplate typically shows: rated power (kW), rated voltage (e.g. 400 V), full-load current (A), speed (RPM), frequency (50 Hz), duty rating (e.g. S1 continuous), IP rating (ingress protection), insulation class (e.g. Class F = 155 degrees C maximum), efficiency class (e.g. IE3), power factor (cos phi), and frame size. This information is essential for correct cable sizing, protection device selection, starter specification, and ensuring the motor is suitable for its intended environment.',
    category: 'Motor Types',
    difficulty: 'easy',
  },

  // === Starting Methods (mc7–mc13) ===
  {
    id: 'mc7',
    question: 'What is Direct-On-Line (DOL) starting and what are its main components?',
    answer:
      'DOL starting connects the motor directly to the full supply voltage using a contactor controlled by start/stop push buttons. The main components are: a main contactor, a thermal overload relay, start (NO) and stop (NC) push buttons, and indicating lamps. DOL is the simplest and cheapest starting method, but it draws a very high starting current (typically 6 to 8 times full-load current), which can cause voltage dips on the supply.',
    category: 'Starting Methods',
    difficulty: 'easy',
  },
  {
    id: 'mc8',
    question: 'Explain how a holding circuit (self-latching contactor) works in a DOL starter.',
    answer:
      'When the start button (normally open) is pressed, current flows through the stop button (normally closed) and start button to energise the main contactor coil. An auxiliary contact on the contactor closes in parallel with the start button, maintaining the circuit after the start button is released. This is the holding or latching circuit. Pressing the stop button (NC) breaks the coil circuit, the contactor de-energises, the auxiliary contact opens, and the motor stops. The holding circuit also drops out on supply failure, providing no-volt protection.',
    category: 'Starting Methods',
    difficulty: 'easy',
  },
  {
    id: 'mc9',
    question: 'What is the purpose of star-delta starting and how does it reduce starting current?',
    answer:
      'Star-delta starting reduces the starting current to approximately one-third of the DOL starting current. The motor windings are first connected in star configuration, where each winding receives only 1/root3 (58%) of the line voltage, reducing the starting current by a factor of 3. After a timed period (typically 5 to 15 seconds), a timer switches the windings to delta configuration for full-voltage running. The motor must be designed for delta running at the supply voltage (i.e. a 400 V motor rated 400 V delta / 690 V star).',
    category: 'Starting Methods',
    difficulty: 'medium',
  },
  {
    id: 'mc10',
    question: 'Describe the switching sequence and key components in a star-delta starter.',
    answer:
      'The sequence is: 1) Press start - the star contactor and main contactor energise, connecting the motor windings in star. 2) A timer counts down (typically 5-15 seconds) while the motor accelerates. 3) When the timer expires, the star contactor opens and after a brief changeover delay (50-100 ms to avoid short circuit), the delta contactor closes. The key components are: three contactors (main, star, delta), a star-delta timer, a thermal overload relay, and start/stop push buttons. Both the star and delta contactors must be electrically and mechanically interlocked to prevent simultaneous operation.',
    category: 'Starting Methods',
    difficulty: 'hard',
  },
  {
    id: 'mc11',
    question: 'What is a soft starter and how does it control the starting of a motor?',
    answer:
      'A soft starter uses thyristors (back-to-back SCRs) on each phase to gradually increase the voltage applied to the motor during starting. By controlling the firing angle of the thyristors, the voltage ramps up smoothly from a low initial value to full supply voltage over an adjustable time period. This limits the starting current (typically to 2 to 4 times full-load current) and provides smooth, controlled acceleration without the mechanical shock and current transients of DOL or the voltage step of star-delta switching.',
    category: 'Starting Methods',
    difficulty: 'medium',
  },
  {
    id: 'mc12',
    question: 'What advantages does a soft starter have over star-delta starting?',
    answer:
      'A soft starter provides smooth, stepless voltage ramp-up rather than the abrupt star-to-delta transition, which eliminates the current spike during changeover. It offers adjustable starting current limit, adjustable ramp-up time, and soft-stop capability (gradual deceleration). It requires only three power cables to the motor (star-delta needs six), takes up less panel space, and does not cause the torque dip that occurs during star-delta changeover. It also provides better protection features such as phase loss, phase reversal, and motor stall detection.',
    category: 'Starting Methods',
    difficulty: 'hard',
  },
  {
    id: 'mc13',
    question: 'What is slip in an induction motor and how is it calculated?',
    answer:
      'Slip is the difference between the synchronous speed (Ns) of the rotating magnetic field and the actual rotor speed (Nr), expressed as a percentage. The formula is: Slip (%) = ((Ns - Nr) / Ns) x 100%. For example, a 4-pole motor on 50 Hz has a synchronous speed of 1500 RPM (Ns = 120f/p). If the rotor runs at 1450 RPM, the slip is ((1500 - 1450) / 1500) x 100% = 3.33%. Some slip is essential because without it, no current would be induced in the rotor and no torque would be produced.',
    category: 'Starting Methods',
    difficulty: 'easy',
  },

  // === Control Circuits (mc14–mc18) ===
  {
    id: 'mc14',
    question: 'How is forward/reverse motor control achieved and why is interlocking critical?',
    answer:
      "Forward/reverse control uses two contactors: one connects the motor for forward rotation and the other swaps any two phases to reverse it. Interlocking is critical to prevent both contactors closing simultaneously, which would cause a phase-to-phase short circuit. Interlocking is achieved by: electrical interlocking (each contactor's NC auxiliary contact is wired in series with the opposing contactor's coil circuit) and mechanical interlocking (a physical linkage prevents both contactors engaging at the same time). Both methods should be used together for safety.",
    category: 'Control Circuits',
    difficulty: 'hard',
  },
  {
    id: 'mc15',
    question: 'What is the role of auxiliary contacts on a contactor and how are they designated?',
    answer:
      'Auxiliary contacts are additional low-current contacts fitted to a contactor that change state when the main contacts operate. Normally open (NO) auxiliary contacts are used for holding circuits, indicator lamp control, and signalling to PLCs. Normally closed (NC) auxiliary contacts are used for interlocking and fault indication. They are typically designated by two-digit numbers: the first digit indicates the contact number and the second indicates the function (1-2 for NC, 3-4 for NO). For example, 13-14 is the first NO contact and 21-22 is the first NC contact.',
    category: 'Control Circuits',
    difficulty: 'medium',
  },
  {
    id: 'mc16',
    question:
      'Describe the function of each component in a basic DOL motor control circuit: start button, stop button, contactor, overload relay, and indicator lamps.',
    answer:
      'The start button (NO, momentary) initiates the circuit by energising the contactor coil. The stop button (NC, maintained or momentary) breaks the coil circuit to stop the motor. The contactor is an electromagnetically operated switch that connects and disconnects the motor from the supply via its main contacts, with auxiliary contacts for the holding circuit. The thermal overload relay monitors motor current and opens an NC contact in the control circuit if current exceeds the set value for a sustained period. Indicator lamps (typically green for running, red for stopped/tripped) show the motor status via auxiliary contacts.',
    category: 'Control Circuits',
    difficulty: 'medium',
  },
  {
    id: 'mc17',
    question: 'What are the requirements for emergency stop circuits according to BS EN 60204-1?',
    answer:
      'BS EN 60204-1 requires that emergency stop devices use normally closed (NC) contacts wired to open the circuit (break the control circuit) when activated. They must be coloured red with a yellow background, be mushroom-head type, and latch in the operated position requiring deliberate manual reset. Emergency stops must have priority over all other functions, must not impair the effectiveness of any safety function, and must be positioned at each operator station and at other locations where emergency stop is needed. Category 0 (immediate removal of power) or Category 1 (controlled stop then removal of power) may be specified depending on the application.',
    category: 'Control Circuits',
    difficulty: 'hard',
  },
  {
    id: 'mc18',
    question: 'What is the difference between a contactor and a relay in motor control circuits?',
    answer:
      'A contactor is a heavy-duty electromagnetically operated switch designed to carry and break high motor currents through its main contacts (typically rated from 9 A to several hundred amps at 400 V AC). A relay is a lighter-duty device used in control circuits for logic, signalling, and interlocking functions at low currents. In a motor control panel, contactors switch the motor power supply whilst relays handle the control logic. Contactors also include arc suppression features to handle the high inductive currents generated when switching motors.',
    category: 'Control Circuits',
    difficulty: 'easy',
  },

  // === Protection (mc19–mc23) ===
  {
    id: 'mc19',
    question: 'How does a thermal overload relay protect a motor and how is it set?',
    answer:
      "A thermal overload relay uses bimetallic strips or electronic sensing to detect sustained overcurrent. The bimetallic strips heat up and bend proportionally to the current flowing through them. When the current exceeds the set value for a sufficient time, the strips deflect enough to trip a mechanism that opens an NC contact in the control circuit, de-energising the contactor. The relay is set to the motor's full-load current (FLC) as stated on the nameplate. Most thermal overloads have a trip class (e.g. Class 10 trips within 10 seconds at 7.2 times setting), and must be reset manually or automatically after cooling.",
    category: 'Protection',
    difficulty: 'medium',
  },
  {
    id: 'mc20',
    question:
      'What is a Motor Circuit Breaker (MCCB) and what advantages does it offer for motor protection?',
    answer:
      'A motor circuit breaker (often a motor protection circuit breaker or MPCB) combines short-circuit protection and overload protection in a single device, replacing the need for separate fuses and thermal overload relays. It provides magnetic trip protection for short circuits and adjustable thermal trip protection for overloads. Advantages include: adjustable current range to match different motors, faster fault clearance, resettable without replacement (unlike fuses), visible trip indication, and often a rotary isolator function for local isolation. They are rated with an Icu breaking capacity suitable for motor circuits.',
    category: 'Protection',
    difficulty: 'medium',
  },
  {
    id: 'mc21',
    question:
      'Why must motor cable sizing account for starting current as well as running current?',
    answer:
      'Motor starting currents are typically 6 to 8 times the full-load current for DOL starting, and although this high current only lasts a few seconds, it causes significant voltage drop in the cable. Excessive voltage drop during starting can prevent the motor from accelerating to full speed, cause contactors to drop out due to low coil voltage, and affect other equipment on the same supply. Cable sizing must ensure that the voltage drop during starting does not exceed acceptable limits (typically 10-15% at the motor terminals during starting) whilst also being rated for continuous full-load current with appropriate derating factors applied.',
    category: 'Protection',
    difficulty: 'hard',
  },
  {
    id: 'mc22',
    question: 'What is the purpose of thermistor (PTC) motor protection and when is it used?',
    answer:
      'PTC (Positive Temperature Coefficient) thermistors are embedded directly in the motor stator windings during manufacture to monitor winding temperature. When the winding temperature exceeds the rated insulation class limit, the thermistor resistance increases sharply, triggering a dedicated thermistor relay to open the motor control circuit. This provides direct temperature protection regardless of the cause (overload, high ambient temperature, blocked ventilation, phase loss, or frequent starting). It is used on larger or critical motors where thermal overload relays alone may not provide adequate protection.',
    category: 'Protection',
    difficulty: 'hard',
  },
  {
    id: 'mc23',
    question:
      'What motor protection does a phase loss relay provide and why is single-phasing dangerous?',
    answer:
      'A phase loss relay monitors the three-phase supply and trips the motor contactor if any phase is lost. Single-phasing is dangerous because the motor attempts to continue running on only two phases, drawing excessive current in the remaining windings (up to 2.5 times normal current in those phases). This causes rapid overheating, insulation breakdown, and potential winding failure. Standard thermal overload relays may not detect single-phasing quickly enough because the total line current may not rise sufficiently to trip the relay before damage occurs.',
    category: 'Protection',
    difficulty: 'medium',
  },

  // === Variable Speed (mc24–mc28) ===
  {
    id: 'mc24',
    question: 'How does a Variable Frequency Drive (VFD/inverter) control motor speed?',
    answer:
      'A VFD converts the fixed-frequency 50 Hz mains supply into a variable-frequency, variable-voltage output. It works in three stages: a rectifier converts AC to DC, a DC bus with capacitors smooths the DC voltage, and an inverter section uses IGBTs (Insulated Gate Bipolar Transistors) to create a pulse-width modulated (PWM) AC output at the desired frequency. Since motor speed is proportional to supply frequency (Ns = 120f/p), varying the frequency directly controls the motor speed from near zero to above base speed.',
    category: 'Variable Speed',
    difficulty: 'medium',
  },
  {
    id: 'mc25',
    question: 'What is the V/f ratio in VFD operation and why must it be maintained?',
    answer:
      'The V/f (voltage-to-frequency) ratio means the VFD adjusts the output voltage in proportion to the output frequency. At 50 Hz the motor receives full voltage (e.g. 400 V), at 25 Hz it receives half voltage (200 V), and so on. This ratio must be maintained to keep the magnetic flux in the motor constant, which ensures consistent torque output across the speed range. If voltage is too high for the frequency, the motor draws excessive magnetising current and overheats. If voltage is too low, the motor produces reduced torque and may stall under load.',
    category: 'Variable Speed',
    difficulty: 'hard',
  },
  {
    id: 'mc26',
    question: 'What energy savings can a VFD provide on centrifugal fan and pump applications?',
    answer:
      'VFDs offer significant energy savings on centrifugal fans and pumps because power consumption follows the affinity laws: power is proportional to the cube of speed. This means reducing a fan or pump speed by just 20% reduces power consumption by approximately 49% (0.8 cubed = 0.512). Traditional methods of flow control such as throttling valves or dampers waste energy by creating resistance against a motor running at full speed. The payback period on a VFD installation for HVAC fans and pumps is often less than two years.',
    category: 'Variable Speed',
    difficulty: 'easy',
  },
  {
    id: 'mc27',
    question: 'What special considerations apply when installing cables between a VFD and a motor?',
    answer:
      'VFD output cables carry high-frequency PWM waveforms that generate significant electromagnetic interference (EMI). Key considerations are: use screened/shielded cable (e.g. SY cable or steel wire armoured with screen) with the screen earthed at both ends; keep VFD-to-motor cable runs as short as possible (long cables can cause voltage reflections that damage motor insulation); separate VFD output cables from signal and data cables by at least 300 mm; and consider fitting output chokes or dV/dt filters on long cable runs to reduce voltage spikes at the motor terminals. The cable screen must be connected using 360-degree clamps, not pigtails.',
    category: 'Variable Speed',
    difficulty: 'hard',
  },
  {
    id: 'mc28',
    question:
      'What is power factor correction and why is it particularly important for motor circuits?',
    answer:
      'Power factor correction involves adding capacitors to a circuit to compensate for the reactive (inductive) power drawn by motors. Induction motors typically have a power factor of 0.7 to 0.85 at full load, which drops further at light loads. Poor power factor means the supply must deliver more apparent power (kVA) than the real power (kW) being used, resulting in higher electricity charges (reactive power penalties), increased cable losses, and reduced supply capacity. Correction capacitors are connected in parallel with the motor and can be fitted individually at each motor or centrally at the main distribution board. Note that capacitors must not be connected on the load side of a VFD, as the high-frequency output would damage them.',
    category: 'Variable Speed',
    difficulty: 'easy',
  },
];
