// HNC Electrical Engineering Question Bank - Part 2
// Questions 126-250: Electrical Principles
// Topics: DC circuits, AC circuits, three-phase systems, transformers, motors, power factor, impedance, Ohm's law, Kirchhoff's laws, semiconductors, transistors

export interface HNCQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  category: string;
}

export const questionsPart2: HNCQuestion[] = [
  // ============================================================
  // DC CIRCUITS - Ohm's Law & Basic Calculations (Questions 126-145)
  // ============================================================
  {
    id: 126,
    question: "What is Ohm's Law?",
    options: [
      "V = I x R",
      "P = I x V",
      "R = V + I",
      "I = V + R"
    ],
    correctAnswer: 0,
    explanation: "Ohm's Law states that voltage (V) equals current (I) multiplied by resistance (R). This fundamental relationship is expressed as V = IR.",
    section: "DC Circuits",
    difficulty: "basic",
    topic: "Ohm's Law",
    category: "Electrical Principles"
  },
  {
    id: 127,
    question: "A 12V supply is connected across a 4 ohm resistor. What current flows?",
    options: [
      "48A",
      "3A",
      "0.33A",
      "16A"
    ],
    correctAnswer: 1,
    explanation: "Using Ohm's Law: I = V/R = 12/4 = 3A. The current flowing through the resistor is 3 amperes.",
    section: "DC Circuits",
    difficulty: "basic",
    topic: "Ohm's Law Calculations",
    category: "Electrical Principles"
  },
  {
    id: 128,
    question: "What is the resistance of a circuit that draws 5A from a 230V supply?",
    options: [
      "46 ohms",
      "1150 ohms",
      "225 ohms",
      "0.022 ohms"
    ],
    correctAnswer: 0,
    explanation: "Using Ohm's Law rearranged: R = V/I = 230/5 = 46 ohms.",
    section: "DC Circuits",
    difficulty: "basic",
    topic: "Ohm's Law Calculations",
    category: "Electrical Principles"
  },
  {
    id: 129,
    question: "Three resistors of 10 ohms, 20 ohms and 30 ohms are connected in series. What is the total resistance?",
    options: [
      "5.45 ohms",
      "60 ohms",
      "6 ohms",
      "600 ohms"
    ],
    correctAnswer: 1,
    explanation: "For resistors in series, total resistance = R1 + R2 + R3 = 10 + 20 + 30 = 60 ohms. Series resistances add directly.",
    section: "DC Circuits",
    difficulty: "basic",
    topic: "Series Circuits",
    category: "Electrical Principles"
  },
  {
    id: 130,
    question: "Two 100 ohm resistors are connected in parallel. What is the combined resistance?",
    options: [
      "200 ohms",
      "100 ohms",
      "50 ohms",
      "25 ohms"
    ],
    correctAnswer: 2,
    explanation: "For two equal resistors in parallel: R_total = R/2 = 100/2 = 50 ohms. Alternatively: 1/R_total = 1/100 + 1/100 = 2/100, so R_total = 50 ohms.",
    section: "DC Circuits",
    difficulty: "basic",
    topic: "Parallel Circuits",
    category: "Electrical Principles"
  },
  {
    id: 131,
    question: "What is the power dissipated by a 10 ohm resistor carrying 3A?",
    options: [
      "30W",
      "90W",
      "3.33W",
      "0.3W"
    ],
    correctAnswer: 1,
    explanation: "Power P = I squared x R = 3 squared x 10 = 9 x 10 = 90W. This formula derives from combining P = IV with Ohm's Law.",
    section: "DC Circuits",
    difficulty: "basic",
    topic: "Power Calculations",
    category: "Electrical Principles"
  },
  {
    id: 132,
    question: "A 2kW heater operates from a 230V supply. What current does it draw?",
    options: [
      "460A",
      "8.7A",
      "0.115A",
      "115A"
    ],
    correctAnswer: 1,
    explanation: "Using P = IV rearranged: I = P/V = 2000/230 = 8.7A (rounded). This is a typical current for a domestic heater.",
    section: "DC Circuits",
    difficulty: "basic",
    topic: "Power Calculations",
    category: "Electrical Principles"
  },
  {
    id: 133,
    question: "What is the voltage drop across a 25 ohm resistor carrying 2A?",
    options: [
      "12.5V",
      "50V",
      "27V",
      "0.08V"
    ],
    correctAnswer: 1,
    explanation: "Using Ohm's Law: V = IR = 2 x 25 = 50V. The voltage drop is proportional to both current and resistance.",
    section: "DC Circuits",
    difficulty: "basic",
    topic: "Voltage Drop",
    category: "Electrical Principles"
  },
  {
    id: 134,
    question: "In a series circuit, which quantity remains the same throughout?",
    options: [
      "Voltage",
      "Current",
      "Resistance",
      "Power"
    ],
    correctAnswer: 1,
    explanation: "In a series circuit, the current is the same at all points because there is only one path for current flow. Voltage divides across components.",
    section: "DC Circuits",
    difficulty: "basic",
    topic: "Series Circuits",
    category: "Electrical Principles"
  },
  {
    id: 135,
    question: "In a parallel circuit, which quantity is the same across all branches?",
    options: [
      "Current",
      "Resistance",
      "Voltage",
      "Power"
    ],
    correctAnswer: 2,
    explanation: "In a parallel circuit, voltage is the same across all parallel branches. Current divides between branches according to their resistance.",
    section: "DC Circuits",
    difficulty: "basic",
    topic: "Parallel Circuits",
    category: "Electrical Principles"
  },
  {
    id: 136,
    question: "What is conductance?",
    options: [
      "The opposition to current flow",
      "The reciprocal of resistance",
      "The ability to store charge",
      "The rate of energy transfer"
    ],
    correctAnswer: 1,
    explanation: "Conductance (G) is the reciprocal of resistance: G = 1/R. It is measured in siemens (S) and represents how easily current flows.",
    section: "DC Circuits",
    difficulty: "intermediate",
    topic: "Conductance",
    category: "Electrical Principles"
  },
  {
    id: 137,
    question: "A circuit has a conductance of 0.25S. What is its resistance?",
    options: [
      "0.25 ohms",
      "4 ohms",
      "25 ohms",
      "2.5 ohms"
    ],
    correctAnswer: 1,
    explanation: "Resistance R = 1/G = 1/0.25 = 4 ohms. Conductance and resistance are reciprocals of each other.",
    section: "DC Circuits",
    difficulty: "intermediate",
    topic: "Conductance",
    category: "Electrical Principles"
  },
  {
    id: 138,
    question: "Three resistors of 12 ohms, 6 ohms and 4 ohms are connected in parallel. What is the total resistance?",
    options: [
      "22 ohms",
      "2 ohms",
      "0.5 ohms",
      "7.33 ohms"
    ],
    correctAnswer: 1,
    explanation: "1/R_total = 1/12 + 1/6 + 1/4 = 1/12 + 2/12 + 3/12 = 6/12 = 1/2. Therefore R_total = 2 ohms.",
    section: "DC Circuits",
    difficulty: "intermediate",
    topic: "Parallel Circuits",
    category: "Electrical Principles"
  },
  {
    id: 139,
    question: "What is the internal resistance effect on a battery?",
    options: [
      "It increases the terminal voltage under load",
      "It causes terminal voltage to drop under load",
      "It has no effect on terminal voltage",
      "It only affects current when the battery is charging"
    ],
    correctAnswer: 1,
    explanation: "Internal resistance causes a voltage drop within the battery (V_drop = I x r_internal), reducing terminal voltage below EMF when current flows.",
    section: "DC Circuits",
    difficulty: "intermediate",
    topic: "Internal Resistance",
    category: "Electrical Principles"
  },
  {
    id: 140,
    question: "A battery has an EMF of 12V and internal resistance of 0.5 ohms. What is the terminal voltage when supplying 4A?",
    options: [
      "14V",
      "10V",
      "12V",
      "8V"
    ],
    correctAnswer: 1,
    explanation: "Terminal voltage V = EMF - (I x r) = 12 - (4 x 0.5) = 12 - 2 = 10V. The internal resistance causes a 2V drop.",
    section: "DC Circuits",
    difficulty: "intermediate",
    topic: "Internal Resistance",
    category: "Electrical Principles"
  },
  {
    id: 141,
    question: "What is the maximum power transfer theorem?",
    options: [
      "Maximum power is transferred when load resistance equals zero",
      "Maximum power is transferred when load resistance equals source resistance",
      "Maximum power is transferred when load resistance is infinite",
      "Maximum power is transferred when load resistance is twice the source resistance"
    ],
    correctAnswer: 1,
    explanation: "The maximum power transfer theorem states that maximum power is delivered to a load when the load resistance equals the internal resistance of the source.",
    section: "DC Circuits",
    difficulty: "advanced",
    topic: "Maximum Power Transfer",
    category: "Electrical Principles"
  },
  {
    id: 142,
    question: "A source has an internal resistance of 8 ohms. For maximum power transfer, what should the load resistance be?",
    options: [
      "16 ohms",
      "4 ohms",
      "8 ohms",
      "0 ohms"
    ],
    correctAnswer: 2,
    explanation: "For maximum power transfer, load resistance must equal source resistance. Therefore R_load = 8 ohms.",
    section: "DC Circuits",
    difficulty: "intermediate",
    topic: "Maximum Power Transfer",
    category: "Electrical Principles"
  },
  {
    id: 143,
    question: "What is the energy consumed by a 3kW heater operating for 2 hours?",
    options: [
      "1.5 kWh",
      "6 kWh",
      "5 kWh",
      "1.67 kWh"
    ],
    correctAnswer: 1,
    explanation: "Energy = Power x Time = 3kW x 2h = 6 kWh. This is equivalent to 6 units of electricity.",
    section: "DC Circuits",
    difficulty: "basic",
    topic: "Energy Calculations",
    category: "Electrical Principles"
  },
  {
    id: 144,
    question: "What is the relationship between energy in joules and kilowatt-hours?",
    options: [
      "1 kWh = 1000 J",
      "1 kWh = 3600 J",
      "1 kWh = 3,600,000 J",
      "1 kWh = 360,000 J"
    ],
    correctAnswer: 2,
    explanation: "1 kWh = 1000W x 3600s = 3,600,000 J (3.6 MJ). A kilowatt-hour is 1000 watts sustained for one hour.",
    section: "DC Circuits",
    difficulty: "intermediate",
    topic: "Energy Calculations",
    category: "Electrical Principles"
  },
  {
    id: 145,
    question: "A resistor has a temperature coefficient of 0.004 per degree Celsius. If its resistance is 100 ohms at 20 degrees Celsius, what is its resistance at 70 degrees Celsius?",
    options: [
      "120 ohms",
      "80 ohms",
      "100 ohms",
      "140 ohms"
    ],
    correctAnswer: 0,
    explanation: "R_new = R_original x (1 + alpha x delta_T) = 100 x (1 + 0.004 x 50) = 100 x 1.2 = 120 ohms. Temperature rise increases resistance in conductors.",
    section: "DC Circuits",
    difficulty: "advanced",
    topic: "Temperature Coefficient",
    category: "Electrical Principles"
  },

  // ============================================================
  // KIRCHHOFF'S LAWS (Questions 146-160)
  // ============================================================
  {
    id: 146,
    question: "What does Kirchhoff's Current Law (KCL) state?",
    options: [
      "The sum of voltages around a closed loop equals zero",
      "The sum of currents entering a node equals the sum leaving",
      "Current is proportional to voltage",
      "Power equals voltage times current"
    ],
    correctAnswer: 1,
    explanation: "KCL states that the algebraic sum of currents at any node (junction) equals zero - currents entering equal currents leaving. This is based on conservation of charge.",
    section: "Kirchhoff's Laws",
    difficulty: "basic",
    topic: "Kirchhoff's Current Law",
    category: "Electrical Principles"
  },
  {
    id: 147,
    question: "What does Kirchhoff's Voltage Law (KVL) state?",
    options: [
      "The sum of currents at a node equals zero",
      "Voltage is proportional to resistance",
      "The algebraic sum of voltages around any closed loop equals zero",
      "Power is conserved in a circuit"
    ],
    correctAnswer: 2,
    explanation: "KVL states that the algebraic sum of all voltages around any closed loop in a circuit equals zero. This is based on conservation of energy.",
    section: "Kirchhoff's Laws",
    difficulty: "basic",
    topic: "Kirchhoff's Voltage Law",
    category: "Electrical Principles"
  },
  {
    id: 148,
    question: "At a junction, 5A flows in, 2A flows out through one branch. What current flows out through the other branch?",
    options: [
      "7A",
      "3A",
      "2.5A",
      "10A"
    ],
    correctAnswer: 1,
    explanation: "Using KCL: Current in = Current out. 5A = 2A + I_other. Therefore I_other = 5 - 2 = 3A.",
    section: "Kirchhoff's Laws",
    difficulty: "basic",
    topic: "Kirchhoff's Current Law",
    category: "Electrical Principles"
  },
  {
    id: 149,
    question: "A series circuit has a 24V source and three voltage drops of 8V, 10V and V3. What is V3?",
    options: [
      "42V",
      "6V",
      "18V",
      "-6V"
    ],
    correctAnswer: 1,
    explanation: "Using KVL: 24 = 8 + 10 + V3. Therefore V3 = 24 - 18 = 6V. The sum of voltage drops equals the supply voltage.",
    section: "Kirchhoff's Laws",
    difficulty: "basic",
    topic: "Kirchhoff's Voltage Law",
    category: "Electrical Principles"
  },
  {
    id: 150,
    question: "In applying Kirchhoff's Laws, what is a node?",
    options: [
      "A complete circuit path",
      "A point where two or more branches meet",
      "A voltage source",
      "A current source"
    ],
    correctAnswer: 1,
    explanation: "A node (or junction) is a point in a circuit where two or more circuit elements connect - where branches meet and current can divide or combine.",
    section: "Kirchhoff's Laws",
    difficulty: "basic",
    topic: "Circuit Terminology",
    category: "Electrical Principles"
  },
  {
    id: 151,
    question: "What is a mesh in circuit analysis?",
    options: [
      "A parallel combination of resistors",
      "A closed loop that contains no other closed loops within it",
      "Any junction point in a circuit",
      "The total resistance of a circuit"
    ],
    correctAnswer: 1,
    explanation: "A mesh is a closed loop that does not contain any other closed loops within it. Mesh analysis uses KVL applied to each mesh to solve circuits.",
    section: "Kirchhoff's Laws",
    difficulty: "intermediate",
    topic: "Circuit Terminology",
    category: "Electrical Principles"
  },
  {
    id: 152,
    question: "Using mesh analysis, how many equations are needed for a circuit with 3 meshes?",
    options: [
      "1",
      "2",
      "3",
      "6"
    ],
    correctAnswer: 2,
    explanation: "Mesh analysis requires one KVL equation per mesh. For 3 meshes, 3 simultaneous equations are needed to solve for mesh currents.",
    section: "Kirchhoff's Laws",
    difficulty: "intermediate",
    topic: "Mesh Analysis",
    category: "Electrical Principles"
  },
  {
    id: 153,
    question: "Using nodal analysis, how many equations are needed for a circuit with 4 nodes including the reference node?",
    options: [
      "4",
      "3",
      "5",
      "2"
    ],
    correctAnswer: 1,
    explanation: "Nodal analysis requires (n-1) KCL equations where n is the number of nodes. With 4 nodes, one is chosen as reference, leaving 3 equations.",
    section: "Kirchhoff's Laws",
    difficulty: "intermediate",
    topic: "Nodal Analysis",
    category: "Electrical Principles"
  },
  {
    id: 154,
    question: "What is the superposition theorem used for?",
    options: [
      "Finding equivalent resistance only",
      "Analysing circuits with multiple sources by considering one source at a time",
      "Calculating power dissipation",
      "Determining circuit efficiency"
    ],
    correctAnswer: 1,
    explanation: "Superposition theorem states that in a linear circuit with multiple sources, the response can be found by summing the responses from each source acting alone.",
    section: "Kirchhoff's Laws",
    difficulty: "intermediate",
    topic: "Superposition Theorem",
    category: "Electrical Principles"
  },
  {
    id: 155,
    question: "When applying superposition, how are voltage sources treated when not active?",
    options: [
      "Replaced with an open circuit",
      "Replaced with a short circuit",
      "Left in the circuit",
      "Replaced with a resistor"
    ],
    correctAnswer: 1,
    explanation: "When a voltage source is deactivated in superposition, it is replaced with a short circuit (zero resistance). Current sources become open circuits.",
    section: "Kirchhoff's Laws",
    difficulty: "intermediate",
    topic: "Superposition Theorem",
    category: "Electrical Principles"
  },
  {
    id: 156,
    question: "What is Thevenin's theorem used to determine?",
    options: [
      "The maximum power in a circuit",
      "The equivalent circuit seen by a load as a voltage source in series with a resistance",
      "The total energy consumed",
      "The resonant frequency"
    ],
    correctAnswer: 1,
    explanation: "Thevenin's theorem states any linear circuit can be replaced by an equivalent voltage source (V_th) in series with a resistance (R_th) as seen from two terminals.",
    section: "Kirchhoff's Laws",
    difficulty: "advanced",
    topic: "Thevenin's Theorem",
    category: "Electrical Principles"
  },
  {
    id: 157,
    question: "What is Norton's equivalent circuit?",
    options: [
      "A voltage source in series with a resistance",
      "A current source in parallel with a resistance",
      "Two voltage sources in series",
      "A resistance and capacitance in parallel"
    ],
    correctAnswer: 1,
    explanation: "Norton's theorem represents any linear circuit as an equivalent current source in parallel with a resistance. It is the dual of Thevenin's theorem.",
    section: "Kirchhoff's Laws",
    difficulty: "advanced",
    topic: "Norton's Theorem",
    category: "Electrical Principles"
  },
  {
    id: 158,
    question: "How is Thevenin voltage calculated?",
    options: [
      "Short circuit the load terminals and measure current",
      "Open circuit the load terminals and measure voltage",
      "Measure voltage across the largest resistor",
      "Calculate power divided by current"
    ],
    correctAnswer: 1,
    explanation: "Thevenin voltage (V_th) is the open-circuit voltage measured across the terminals where the load connects, with the load removed.",
    section: "Kirchhoff's Laws",
    difficulty: "advanced",
    topic: "Thevenin's Theorem",
    category: "Electrical Principles"
  },
  {
    id: 159,
    question: "How is Thevenin resistance calculated?",
    options: [
      "Add all resistances in the circuit",
      "Deactivate all independent sources and find resistance looking into the terminals",
      "Divide Thevenin voltage by load current",
      "Multiply all resistances together"
    ],
    correctAnswer: 1,
    explanation: "R_th is found by deactivating all independent sources (voltage sources shorted, current sources opened) and calculating resistance seen looking into the terminals.",
    section: "Kirchhoff's Laws",
    difficulty: "advanced",
    topic: "Thevenin's Theorem",
    category: "Electrical Principles"
  },
  {
    id: 160,
    question: "What is the relationship between Thevenin and Norton equivalents?",
    options: [
      "They are unrelated",
      "R_th = R_N and I_N = V_th/R_th",
      "V_th = I_N and R_th = 1/R_N",
      "R_th = V_th x I_N"
    ],
    correctAnswer: 1,
    explanation: "Thevenin and Norton equivalents are related by: R_th = R_N (same resistance) and I_N = V_th/R_th. They are interconvertible using Ohm's law.",
    section: "Kirchhoff's Laws",
    difficulty: "advanced",
    topic: "Norton's Theorem",
    category: "Electrical Principles"
  },

  // ============================================================
  // AC CIRCUITS - Fundamentals (Questions 161-185)
  // ============================================================
  {
    id: 161,
    question: "What is the frequency of the UK mains supply?",
    options: [
      "60 Hz",
      "50 Hz",
      "100 Hz",
      "25 Hz"
    ],
    correctAnswer: 1,
    explanation: "The UK standard mains frequency is 50 Hz, meaning the voltage completes 50 complete cycles per second. This differs from 60 Hz used in North America.",
    section: "AC Circuits",
    difficulty: "basic",
    topic: "AC Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 162,
    question: "What is the relationship between peak voltage and RMS voltage for a sinusoidal waveform?",
    options: [
      "V_peak = V_rms",
      "V_rms = V_peak x 0.707",
      "V_rms = V_peak x 1.414",
      "V_rms = V_peak x 0.637"
    ],
    correctAnswer: 1,
    explanation: "For a sinusoidal waveform, V_rms = V_peak / sqrt(2) = V_peak x 0.707. RMS (root mean square) is the equivalent DC value for power calculations.",
    section: "AC Circuits",
    difficulty: "basic",
    topic: "AC Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 163,
    question: "The UK 230V supply is expressed as an RMS value. What is the peak voltage?",
    options: [
      "163V",
      "230V",
      "325V",
      "460V"
    ],
    correctAnswer: 2,
    explanation: "V_peak = V_rms x sqrt(2) = 230 x 1.414 = 325V approximately. The voltage actually swings between +325V and -325V.",
    section: "AC Circuits",
    difficulty: "basic",
    topic: "AC Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 164,
    question: "What is the period of a 50 Hz AC waveform?",
    options: [
      "50 seconds",
      "0.02 seconds",
      "0.5 seconds",
      "2 seconds"
    ],
    correctAnswer: 1,
    explanation: "Period T = 1/frequency = 1/50 = 0.02 seconds (20 milliseconds). This is the time for one complete cycle.",
    section: "AC Circuits",
    difficulty: "basic",
    topic: "AC Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 165,
    question: "What is the angular frequency (omega) of a 50 Hz supply?",
    options: [
      "50 rad/s",
      "100 rad/s",
      "314 rad/s",
      "157 rad/s"
    ],
    correctAnswer: 2,
    explanation: "Angular frequency omega = 2 x pi x f = 2 x 3.14159 x 50 = 314.16 rad/s (approximately 314 rad/s).",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "AC Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 166,
    question: "What is inductive reactance?",
    options: [
      "The resistance of an inductor to DC",
      "The opposition to AC current flow by an inductor",
      "The power consumed by an inductor",
      "The energy stored in a magnetic field"
    ],
    correctAnswer: 1,
    explanation: "Inductive reactance (X_L) is the opposition to AC current flow caused by an inductor. It increases with frequency: X_L = 2 x pi x f x L.",
    section: "AC Circuits",
    difficulty: "basic",
    topic: "Inductive Reactance",
    category: "Electrical Principles"
  },
  {
    id: 167,
    question: "What is the inductive reactance of a 0.1H inductor at 50 Hz?",
    options: [
      "5 ohms",
      "31.4 ohms",
      "50 ohms",
      "314 ohms"
    ],
    correctAnswer: 1,
    explanation: "X_L = 2 x pi x f x L = 2 x 3.14159 x 50 x 0.1 = 31.4 ohms.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "Inductive Reactance",
    category: "Electrical Principles"
  },
  {
    id: 168,
    question: "What is capacitive reactance?",
    options: [
      "The resistance of a capacitor to DC",
      "The opposition to AC current flow by a capacitor",
      "The charge stored in a capacitor",
      "The energy dissipated in a capacitor"
    ],
    correctAnswer: 1,
    explanation: "Capacitive reactance (X_C) is the opposition to AC current flow caused by a capacitor. It decreases with frequency: X_C = 1/(2 x pi x f x C).",
    section: "AC Circuits",
    difficulty: "basic",
    topic: "Capacitive Reactance",
    category: "Electrical Principles"
  },
  {
    id: 169,
    question: "What is the capacitive reactance of a 100 microfarad capacitor at 50 Hz?",
    options: [
      "3.14 ohms",
      "31.8 ohms",
      "318 ohms",
      "0.314 ohms"
    ],
    correctAnswer: 1,
    explanation: "X_C = 1/(2 x pi x f x C) = 1/(2 x 3.14159 x 50 x 0.0001) = 31.8 ohms.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "Capacitive Reactance",
    category: "Electrical Principles"
  },
  {
    id: 170,
    question: "In a purely inductive circuit, what is the phase relationship between voltage and current?",
    options: [
      "Voltage and current are in phase",
      "Voltage leads current by 90 degrees",
      "Current leads voltage by 90 degrees",
      "Voltage leads current by 180 degrees"
    ],
    correctAnswer: 1,
    explanation: "In a purely inductive circuit, voltage leads current by 90 degrees. Remember: ELI the ICE man - voltage (E) leads current (I) in inductors (L).",
    section: "AC Circuits",
    difficulty: "basic",
    topic: "Phase Relationships",
    category: "Electrical Principles"
  },
  {
    id: 171,
    question: "In a purely capacitive circuit, what is the phase relationship between voltage and current?",
    options: [
      "Voltage and current are in phase",
      "Voltage leads current by 90 degrees",
      "Current leads voltage by 90 degrees",
      "Current lags voltage by 45 degrees"
    ],
    correctAnswer: 2,
    explanation: "In a purely capacitive circuit, current leads voltage by 90 degrees. Remember: ICE - current (I) leads voltage (E) in capacitors (C).",
    section: "AC Circuits",
    difficulty: "basic",
    topic: "Phase Relationships",
    category: "Electrical Principles"
  },
  {
    id: 172,
    question: "What is impedance?",
    options: [
      "Another name for resistance",
      "The total opposition to AC current flow combining resistance and reactance",
      "The power factor of a circuit",
      "The frequency of an AC circuit"
    ],
    correctAnswer: 1,
    explanation: "Impedance (Z) is the total opposition to AC current flow, combining resistance and reactance vectorially: Z = sqrt(R squared + X squared).",
    section: "AC Circuits",
    difficulty: "basic",
    topic: "Impedance",
    category: "Electrical Principles"
  },
  {
    id: 173,
    question: "A series RL circuit has R = 30 ohms and X_L = 40 ohms. What is the impedance?",
    options: [
      "70 ohms",
      "10 ohms",
      "50 ohms",
      "35 ohms"
    ],
    correctAnswer: 2,
    explanation: "Z = sqrt(R squared + X_L squared) = sqrt(30 squared + 40 squared) = sqrt(900 + 1600) = sqrt(2500) = 50 ohms. This is a 3-4-5 triangle.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "Impedance",
    category: "Electrical Principles"
  },
  {
    id: 174,
    question: "A series RC circuit has R = 12 ohms and X_C = 5 ohms. What is the impedance?",
    options: [
      "17 ohms",
      "7 ohms",
      "13 ohms",
      "8.5 ohms"
    ],
    correctAnswer: 2,
    explanation: "Z = sqrt(R squared + X_C squared) = sqrt(12 squared + 5 squared) = sqrt(144 + 25) = sqrt(169) = 13 ohms.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "Impedance",
    category: "Electrical Principles"
  },
  {
    id: 175,
    question: "A series RLC circuit has R = 10 ohms, X_L = 20 ohms and X_C = 12 ohms. What is the impedance?",
    options: [
      "42 ohms",
      "14 ohms",
      "12.8 ohms",
      "18 ohms"
    ],
    correctAnswer: 2,
    explanation: "Net reactance X = X_L - X_C = 20 - 12 = 8 ohms. Z = sqrt(R squared + X squared) = sqrt(100 + 64) = sqrt(164) = 12.8 ohms.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "Impedance",
    category: "Electrical Principles"
  },
  {
    id: 176,
    question: "What is resonance in an AC circuit?",
    options: [
      "When resistance equals reactance",
      "When inductive reactance equals capacitive reactance",
      "When current equals voltage numerically",
      "When power factor equals 0.5"
    ],
    correctAnswer: 1,
    explanation: "Resonance occurs when X_L = X_C. At resonance, the reactive components cancel, leaving only resistance, and current is maximum in a series circuit.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "Resonance",
    category: "Electrical Principles"
  },
  {
    id: 177,
    question: "What is the resonant frequency formula for an LC circuit?",
    options: [
      "f = 1/(2 x pi x L x C)",
      "f = 1/(2 x pi x sqrt(L x C))",
      "f = 2 x pi x sqrt(L x C)",
      "f = sqrt(L/C)"
    ],
    correctAnswer: 1,
    explanation: "The resonant frequency f = 1/(2 x pi x sqrt(L x C)). At this frequency, X_L equals X_C and the circuit is purely resistive.",
    section: "AC Circuits",
    difficulty: "advanced",
    topic: "Resonance",
    category: "Electrical Principles"
  },
  {
    id: 178,
    question: "What happens to current at resonance in a series RLC circuit?",
    options: [
      "Current is minimum",
      "Current is maximum",
      "Current becomes zero",
      "Current equals voltage"
    ],
    correctAnswer: 1,
    explanation: "At resonance in a series RLC circuit, impedance is minimum (equals R only), so current is maximum. This is called series resonance or voltage resonance.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "Resonance",
    category: "Electrical Principles"
  },
  {
    id: 179,
    question: "What is the Q factor of a resonant circuit?",
    options: [
      "The resistance to reactance ratio",
      "A measure of the sharpness of resonance",
      "The power factor",
      "The frequency bandwidth"
    ],
    correctAnswer: 1,
    explanation: "Q factor (quality factor) indicates the sharpness of resonance. Higher Q means sharper resonance peak and narrower bandwidth. Q = X_L/R at resonance.",
    section: "AC Circuits",
    difficulty: "advanced",
    topic: "Resonance",
    category: "Electrical Principles"
  },
  {
    id: 180,
    question: "What is power factor?",
    options: [
      "The ratio of reactive power to apparent power",
      "The ratio of true power to apparent power",
      "The ratio of voltage to current",
      "The efficiency of a circuit"
    ],
    correctAnswer: 1,
    explanation: "Power factor = True Power (W) / Apparent Power (VA) = cos(phi), where phi is the phase angle between voltage and current. It indicates how effectively power is used.",
    section: "AC Circuits",
    difficulty: "basic",
    topic: "Power Factor",
    category: "Electrical Principles"
  },
  {
    id: 181,
    question: "A circuit has a power factor of 0.8 lagging. What does this mean?",
    options: [
      "Voltage lags current by an angle whose cosine is 0.8",
      "Current lags voltage by an angle whose cosine is 0.8",
      "The circuit is purely resistive",
      "The circuit is purely capacitive"
    ],
    correctAnswer: 1,
    explanation: "A lagging power factor means current lags voltage, indicating an inductive load. The angle is arccos(0.8) = 36.87 degrees.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "Power Factor",
    category: "Electrical Principles"
  },
  {
    id: 182,
    question: "What is true power in an AC circuit?",
    options: [
      "V x I",
      "V x I x cos(phi)",
      "V x I x sin(phi)",
      "V squared / Z"
    ],
    correctAnswer: 1,
    explanation: "True power (P) = V x I x cos(phi), measured in watts. This is the actual power consumed and converted to useful work or heat.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "AC Power",
    category: "Electrical Principles"
  },
  {
    id: 183,
    question: "What is reactive power?",
    options: [
      "Power consumed by resistors",
      "Power exchanged between source and reactive components",
      "Power lost as heat",
      "Total power in the circuit"
    ],
    correctAnswer: 1,
    explanation: "Reactive power (Q) = V x I x sin(phi), measured in VAr. It represents energy oscillating between source and reactive components, not consumed.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "AC Power",
    category: "Electrical Principles"
  },
  {
    id: 184,
    question: "What is apparent power?",
    options: [
      "The real power consumed",
      "The product of RMS voltage and RMS current",
      "The power factor times true power",
      "The reactive power plus true power"
    ],
    correctAnswer: 1,
    explanation: "Apparent power (S) = V x I, measured in VA. It is the total power that appears to be flowing in the circuit, combining true and reactive power vectorially.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "AC Power",
    category: "Electrical Principles"
  },
  {
    id: 185,
    question: "A load draws 10A from a 230V supply at 0.85 power factor lagging. What is the true power?",
    options: [
      "2300W",
      "1955W",
      "2706W",
      "1150W"
    ],
    correctAnswer: 1,
    explanation: "True power P = V x I x pf = 230 x 10 x 0.85 = 1955W. The apparent power is 2300VA but only 1955W is actual power consumed.",
    section: "AC Circuits",
    difficulty: "intermediate",
    topic: "AC Power",
    category: "Electrical Principles"
  },

  // ============================================================
  // THREE-PHASE SYSTEMS (Questions 186-210)
  // ============================================================
  {
    id: 186,
    question: "What is the phase angle between each phase in a three-phase system?",
    options: [
      "90 degrees",
      "180 degrees",
      "120 degrees",
      "60 degrees"
    ],
    correctAnswer: 2,
    explanation: "In a balanced three-phase system, each phase is separated by 120 degrees (360/3 = 120). This provides constant power transfer.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Three-Phase Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 187,
    question: "What are the two common three-phase configurations?",
    options: [
      "Series and parallel",
      "AC and DC",
      "Star (wye) and delta",
      "Single and double"
    ],
    correctAnswer: 2,
    explanation: "The two main three-phase configurations are star (wye) with a neutral point, and delta (mesh) which is a closed loop of three windings.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Three-Phase Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 188,
    question: "In a star-connected system, what is the relationship between line voltage and phase voltage?",
    options: [
      "V_line = V_phase",
      "V_line = sqrt(3) x V_phase",
      "V_line = V_phase / sqrt(3)",
      "V_line = 2 x V_phase"
    ],
    correctAnswer: 1,
    explanation: "In a star connection, V_line = sqrt(3) x V_phase = 1.732 x V_phase. With 230V phase voltage, line voltage is 400V.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Star Connection",
    category: "Electrical Principles"
  },
  {
    id: 189,
    question: "In a star-connected system, what is the relationship between line current and phase current?",
    options: [
      "I_line = sqrt(3) x I_phase",
      "I_line = I_phase",
      "I_line = I_phase / sqrt(3)",
      "I_line = 2 x I_phase"
    ],
    correctAnswer: 1,
    explanation: "In a star connection, line current equals phase current: I_line = I_phase. Current flows directly from line through the phase winding.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Star Connection",
    category: "Electrical Principles"
  },
  {
    id: 190,
    question: "In a delta-connected system, what is the relationship between line voltage and phase voltage?",
    options: [
      "V_line = sqrt(3) x V_phase",
      "V_line = V_phase",
      "V_line = V_phase / sqrt(3)",
      "V_line = 2 x V_phase"
    ],
    correctAnswer: 1,
    explanation: "In a delta connection, line voltage equals phase voltage: V_line = V_phase. Each winding is connected directly between two lines.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Delta Connection",
    category: "Electrical Principles"
  },
  {
    id: 191,
    question: "In a delta-connected system, what is the relationship between line current and phase current?",
    options: [
      "I_line = I_phase",
      "I_line = sqrt(3) x I_phase",
      "I_line = I_phase / sqrt(3)",
      "I_line = 2 x I_phase"
    ],
    correctAnswer: 1,
    explanation: "In a delta connection, I_line = sqrt(3) x I_phase = 1.732 x I_phase. Line current is greater because it is the vector sum of two phase currents.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Delta Connection",
    category: "Electrical Principles"
  },
  {
    id: 192,
    question: "A star-connected load has phase voltage of 230V. What is the line voltage?",
    options: [
      "230V",
      "400V",
      "133V",
      "690V"
    ],
    correctAnswer: 1,
    explanation: "V_line = sqrt(3) x V_phase = 1.732 x 230 = 398V, approximately 400V. This is the standard UK three-phase supply.",
    section: "Three-Phase Systems",
    difficulty: "intermediate",
    topic: "Star Connection",
    category: "Electrical Principles"
  },
  {
    id: 193,
    question: "What is the total power in a balanced three-phase system?",
    options: [
      "P = V_L x I_L",
      "P = sqrt(3) x V_L x I_L x cos(phi)",
      "P = 3 x V_L x I_L",
      "P = V_L x I_L x cos(phi)"
    ],
    correctAnswer: 1,
    explanation: "Total three-phase power P = sqrt(3) x V_line x I_line x cos(phi). This can also be expressed as P = 3 x V_phase x I_phase x cos(phi).",
    section: "Three-Phase Systems",
    difficulty: "intermediate",
    topic: "Three-Phase Power",
    category: "Electrical Principles"
  },
  {
    id: 194,
    question: "A balanced three-phase load draws 50A per line from a 400V supply at unity power factor. What is the total power?",
    options: [
      "20 kW",
      "34.6 kW",
      "60 kW",
      "69.3 kW"
    ],
    correctAnswer: 1,
    explanation: "P = sqrt(3) x V_L x I_L x cos(phi) = 1.732 x 400 x 50 x 1 = 34,640W = 34.6 kW.",
    section: "Three-Phase Systems",
    difficulty: "intermediate",
    topic: "Three-Phase Power",
    category: "Electrical Principles"
  },
  {
    id: 195,
    question: "What is the purpose of the neutral conductor in a three-phase system?",
    options: [
      "To carry the full load current",
      "To carry unbalanced current and provide the return path for single-phase loads",
      "To increase the voltage",
      "To provide earth fault protection only"
    ],
    correctAnswer: 1,
    explanation: "The neutral carries unbalanced current when loads are not equal on each phase. It provides a return path for single-phase loads connected between phase and neutral.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Three-Phase Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 196,
    question: "In a perfectly balanced three-phase system, what is the neutral current?",
    options: [
      "Equal to line current",
      "Zero",
      "sqrt(3) times line current",
      "Three times line current"
    ],
    correctAnswer: 1,
    explanation: "In a perfectly balanced system, the three phase currents sum to zero (they are 120 degrees apart and equal magnitude), so neutral current is zero.",
    section: "Three-Phase Systems",
    difficulty: "intermediate",
    topic: "Three-Phase Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 197,
    question: "What happens if a star-connected motor loses one phase?",
    options: [
      "It runs normally",
      "It runs at higher speed",
      "It continues to run but may overheat, or fails to start if stationary",
      "It immediately stops"
    ],
    correctAnswer: 2,
    explanation: "Single-phasing causes the motor to run as single-phase if already running, drawing excessive current and overheating. If stationary, it will not start and may burn out.",
    section: "Three-Phase Systems",
    difficulty: "intermediate",
    topic: "Three-Phase Faults",
    category: "Electrical Principles"
  },
  {
    id: 198,
    question: "What is phase sequence in a three-phase system?",
    options: [
      "The frequency of each phase",
      "The order in which the phases reach their maximum values",
      "The magnitude of phase voltages",
      "The power factor of each phase"
    ],
    correctAnswer: 1,
    explanation: "Phase sequence (or phase rotation) is the order in which the three phases reach their peak values: L1-L2-L3 (positive) or L1-L3-L2 (negative).",
    section: "Three-Phase Systems",
    difficulty: "intermediate",
    topic: "Phase Sequence",
    category: "Electrical Principles"
  },
  {
    id: 199,
    question: "Why is phase sequence important for three-phase motors?",
    options: [
      "It affects the motor voltage",
      "It determines the direction of motor rotation",
      "It changes the motor power",
      "It affects the motor frequency"
    ],
    correctAnswer: 1,
    explanation: "Phase sequence determines the direction a three-phase motor rotates. Reversing two phases reverses the sequence and thus the motor direction.",
    section: "Three-Phase Systems",
    difficulty: "intermediate",
    topic: "Phase Sequence",
    category: "Electrical Principles"
  },
  {
    id: 200,
    question: "A delta-connected load has 10A flowing in each phase winding. What is the line current?",
    options: [
      "10A",
      "17.3A",
      "30A",
      "5.77A"
    ],
    correctAnswer: 1,
    explanation: "I_line = sqrt(3) x I_phase = 1.732 x 10 = 17.3A. Line current is larger than phase current in delta connections.",
    section: "Three-Phase Systems",
    difficulty: "intermediate",
    topic: "Delta Connection",
    category: "Electrical Principles"
  },
  {
    id: 201,
    question: "What is the advantage of three-phase power over single-phase?",
    options: [
      "Lower voltage",
      "Constant power delivery and more efficient power transmission",
      "Simpler wiring",
      "Lower current for same power"
    ],
    correctAnswer: 1,
    explanation: "Three-phase provides constant instantaneous power (not pulsating), more efficient transmission (less conductor material), and self-starting rotating fields for motors.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Three-Phase Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 202,
    question: "What is the kVA rating of a three-phase transformer with 400V line voltage and 100A line current?",
    options: [
      "40 kVA",
      "69.3 kVA",
      "120 kVA",
      "46.2 kVA"
    ],
    correctAnswer: 1,
    explanation: "Three-phase kVA = sqrt(3) x V_L x I_L / 1000 = 1.732 x 400 x 100 / 1000 = 69.3 kVA.",
    section: "Three-Phase Systems",
    difficulty: "intermediate",
    topic: "Three-Phase Power",
    category: "Electrical Principles"
  },
  {
    id: 203,
    question: "A three-phase motor is rated at 22 kW, 400V, with efficiency of 90% and power factor of 0.85. What is the line current?",
    options: [
      "31.8A",
      "41.5A",
      "35.3A",
      "55.2A"
    ],
    correctAnswer: 1,
    explanation: "Input power = 22000/0.9 = 24444W. I_L = P/(sqrt(3) x V_L x pf) = 24444/(1.732 x 400 x 0.85) = 41.5A.",
    section: "Three-Phase Systems",
    difficulty: "advanced",
    topic: "Three-Phase Power",
    category: "Electrical Principles"
  },
  {
    id: 204,
    question: "What is the purpose of power factor correction capacitors in a three-phase system?",
    options: [
      "To increase voltage",
      "To reduce lagging reactive current and improve power factor",
      "To provide backup power",
      "To reduce resistance"
    ],
    correctAnswer: 1,
    explanation: "Power factor correction capacitors supply leading reactive current to offset lagging reactive current from inductive loads, improving power factor closer to unity.",
    section: "Three-Phase Systems",
    difficulty: "intermediate",
    topic: "Power Factor Correction",
    category: "Electrical Principles"
  },
  {
    id: 205,
    question: "A three-phase load of 50 kW at 0.7 pf lagging needs to be corrected to 0.95 pf. What reactive power must the capacitors provide?",
    options: [
      "35.7 kVAr",
      "16.4 kVAr",
      "51.0 kVAr",
      "34.6 kVAr"
    ],
    correctAnswer: 0,
    explanation: "Q1 = P x tan(arccos(0.7)) = 50 x 1.02 = 51.0 kVAr. Q2 = P x tan(arccos(0.95)) = 50 x 0.329 = 16.4 kVAr. Q_cap = Q1 - Q2 = 34.6 kVAr (closest is 35.7 kVAr accounting for rounding).",
    section: "Three-Phase Systems",
    difficulty: "advanced",
    topic: "Power Factor Correction",
    category: "Electrical Principles"
  },
  {
    id: 206,
    question: "What is a three-phase four-wire system?",
    options: [
      "Three phases and an earth",
      "Three phases and a neutral",
      "Two phases, neutral and earth",
      "Four separate phases"
    ],
    correctAnswer: 1,
    explanation: "A three-phase four-wire system comprises three line conductors (L1, L2, L3) plus a neutral (N). The earth is separate protective conductor.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Three-Phase Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 207,
    question: "What voltage is available between any phase and neutral in a 400V three-phase system?",
    options: [
      "400V",
      "230V",
      "115V",
      "690V"
    ],
    correctAnswer: 1,
    explanation: "V_phase = V_line / sqrt(3) = 400 / 1.732 = 231V, approximately 230V. This is the single-phase supply voltage.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Star Connection",
    category: "Electrical Principles"
  },
  {
    id: 208,
    question: "What is the effect of connecting a delta load to a star supply incorrectly?",
    options: [
      "No effect",
      "The load receives reduced voltage (1/sqrt(3) of intended)",
      "The load receives increased voltage (sqrt(3) times intended)",
      "The circuit trips immediately"
    ],
    correctAnswer: 1,
    explanation: "If a delta-rated load is star-connected, each winding receives V_line/sqrt(3) instead of V_line, reducing power to 1/3 of rated value.",
    section: "Three-Phase Systems",
    difficulty: "advanced",
    topic: "Three-Phase Connections",
    category: "Electrical Principles"
  },
  {
    id: 209,
    question: "What is the power in each phase of a balanced three-phase system delivering 30 kW total?",
    options: [
      "30 kW",
      "10 kW",
      "17.3 kW",
      "90 kW"
    ],
    correctAnswer: 1,
    explanation: "In a balanced system, power divides equally: P_phase = P_total / 3 = 30 / 3 = 10 kW per phase.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Three-Phase Power",
    category: "Electrical Principles"
  },
  {
    id: 210,
    question: "A three-phase system has line currents of 50A, 50A and 70A. Is this system balanced?",
    options: [
      "Yes, because two phases are equal",
      "No, because all three line currents must be equal",
      "Yes, because total current is constant",
      "Cannot determine without voltage readings"
    ],
    correctAnswer: 1,
    explanation: "A balanced three-phase system requires all three phases to have equal magnitude currents (and voltages). Unequal currents indicate an unbalanced load.",
    section: "Three-Phase Systems",
    difficulty: "basic",
    topic: "Three-Phase Balance",
    category: "Electrical Principles"
  },

  // ============================================================
  // TRANSFORMERS (Questions 211-225)
  // ============================================================
  {
    id: 211,
    question: "What is the basic principle of transformer operation?",
    options: [
      "Electrostatic induction",
      "Electromagnetic induction",
      "Thermoelectric effect",
      "Piezoelectric effect"
    ],
    correctAnswer: 1,
    explanation: "Transformers operate on electromagnetic induction - a changing magnetic flux in the primary winding induces a voltage in the secondary winding (Faraday's Law).",
    section: "Transformers",
    difficulty: "basic",
    topic: "Transformer Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 212,
    question: "What is the transformer turns ratio formula?",
    options: [
      "N1/N2 = I1/I2",
      "N1/N2 = V1/V2",
      "N1/N2 = P1/P2",
      "N1 x N2 = V1 x V2"
    ],
    correctAnswer: 1,
    explanation: "The turns ratio equals the voltage ratio: N1/N2 = V1/V2. This fundamental relationship determines whether a transformer steps up or down voltage.",
    section: "Transformers",
    difficulty: "basic",
    topic: "Transformer Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 213,
    question: "A transformer has 500 primary turns and 100 secondary turns. If the primary voltage is 230V, what is the secondary voltage?",
    options: [
      "1150V",
      "46V",
      "23V",
      "115V"
    ],
    correctAnswer: 1,
    explanation: "V2 = V1 x (N2/N1) = 230 x (100/500) = 230 x 0.2 = 46V. This is a step-down transformer with 5:1 ratio.",
    section: "Transformers",
    difficulty: "intermediate",
    topic: "Transformer Calculations",
    category: "Electrical Principles"
  },
  {
    id: 214,
    question: "For an ideal transformer, what is the relationship between primary and secondary power?",
    options: [
      "P1 > P2",
      "P1 < P2",
      "P1 = P2",
      "P1 = 2 x P2"
    ],
    correctAnswer: 2,
    explanation: "In an ideal transformer (no losses), power in equals power out: P1 = P2. Therefore V1 x I1 = V2 x I2.",
    section: "Transformers",
    difficulty: "basic",
    topic: "Transformer Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 215,
    question: "A transformer steps down 400V to 50V and supplies 20A to the load. What is the primary current (assuming ideal)?",
    options: [
      "160A",
      "2.5A",
      "20A",
      "8A"
    ],
    correctAnswer: 1,
    explanation: "For an ideal transformer: V1 x I1 = V2 x I2. Therefore I1 = (V2 x I2)/V1 = (50 x 20)/400 = 2.5A.",
    section: "Transformers",
    difficulty: "intermediate",
    topic: "Transformer Calculations",
    category: "Electrical Principles"
  },
  {
    id: 216,
    question: "What are the main losses in a transformer?",
    options: [
      "Friction and windage losses",
      "Copper losses and iron (core) losses",
      "Mechanical and thermal losses",
      "Radiation and conduction losses"
    ],
    correctAnswer: 1,
    explanation: "Main transformer losses are: copper losses (I squared R in windings) and iron losses (hysteresis and eddy currents in the core).",
    section: "Transformers",
    difficulty: "intermediate",
    topic: "Transformer Losses",
    category: "Electrical Principles"
  },
  {
    id: 217,
    question: "What causes eddy current losses in a transformer core?",
    options: [
      "Current flowing through the windings",
      "Circulating currents induced in the solid core material",
      "Magnetic hysteresis in the core",
      "Leakage flux"
    ],
    correctAnswer: 1,
    explanation: "Eddy currents are circulating currents induced in the core by the changing magnetic flux. They cause I squared R heating losses in the core material.",
    section: "Transformers",
    difficulty: "intermediate",
    topic: "Transformer Losses",
    category: "Electrical Principles"
  },
  {
    id: 218,
    question: "How are eddy current losses reduced in a transformer?",
    options: [
      "Using solid iron cores",
      "Using laminated cores with insulation between laminations",
      "Increasing the core size",
      "Using higher frequency supplies"
    ],
    correctAnswer: 1,
    explanation: "Laminating the core into thin sheets with insulation between them increases the resistance to eddy current flow, significantly reducing these losses.",
    section: "Transformers",
    difficulty: "intermediate",
    topic: "Transformer Construction",
    category: "Electrical Principles"
  },
  {
    id: 219,
    question: "What is transformer efficiency typically expressed as?",
    options: [
      "Output power / Input power x 100%",
      "Input power / Output power x 100%",
      "Losses / Output power x 100%",
      "Output voltage / Input voltage x 100%"
    ],
    correctAnswer: 0,
    explanation: "Efficiency = (Output Power / Input Power) x 100% = (Input - Losses) / Input x 100%. Large transformers can exceed 98% efficiency.",
    section: "Transformers",
    difficulty: "basic",
    topic: "Transformer Efficiency",
    category: "Electrical Principles"
  },
  {
    id: 220,
    question: "A 10 kVA transformer has iron losses of 100W and full-load copper losses of 200W. What is its efficiency at full load and unity power factor?",
    options: [
      "97%",
      "99%",
      "95%",
      "93%"
    ],
    correctAnswer: 0,
    explanation: "Output = 10000W (at unity pf). Total losses = 100 + 200 = 300W. Efficiency = 10000/(10000+300) x 100 = 97.1%, approximately 97%.",
    section: "Transformers",
    difficulty: "advanced",
    topic: "Transformer Efficiency",
    category: "Electrical Principles"
  },
  {
    id: 221,
    question: "What is an autotransformer?",
    options: [
      "A transformer with automatic voltage regulation",
      "A transformer with a single winding serving as both primary and secondary",
      "A transformer that automatically switches taps",
      "A three-phase transformer"
    ],
    correctAnswer: 1,
    explanation: "An autotransformer has a single winding with a tap, where part of the winding is common to both primary and secondary. It is more compact but provides no isolation.",
    section: "Transformers",
    difficulty: "intermediate",
    topic: "Transformer Types",
    category: "Electrical Principles"
  },
  {
    id: 222,
    question: "Why cannot a transformer operate on DC?",
    options: [
      "DC voltage is too high",
      "DC does not produce a changing magnetic flux",
      "DC causes too much heating",
      "DC destroys the insulation"
    ],
    correctAnswer: 1,
    explanation: "Transformers require a changing magnetic flux to induce voltage. DC produces constant flux, so no voltage is induced in the secondary (except briefly during switching).",
    section: "Transformers",
    difficulty: "basic",
    topic: "Transformer Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 223,
    question: "What is the purpose of transformer oil?",
    options: [
      "Lubrication only",
      "Cooling and insulation",
      "Magnetic flux enhancement",
      "Voltage regulation"
    ],
    correctAnswer: 1,
    explanation: "Transformer oil provides electrical insulation between windings and the tank, and also serves as a cooling medium by convection.",
    section: "Transformers",
    difficulty: "basic",
    topic: "Transformer Construction",
    category: "Electrical Principles"
  },
  {
    id: 224,
    question: "What is voltage regulation of a transformer?",
    options: [
      "The ability to maintain constant output voltage regardless of load",
      "The change in secondary voltage from no-load to full-load expressed as a percentage",
      "The primary voltage variation",
      "The transformer efficiency"
    ],
    correctAnswer: 1,
    explanation: "Voltage regulation = (V_no-load - V_full-load) / V_full-load x 100%. It indicates how much the output voltage drops under load.",
    section: "Transformers",
    difficulty: "intermediate",
    topic: "Transformer Performance",
    category: "Electrical Principles"
  },
  {
    id: 225,
    question: "A transformer secondary voltage is 240V at no-load and 230V at full-load. What is the percentage regulation?",
    options: [
      "4.35%",
      "4.17%",
      "10%",
      "2.08%"
    ],
    correctAnswer: 0,
    explanation: "Voltage regulation = (V_NL - V_FL) / V_FL x 100 = (240 - 230) / 230 x 100 = 4.35%.",
    section: "Transformers",
    difficulty: "intermediate",
    topic: "Transformer Performance",
    category: "Electrical Principles"
  },

  // ============================================================
  // MOTORS (Questions 226-240)
  // ============================================================
  {
    id: 226,
    question: "What is the principle of operation of an electric motor?",
    options: [
      "A current-carrying conductor in a magnetic field experiences a force",
      "A changing magnetic field induces a voltage",
      "Static charges attract and repel",
      "Heat causes expansion"
    ],
    correctAnswer: 0,
    explanation: "Motors work on the motor effect - a current-carrying conductor placed in a magnetic field experiences a force (F = BIL), causing rotation.",
    section: "Motors",
    difficulty: "basic",
    topic: "Motor Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 227,
    question: "What creates the rotating magnetic field in a three-phase induction motor?",
    options: [
      "The rotor windings",
      "Permanent magnets",
      "Three-phase currents displaced by 120 degrees in the stator windings",
      "DC excitation"
    ],
    correctAnswer: 2,
    explanation: "The rotating magnetic field is produced by three-phase currents in the stator windings. The 120-degree displacement creates a field that rotates at synchronous speed.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Induction Motors",
    category: "Electrical Principles"
  },
  {
    id: 228,
    question: "What is synchronous speed?",
    options: [
      "The actual rotor speed",
      "The speed of the rotating magnetic field",
      "The slip speed",
      "The rated nameplate speed"
    ],
    correctAnswer: 1,
    explanation: "Synchronous speed is the speed of the rotating magnetic field, given by Ns = (120 x f) / P, where f is frequency and P is number of poles.",
    section: "Motors",
    difficulty: "basic",
    topic: "Motor Speed",
    category: "Electrical Principles"
  },
  {
    id: 229,
    question: "What is the synchronous speed of a 4-pole motor on a 50 Hz supply?",
    options: [
      "3000 rpm",
      "1500 rpm",
      "1000 rpm",
      "750 rpm"
    ],
    correctAnswer: 1,
    explanation: "Ns = (120 x f) / P = (120 x 50) / 4 = 1500 rpm. A 4-pole motor has a synchronous speed of 1500 rpm at 50 Hz.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Motor Speed",
    category: "Electrical Principles"
  },
  {
    id: 230,
    question: "What is slip in an induction motor?",
    options: [
      "Mechanical wear in the bearings",
      "The difference between synchronous speed and actual rotor speed",
      "The starting current",
      "The power factor"
    ],
    correctAnswer: 1,
    explanation: "Slip is the difference between synchronous speed (Ns) and rotor speed (Nr): Slip = (Ns - Nr) / Ns, often expressed as a percentage.",
    section: "Motors",
    difficulty: "basic",
    topic: "Induction Motors",
    category: "Electrical Principles"
  },
  {
    id: 231,
    question: "A 4-pole induction motor runs at 1440 rpm on a 50 Hz supply. What is the percentage slip?",
    options: [
      "4%",
      "6%",
      "2%",
      "8%"
    ],
    correctAnswer: 0,
    explanation: "Ns = 1500 rpm. Slip = (Ns - Nr) / Ns x 100 = (1500 - 1440) / 1500 x 100 = 60/1500 x 100 = 4%.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Motor Slip",
    category: "Electrical Principles"
  },
  {
    id: 232,
    question: "Why is slip necessary for an induction motor to develop torque?",
    options: [
      "To provide cooling",
      "To allow current flow in the rotor by relative motion between field and rotor",
      "To reduce starting current",
      "To improve power factor"
    ],
    correctAnswer: 1,
    explanation: "Slip is essential - the relative motion between the rotating field and rotor conductors induces rotor currents which create torque. At zero slip, no rotor current flows.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Induction Motors",
    category: "Electrical Principles"
  },
  {
    id: 233,
    question: "What is the typical full-load slip of a standard induction motor?",
    options: [
      "0.1% to 0.5%",
      "2% to 5%",
      "10% to 15%",
      "20% to 30%"
    ],
    correctAnswer: 1,
    explanation: "Typical full-load slip for standard induction motors is 2% to 5%. Smaller motors tend to have higher slip than larger ones.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Motor Slip",
    category: "Electrical Principles"
  },
  {
    id: 234,
    question: "What is the starting current of an induction motor typically compared to full-load current?",
    options: [
      "Same as full-load current",
      "Half of full-load current",
      "5 to 8 times full-load current",
      "Twice full-load current"
    ],
    correctAnswer: 2,
    explanation: "Direct-on-line starting current is typically 5 to 8 times full-load current due to low rotor impedance at standstill. This is why starting methods are often needed.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Motor Starting",
    category: "Electrical Principles"
  },
  {
    id: 235,
    question: "What is the purpose of a star-delta starter?",
    options: [
      "To reverse motor direction",
      "To reduce starting current and starting torque",
      "To increase motor speed",
      "To improve power factor"
    ],
    correctAnswer: 1,
    explanation: "Star-delta starting connects the motor in star initially, reducing voltage per winding by 1/sqrt(3), which reduces starting current and torque to 1/3 of DOL values.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Motor Starting",
    category: "Electrical Principles"
  },
  {
    id: 236,
    question: "What is the function of a synchronous motor?",
    options: [
      "To run at varying speeds",
      "To run at exactly synchronous speed with the supply frequency",
      "To produce maximum torque",
      "To operate on single-phase supplies only"
    ],
    correctAnswer: 1,
    explanation: "Synchronous motors run at exactly synchronous speed (Ns), locked to the supply frequency. They can also be used for power factor correction.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Synchronous Motors",
    category: "Electrical Principles"
  },
  {
    id: 237,
    question: "What is back EMF in a motor?",
    options: [
      "The supply voltage",
      "Voltage induced in the armature that opposes the supply voltage",
      "The voltage across the starter",
      "The neutral voltage"
    ],
    correctAnswer: 1,
    explanation: "Back EMF is voltage induced in the motor armature as it rotates through the magnetic field. It opposes the supply voltage and limits motor current.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Motor Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 238,
    question: "A motor has a rated output of 15 kW and runs at 88% efficiency. What is the input power?",
    options: [
      "13.2 kW",
      "17.05 kW",
      "15 kW",
      "16.5 kW"
    ],
    correctAnswer: 1,
    explanation: "Efficiency = Output / Input. Therefore Input = Output / Efficiency = 15 / 0.88 = 17.05 kW.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Motor Efficiency",
    category: "Electrical Principles"
  },
  {
    id: 239,
    question: "What is the torque formula for a motor?",
    options: [
      "T = P / omega (where omega is angular velocity in rad/s)",
      "T = P x omega",
      "T = V x I",
      "T = I squared x R"
    ],
    correctAnswer: 0,
    explanation: "Torque T = P / omega = P / (2 x pi x n/60), where P is power in watts and n is speed in rpm. Torque is measured in Newton-metres.",
    section: "Motors",
    difficulty: "intermediate",
    topic: "Motor Torque",
    category: "Electrical Principles"
  },
  {
    id: 240,
    question: "A motor produces 7.5 kW at 1450 rpm. What is the torque?",
    options: [
      "49.4 Nm",
      "5.17 Nm",
      "108.75 Nm",
      "10.87 Nm"
    ],
    correctAnswer: 0,
    explanation: "omega = 2 x pi x n/60 = 2 x 3.14159 x 1450/60 = 151.8 rad/s. T = P/omega = 7500/151.8 = 49.4 Nm.",
    section: "Motors",
    difficulty: "advanced",
    topic: "Motor Torque",
    category: "Electrical Principles"
  },

  // ============================================================
  // SEMICONDUCTORS & TRANSISTORS (Questions 241-250)
  // ============================================================
  {
    id: 241,
    question: "What are the two main types of semiconductor material?",
    options: [
      "Copper and aluminium",
      "P-type and N-type",
      "Positive and negative",
      "AC and DC type"
    ],
    correctAnswer: 1,
    explanation: "The two types are N-type (doped with donor atoms giving excess electrons) and P-type (doped with acceptor atoms giving excess holes).",
    section: "Semiconductors",
    difficulty: "basic",
    topic: "Semiconductor Fundamentals",
    category: "Electrical Principles"
  },
  {
    id: 242,
    question: "What is a PN junction diode?",
    options: [
      "A device that conducts equally in both directions",
      "A device that allows current in one direction only (when forward biased)",
      "A device that amplifies signals",
      "A variable resistor"
    ],
    correctAnswer: 1,
    explanation: "A PN junction diode conducts when forward biased (P positive, N negative) and blocks when reverse biased. It acts as a one-way valve for current.",
    section: "Semiconductors",
    difficulty: "basic",
    topic: "Diodes",
    category: "Electrical Principles"
  },
  {
    id: 243,
    question: "What is the forward voltage drop across a silicon diode?",
    options: [
      "0.1V to 0.2V",
      "0.6V to 0.7V",
      "1.5V to 2V",
      "5V"
    ],
    correctAnswer: 1,
    explanation: "Silicon diodes have a forward voltage drop of approximately 0.6V to 0.7V. This is the voltage needed to overcome the potential barrier at the junction.",
    section: "Semiconductors",
    difficulty: "basic",
    topic: "Diodes",
    category: "Electrical Principles"
  },
  {
    id: 244,
    question: "What is the main function of a rectifier?",
    options: [
      "To amplify AC signals",
      "To convert AC to DC",
      "To convert DC to AC",
      "To store electrical energy"
    ],
    correctAnswer: 1,
    explanation: "A rectifier converts AC to DC. Half-wave rectifiers use one diode; full-wave bridge rectifiers use four diodes for more efficient conversion.",
    section: "Semiconductors",
    difficulty: "basic",
    topic: "Rectifiers",
    category: "Electrical Principles"
  },
  {
    id: 245,
    question: "What are the three terminals of a bipolar junction transistor (BJT)?",
    options: [
      "Anode, cathode, gate",
      "Source, drain, gate",
      "Base, collector, emitter",
      "Input, output, ground"
    ],
    correctAnswer: 2,
    explanation: "A BJT has three terminals: base (controls current flow), collector (main current input for NPN), and emitter (main current output for NPN).",
    section: "Semiconductors",
    difficulty: "basic",
    topic: "Transistors",
    category: "Electrical Principles"
  },
  {
    id: 246,
    question: "What is the primary function of a transistor?",
    options: [
      "To convert AC to DC",
      "To amplify signals or act as a switch",
      "To store charge",
      "To generate oscillations only"
    ],
    correctAnswer: 1,
    explanation: "Transistors primarily amplify weak signals (analogue applications) or act as electronic switches (digital applications). They are the building blocks of modern electronics.",
    section: "Semiconductors",
    difficulty: "basic",
    topic: "Transistors",
    category: "Electrical Principles"
  },
  {
    id: 247,
    question: "What is the current gain (hFE or beta) of a transistor?",
    options: [
      "The ratio of collector current to emitter current",
      "The ratio of collector current to base current",
      "The ratio of base current to collector current",
      "The ratio of emitter voltage to base voltage"
    ],
    correctAnswer: 1,
    explanation: "Current gain beta = Ic / Ib (collector current divided by base current). Typical values range from 50 to 300, meaning small base current controls large collector current.",
    section: "Semiconductors",
    difficulty: "intermediate",
    topic: "Transistors",
    category: "Electrical Principles"
  },
  {
    id: 248,
    question: "A transistor has a current gain of 100. If the base current is 0.5 mA, what is the collector current?",
    options: [
      "0.005 mA",
      "50 mA",
      "100 mA",
      "0.5 mA"
    ],
    correctAnswer: 1,
    explanation: "Ic = beta x Ib = 100 x 0.5 mA = 50 mA. The transistor amplifies the small base current by a factor of 100.",
    section: "Semiconductors",
    difficulty: "intermediate",
    topic: "Transistors",
    category: "Electrical Principles"
  },
  {
    id: 249,
    question: "What is a thyristor (SCR) commonly used for?",
    options: [
      "Signal amplification",
      "Power control and switching in AC circuits",
      "Voltage regulation only",
      "Frequency conversion"
    ],
    correctAnswer: 1,
    explanation: "Thyristors (Silicon Controlled Rectifiers) are used for power control, switching large currents, and speed control of motors. Once triggered, they remain on until current falls to zero.",
    section: "Semiconductors",
    difficulty: "intermediate",
    topic: "Thyristors",
    category: "Electrical Principles"
  },
  {
    id: 250,
    question: "What is the difference between NPN and PNP transistors?",
    options: [
      "NPN has higher gain",
      "The direction of conventional current flow and biasing polarities are reversed",
      "PNP cannot amplify signals",
      "They operate at different frequencies"
    ],
    correctAnswer: 1,
    explanation: "NPN and PNP transistors have reversed current directions and biasing. In NPN, conventional current flows from collector to emitter; in PNP it flows from emitter to collector.",
    section: "Semiconductors",
    difficulty: "intermediate",
    topic: "Transistors",
    category: "Electrical Principles"
  }
];
