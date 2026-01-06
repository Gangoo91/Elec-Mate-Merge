// Level 3 Module 3: Electrical Science - Question Bank
// 200 advanced questions covering all Module 3 content for Level 3 Electrical Course
// Topics: Ohm's Law, AC Theory, Three-Phase, Transformers, Motors, Power Factor, Calculations

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section?: string;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
}

export const module3Questions: Question[] = [
  // ============================================
  // Section 3.1: Ohm's Law & Power (Questions 1-35)
  // ============================================
  {
    id: 1,
    question: "What is the formula for Ohm's Law?",
    options: [
      "P = I × R",
      "V = I × R",
      "I = V × R",
      "R = V × I"
    ],
    correctAnswer: 1,
    explanation: "Ohm's Law states that V = I × R, where V is voltage in volts, I is current in amps, and R is resistance in ohms.",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 2,
    question: "A circuit has a resistance of 20Ω and draws 5A. What is the voltage?",
    options: [
      "4V",
      "25V",
      "100V",
      "15V"
    ],
    correctAnswer: 2,
    explanation: "Using V = I × R: V = 5A × 20Ω = 100V",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 3,
    question: "What is the current through a 50Ω resistor connected to 230V?",
    options: [
      "4.6A",
      "11,500A",
      "0.22A",
      "280A"
    ],
    correctAnswer: 0,
    explanation: "Using I = V/R: I = 230V ÷ 50Ω = 4.6A",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 4,
    question: "What is the formula for electrical power?",
    options: [
      "P = V + I",
      "P = V × I",
      "P = V ÷ I",
      "P = V - I"
    ],
    correctAnswer: 1,
    explanation: "Electrical power P = V × I (watts = volts × amps). This can also be expressed as P = I²R or P = V²/R.",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 5,
    question: "A 230V appliance draws 10A. What is its power rating?",
    options: [
      "23W",
      "240W",
      "2,300W",
      "2.3W"
    ],
    correctAnswer: 2,
    explanation: "P = V × I = 230V × 10A = 2,300W (2.3kW)",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 6,
    question: "What is the resistance of a 2kW heater operating at 230V?",
    options: [
      "26.45Ω",
      "115Ω",
      "460,000Ω",
      "8.7Ω"
    ],
    correctAnswer: 0,
    explanation: "Using R = V²/P: R = (230)² ÷ 2000 = 52,900 ÷ 2000 = 26.45Ω",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 7,
    question: "What happens to current if resistance increases while voltage stays constant?",
    options: [
      "Current increases",
      "Current stays the same",
      "Current decreases",
      "Current fluctuates"
    ],
    correctAnswer: 2,
    explanation: "According to Ohm's Law (I = V/R), if R increases and V is constant, current I will decrease proportionally.",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 8,
    question: "Three 10Ω resistors in series have a total resistance of:",
    options: [
      "3.33Ω",
      "10Ω",
      "30Ω",
      "100Ω"
    ],
    correctAnswer: 2,
    explanation: "In series: Rtotal = R1 + R2 + R3 = 10 + 10 + 10 = 30Ω",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 9,
    question: "Three 30Ω resistors in parallel have a total resistance of:",
    options: [
      "10Ω",
      "30Ω",
      "90Ω",
      "0.1Ω"
    ],
    correctAnswer: 0,
    explanation: "In parallel with equal resistors: Rtotal = R/n = 30Ω/3 = 10Ω",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 10,
    question: "What is the total resistance of 20Ω and 30Ω in parallel?",
    options: [
      "50Ω",
      "12Ω",
      "25Ω",
      "600Ω"
    ],
    correctAnswer: 1,
    explanation: "For two resistors in parallel: Rtotal = (R1 × R2)/(R1 + R2) = (20 × 30)/(20 + 30) = 600/50 = 12Ω",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 11,
    question: "How much energy does a 3kW heater use in 2 hours?",
    options: [
      "1.5kWh",
      "6kWh",
      "5kWh",
      "1,500Wh"
    ],
    correctAnswer: 1,
    explanation: "Energy = Power × Time = 3kW × 2h = 6kWh",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 12,
    question: "What is 1 kilowatt-hour in joules?",
    options: [
      "1,000 joules",
      "3,600 joules",
      "3,600,000 joules",
      "360,000 joules"
    ],
    correctAnswer: 2,
    explanation: "1 kWh = 1000W × 3600s = 3,600,000 joules (3.6MJ)",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 13,
    question: "A cable has resistance of 0.5Ω and carries 20A. What is the voltage drop?",
    options: [
      "0.025V",
      "10V",
      "40V",
      "400V"
    ],
    correctAnswer: 1,
    explanation: "Voltage drop Vd = I × R = 20A × 0.5Ω = 10V",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 14,
    question: "What power is dissipated in a cable with 0.5Ω resistance carrying 20A?",
    options: [
      "10W",
      "40W",
      "200W",
      "400W"
    ],
    correctAnswer: 2,
    explanation: "Power loss P = I²R = (20)² × 0.5 = 400 × 0.5 = 200W",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 15,
    question: "What is the SI unit of electrical resistance?",
    options: [
      "Volt",
      "Amp",
      "Ohm",
      "Watt"
    ],
    correctAnswer: 2,
    explanation: "The ohm (Ω) is the SI unit of electrical resistance, named after Georg Ohm.",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 16,
    question: "What is conductance and its unit?",
    options: [
      "Opposition to current flow, measured in ohms",
      "The reciprocal of resistance, measured in siemens (S)",
      "Current flow, measured in amps",
      "Power dissipation, measured in watts"
    ],
    correctAnswer: 1,
    explanation: "Conductance (G) is the reciprocal of resistance (G = 1/R), measured in siemens (S). Higher conductance means lower resistance.",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 17,
    question: "How does temperature affect the resistance of copper?",
    options: [
      "Resistance decreases as temperature increases",
      "Resistance increases as temperature increases",
      "Temperature has no effect",
      "Resistance becomes zero at high temperature"
    ],
    correctAnswer: 1,
    explanation: "Copper has a positive temperature coefficient - its resistance increases as temperature rises due to increased atomic vibration.",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 18,
    question: "What is resistivity?",
    options: [
      "The total resistance of a cable",
      "A material property indicating how strongly it opposes current flow",
      "The resistance per metre",
      "The maximum allowable resistance"
    ],
    correctAnswer: 1,
    explanation: "Resistivity (ρ) is an intrinsic material property indicating opposition to current. R = ρL/A where L is length and A is cross-sectional area.",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 19,
    question: "What is the resistance of a 100m cable with resistivity 0.0172 Ω·mm²/m and CSA of 2.5mm²?",
    options: [
      "0.172Ω",
      "0.688Ω",
      "6.88Ω",
      "1.72Ω"
    ],
    correctAnswer: 1,
    explanation: "R = ρL/A = (0.0172 × 100)/2.5 = 1.72/2.5 = 0.688Ω",
    section: "3.1",
    difficulty: "advanced"
  },
  {
    id: 20,
    question: "What happens to cable resistance if you double its length?",
    options: [
      "Halves",
      "Stays the same",
      "Doubles",
      "Quadruples"
    ],
    correctAnswer: 2,
    explanation: "Resistance is directly proportional to length (R = ρL/A). Doubling length doubles resistance.",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 21,
    question: "What happens to cable resistance if you double its cross-sectional area?",
    options: [
      "Doubles",
      "Halves",
      "Quadruples",
      "Stays the same"
    ],
    correctAnswer: 1,
    explanation: "Resistance is inversely proportional to area (R = ρL/A). Doubling area halves resistance.",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 22,
    question: "In a series circuit, current is:",
    options: [
      "Different at each component",
      "The same throughout",
      "Zero",
      "Maximum at the power source"
    ],
    correctAnswer: 1,
    explanation: "In a series circuit, the same current flows through all components as there is only one path for current.",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 23,
    question: "In a parallel circuit, voltage across each branch is:",
    options: [
      "Different for each branch",
      "The same for all branches",
      "Zero",
      "Proportional to current"
    ],
    correctAnswer: 1,
    explanation: "In a parallel circuit, voltage is the same across all parallel branches as they share common connection points.",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 24,
    question: "What is Kirchhoff's Current Law (KCL)?",
    options: [
      "Voltage around a loop equals zero",
      "Sum of currents entering a node equals sum leaving",
      "Current equals voltage divided by resistance",
      "Power equals current squared times resistance"
    ],
    correctAnswer: 1,
    explanation: "KCL states that the algebraic sum of currents at any node (junction) is zero - currents entering equal currents leaving.",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 25,
    question: "What is Kirchhoff's Voltage Law (KVL)?",
    options: [
      "Sum of voltages around a closed loop equals zero",
      "Current at a node sums to zero",
      "Voltage equals current times resistance",
      "Power equals voltage times current"
    ],
    correctAnswer: 0,
    explanation: "KVL states that the algebraic sum of all voltages around any closed loop equals zero - voltage rises equal voltage drops.",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 26,
    question: "What is the power dissipated in a 100Ω resistor with 5V across it?",
    options: [
      "500W",
      "20W",
      "0.25W",
      "0.5W"
    ],
    correctAnswer: 2,
    explanation: "P = V²/R = (5)²/100 = 25/100 = 0.25W",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 27,
    question: "A 60W lamp operates for 8 hours. How many kWh of energy does it use?",
    options: [
      "480kWh",
      "7.5kWh",
      "0.48kWh",
      "4.8kWh"
    ],
    correctAnswer: 2,
    explanation: "Energy = Power × Time = 60W × 8h = 480Wh = 0.48kWh",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 28,
    question: "What is the current drawn by a 9.2kW shower on a 230V supply?",
    options: [
      "25A",
      "40A",
      "0.025A",
      "2,116A"
    ],
    correctAnswer: 1,
    explanation: "I = P/V = 9,200W ÷ 230V = 40A",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 29,
    question: "Two resistors of 6Ω and 12Ω are connected in parallel. What is their combined resistance?",
    options: [
      "18Ω",
      "4Ω",
      "2Ω",
      "72Ω"
    ],
    correctAnswer: 1,
    explanation: "Rtotal = (R1 × R2)/(R1 + R2) = (6 × 12)/(6 + 12) = 72/18 = 4Ω",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 30,
    question: "A 5Ω and 20Ω resistor are in series. What voltage appears across the 5Ω resistor if total supply is 100V?",
    options: [
      "20V",
      "80V",
      "25V",
      "5V"
    ],
    correctAnswer: 0,
    explanation: "Total R = 5 + 20 = 25Ω. Current I = 100/25 = 4A. Voltage across 5Ω = 4A × 5Ω = 20V",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 31,
    question: "What is the maximum power transfer theorem?",
    options: [
      "Maximum power is transferred when load resistance is zero",
      "Maximum power is transferred when load resistance equals source resistance",
      "Maximum power is transferred when load resistance is infinite",
      "Power transfer is independent of resistance"
    ],
    correctAnswer: 1,
    explanation: "Maximum power is transferred from source to load when the load resistance equals the internal source resistance.",
    section: "3.1",
    difficulty: "advanced"
  },
  {
    id: 32,
    question: "What is the internal resistance of an ideal voltage source?",
    options: [
      "Infinite",
      "Very high",
      "Zero",
      "Equal to load resistance"
    ],
    correctAnswer: 2,
    explanation: "An ideal voltage source has zero internal resistance, maintaining constant voltage regardless of load current.",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 33,
    question: "A battery has EMF of 12V and internal resistance of 0.5Ω. What terminal voltage with 5A load?",
    options: [
      "12V",
      "14.5V",
      "9.5V",
      "2.5V"
    ],
    correctAnswer: 2,
    explanation: "Terminal voltage = EMF - (I × internal resistance) = 12V - (5A × 0.5Ω) = 12V - 2.5V = 9.5V",
    section: "3.1",
    difficulty: "intermediate"
  },
  {
    id: 34,
    question: "What is the efficiency of a device that outputs 900W while consuming 1000W?",
    options: [
      "90%",
      "100%",
      "111%",
      "9%"
    ],
    correctAnswer: 0,
    explanation: "Efficiency = (Output Power / Input Power) × 100 = (900/1000) × 100 = 90%",
    section: "3.1",
    difficulty: "basic"
  },
  {
    id: 35,
    question: "A motor is 85% efficient and produces 2kW of mechanical output. What electrical power does it consume?",
    options: [
      "1.7kW",
      "2.35kW",
      "2kW",
      "1.7kW"
    ],
    correctAnswer: 1,
    explanation: "Input Power = Output Power / Efficiency = 2000W / 0.85 = 2,353W ≈ 2.35kW",
    section: "3.1",
    difficulty: "intermediate"
  },

  // ============================================
  // Section 3.2: AC Theory (Questions 36-70)
  // ============================================
  {
    id: 36,
    question: "What is the frequency of UK mains supply?",
    options: [
      "60Hz",
      "50Hz",
      "100Hz",
      "25Hz"
    ],
    correctAnswer: 1,
    explanation: "UK mains electricity operates at 50Hz, meaning 50 complete cycles per second.",
    section: "3.2",
    difficulty: "basic"
  },
  {
    id: 37,
    question: "What is the relationship between frequency and period?",
    options: [
      "f = T",
      "f = 1/T",
      "f = T²",
      "f = 2T"
    ],
    correctAnswer: 1,
    explanation: "Frequency (f) is the reciprocal of period (T): f = 1/T. For 50Hz, T = 1/50 = 0.02 seconds = 20ms.",
    section: "3.2",
    difficulty: "basic"
  },
  {
    id: 38,
    question: "What is the period of a 50Hz waveform?",
    options: [
      "50ms",
      "20ms",
      "10ms",
      "100ms"
    ],
    correctAnswer: 1,
    explanation: "Period T = 1/f = 1/50 = 0.02 seconds = 20ms",
    section: "3.2",
    difficulty: "basic"
  },
  {
    id: 39,
    question: "What is the peak voltage of UK 230V RMS mains?",
    options: [
      "230V",
      "163V",
      "325V",
      "460V"
    ],
    correctAnswer: 2,
    explanation: "Peak voltage Vp = Vrms × √2 = 230 × 1.414 = 325V",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 40,
    question: "What is RMS voltage?",
    options: [
      "The peak voltage",
      "The average voltage",
      "The DC equivalent that produces the same heating effect",
      "The minimum voltage"
    ],
    correctAnswer: 2,
    explanation: "RMS (Root Mean Square) voltage is the equivalent DC voltage that would produce the same power/heating effect in a resistive load.",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 41,
    question: "What is the relationship between RMS and peak values for a sine wave?",
    options: [
      "Vrms = Vp × 2",
      "Vrms = Vp / √2 (or Vp × 0.707)",
      "Vrms = Vp",
      "Vrms = Vp / 2"
    ],
    correctAnswer: 1,
    explanation: "For a sine wave: Vrms = Vp/√2 = Vp × 0.707. Conversely, Vp = Vrms × √2 = Vrms × 1.414",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 42,
    question: "What is peak-to-peak voltage?",
    options: [
      "Same as peak voltage",
      "Twice the peak voltage",
      "Half the peak voltage",
      "The average voltage"
    ],
    correctAnswer: 1,
    explanation: "Peak-to-peak voltage (Vpp) is the total swing from positive peak to negative peak = 2 × Vp. For 230V RMS: Vpp = 2 × 325V = 650V",
    section: "3.2",
    difficulty: "basic"
  },
  {
    id: 43,
    question: "What is inductive reactance?",
    options: [
      "Resistance of an inductor to DC",
      "Opposition of an inductor to AC, increasing with frequency",
      "The inductance value in henrys",
      "Power loss in an inductor"
    ],
    correctAnswer: 1,
    explanation: "Inductive reactance (XL) is the opposition to AC by an inductor: XL = 2πfL. It increases with frequency.",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 44,
    question: "What is the formula for inductive reactance?",
    options: [
      "XL = L/f",
      "XL = 2πfL",
      "XL = f/2πL",
      "XL = L × f"
    ],
    correctAnswer: 1,
    explanation: "Inductive reactance XL = 2πfL, where f is frequency in Hz and L is inductance in henrys.",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 45,
    question: "What is the inductive reactance of a 0.1H inductor at 50Hz?",
    options: [
      "5Ω",
      "31.4Ω",
      "0.5Ω",
      "314Ω"
    ],
    correctAnswer: 1,
    explanation: "XL = 2πfL = 2 × 3.14159 × 50 × 0.1 = 31.4Ω",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 46,
    question: "What is capacitive reactance?",
    options: [
      "Resistance of a capacitor to DC",
      "Opposition of a capacitor to AC, decreasing with frequency",
      "The capacitance value in farads",
      "Energy stored in a capacitor"
    ],
    correctAnswer: 1,
    explanation: "Capacitive reactance (XC) is the opposition to AC by a capacitor: XC = 1/(2πfC). It decreases with frequency.",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 47,
    question: "What is the formula for capacitive reactance?",
    options: [
      "XC = 2πfC",
      "XC = 1/(2πfC)",
      "XC = f × C",
      "XC = C/f"
    ],
    correctAnswer: 1,
    explanation: "Capacitive reactance XC = 1/(2πfC), where f is frequency in Hz and C is capacitance in farads.",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 48,
    question: "What is the capacitive reactance of a 100μF capacitor at 50Hz?",
    options: [
      "31.8Ω",
      "0.031Ω",
      "318Ω",
      "3.18Ω"
    ],
    correctAnswer: 0,
    explanation: "XC = 1/(2πfC) = 1/(2 × 3.14159 × 50 × 100×10⁻⁶) = 1/0.0314 = 31.8Ω",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 49,
    question: "In a purely inductive circuit, current lags voltage by:",
    options: [
      "45°",
      "90°",
      "180°",
      "0°"
    ],
    correctAnswer: 1,
    explanation: "In a purely inductive circuit, current lags voltage by 90° because the inductor opposes changes in current.",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 50,
    question: "In a purely capacitive circuit, current leads voltage by:",
    options: [
      "45°",
      "90°",
      "180°",
      "0°"
    ],
    correctAnswer: 1,
    explanation: "In a purely capacitive circuit, current leads voltage by 90° because capacitor current flows before voltage builds up.",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 51,
    question: "What is impedance?",
    options: [
      "Same as resistance",
      "Same as reactance",
      "Total opposition to AC, combining resistance and reactance",
      "Power factor"
    ],
    correctAnswer: 2,
    explanation: "Impedance (Z) is the total opposition to AC current, combining resistance and reactance: Z = √(R² + X²)",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 52,
    question: "A circuit has R = 30Ω and XL = 40Ω. What is the impedance?",
    options: [
      "70Ω",
      "50Ω",
      "10Ω",
      "35Ω"
    ],
    correctAnswer: 1,
    explanation: "Z = √(R² + XL²) = √(30² + 40²) = √(900 + 1600) = √2500 = 50Ω",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 53,
    question: "What is the phase angle in a circuit with R = 30Ω and XL = 40Ω?",
    options: [
      "36.87°",
      "53.13°",
      "45°",
      "90°"
    ],
    correctAnswer: 1,
    explanation: "Phase angle θ = tan⁻¹(XL/R) = tan⁻¹(40/30) = tan⁻¹(1.333) = 53.13°",
    section: "3.2",
    difficulty: "advanced"
  },
  {
    id: 54,
    question: "What is true power in an AC circuit?",
    options: [
      "V × I",
      "V × I × cos(φ)",
      "V × I × sin(φ)",
      "V²/R"
    ],
    correctAnswer: 1,
    explanation: "True (real) power P = V × I × cos(φ), measured in watts, where φ is the phase angle. It represents actual work done.",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 55,
    question: "What is reactive power?",
    options: [
      "Power dissipated in resistance",
      "Power stored and returned by inductors and capacitors",
      "Total power consumed",
      "Power lost in cables"
    ],
    correctAnswer: 1,
    explanation: "Reactive power Q = V × I × sin(φ), measured in VAr. It represents energy stored and returned by inductors and capacitors, not consumed.",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 56,
    question: "What is apparent power?",
    options: [
      "V × I × cos(φ)",
      "V × I (the product of RMS voltage and current)",
      "V × I × sin(φ)",
      "True power minus reactive power"
    ],
    correctAnswer: 1,
    explanation: "Apparent power S = V × I, measured in VA. It's the vector sum of true and reactive power: S = √(P² + Q²)",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 57,
    question: "What is the power triangle relationship?",
    options: [
      "S = P + Q",
      "S² = P² + Q²",
      "S = P × Q",
      "S = P / Q"
    ],
    correctAnswer: 1,
    explanation: "In the power triangle: S² = P² + Q², where S is apparent power (VA), P is true power (W), and Q is reactive power (VAr).",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 58,
    question: "What is power factor?",
    options: [
      "True power divided by reactive power",
      "Apparent power divided by true power",
      "True power divided by apparent power (cos φ)",
      "Reactive power divided by apparent power"
    ],
    correctAnswer: 2,
    explanation: "Power factor = True Power / Apparent Power = P/S = cos(φ). It indicates how effectively power is being used.",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 59,
    question: "A circuit draws 10A at 230V with power factor 0.8. What is the true power?",
    options: [
      "2,300W",
      "1,840W",
      "2,875W",
      "1,380W"
    ],
    correctAnswer: 1,
    explanation: "True Power P = V × I × PF = 230 × 10 × 0.8 = 1,840W",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 60,
    question: "What causes a lagging power factor?",
    options: [
      "Resistive loads",
      "Capacitive loads",
      "Inductive loads",
      "LED lighting"
    ],
    correctAnswer: 2,
    explanation: "Inductive loads (motors, transformers) cause a lagging power factor because current lags behind voltage.",
    section: "3.2",
    difficulty: "basic"
  },
  {
    id: 61,
    question: "What is resonance in an AC circuit?",
    options: [
      "When resistance equals reactance",
      "When inductive reactance equals capacitive reactance",
      "When power factor is zero",
      "When current is maximum"
    ],
    correctAnswer: 1,
    explanation: "Resonance occurs when XL = XC, causing them to cancel out. At resonance, impedance is purely resistive and current is maximum.",
    section: "3.2",
    difficulty: "advanced"
  },
  {
    id: 62,
    question: "What is the resonant frequency formula?",
    options: [
      "fr = 2π√(LC)",
      "fr = 1/(2π√(LC))",
      "fr = √(L/C)",
      "fr = LC"
    ],
    correctAnswer: 1,
    explanation: "Resonant frequency fr = 1/(2π√(LC)), where L is inductance and C is capacitance.",
    section: "3.2",
    difficulty: "advanced"
  },
  {
    id: 63,
    question: "What is the angular frequency ω?",
    options: [
      "f × 2",
      "2πf (radians per second)",
      "f / 2π",
      "f²"
    ],
    correctAnswer: 1,
    explanation: "Angular frequency ω = 2πf, measured in radians per second. It's used in reactance formulas: XL = ωL, XC = 1/(ωC)",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 64,
    question: "What is the skin effect in AC conductors?",
    options: [
      "Corrosion of conductor surface",
      "Tendency for AC current to flow near the conductor surface",
      "Heating of conductor surface",
      "Insulation breakdown"
    ],
    correctAnswer: 1,
    explanation: "Skin effect causes AC current to concentrate near the conductor surface, reducing effective cross-sectional area and increasing resistance at higher frequencies.",
    section: "3.2",
    difficulty: "advanced"
  },
  {
    id: 65,
    question: "A 230V supply has a current of 5A at 60° lagging. What is the true power?",
    options: [
      "1,150W",
      "575W",
      "997W",
      "1,000W"
    ],
    correctAnswer: 1,
    explanation: "P = V × I × cos(φ) = 230 × 5 × cos(60°) = 230 × 5 × 0.5 = 575W",
    section: "3.2",
    difficulty: "intermediate"
  },
  {
    id: 66,
    question: "What is the form factor of a sine wave?",
    options: [
      "1.0",
      "1.11",
      "1.414",
      "0.707"
    ],
    correctAnswer: 1,
    explanation: "Form factor = RMS value / Average value = (Vp/√2) / (2Vp/π) = π/(2√2) ≈ 1.11 for a sine wave",
    section: "3.2",
    difficulty: "advanced"
  },
  {
    id: 67,
    question: "What is the crest factor of a sine wave?",
    options: [
      "1.0",
      "1.11",
      "1.414",
      "0.707"
    ],
    correctAnswer: 2,
    explanation: "Crest factor (peak factor) = Peak value / RMS value = Vp / (Vp/√2) = √2 ≈ 1.414 for a sine wave",
    section: "3.2",
    difficulty: "advanced"
  },
  {
    id: 68,
    question: "What happens to capacitive reactance as frequency increases?",
    options: [
      "Increases",
      "Decreases",
      "Stays the same",
      "Becomes infinite"
    ],
    correctAnswer: 1,
    explanation: "Capacitive reactance XC = 1/(2πfC) decreases as frequency increases - capacitors pass high frequencies more easily.",
    section: "3.2",
    difficulty: "basic"
  },
  {
    id: 69,
    question: "What happens to inductive reactance as frequency increases?",
    options: [
      "Decreases",
      "Increases",
      "Stays the same",
      "Becomes zero"
    ],
    correctAnswer: 1,
    explanation: "Inductive reactance XL = 2πfL increases with frequency - inductors oppose high-frequency changes more strongly.",
    section: "3.2",
    difficulty: "basic"
  },
  {
    id: 70,
    question: "In a series RLC circuit at resonance, impedance equals:",
    options: [
      "Zero",
      "Infinite",
      "The resistance R alone",
      "XL + XC"
    ],
    correctAnswer: 2,
    explanation: "At resonance, XL = XC so they cancel, leaving only resistance. Impedance Z = R, and current is at maximum.",
    section: "3.2",
    difficulty: "advanced"
  },

  // ============================================
  // Section 3.3: Three-Phase Systems (Questions 71-100)
  // ============================================
  {
    id: 71,
    question: "What is the phase difference between phases in a three-phase supply?",
    options: [
      "90°",
      "180°",
      "120°",
      "60°"
    ],
    correctAnswer: 2,
    explanation: "In a three-phase supply, the three phases are displaced by 120° (one-third of a cycle) from each other.",
    section: "3.3",
    difficulty: "basic"
  },
  {
    id: 72,
    question: "What is the UK three-phase line voltage?",
    options: [
      "230V",
      "400V",
      "415V",
      "440V"
    ],
    correctAnswer: 1,
    explanation: "UK three-phase line voltage (between phases) is 400V. Phase voltage (to neutral) is 230V. Ratio is √3 (1.732).",
    section: "3.3",
    difficulty: "basic"
  },
  {
    id: 73,
    question: "What is the relationship between line and phase voltage in a star connection?",
    options: [
      "VL = Vp",
      "VL = Vp × √3",
      "VL = Vp / √3",
      "VL = Vp × 3"
    ],
    correctAnswer: 1,
    explanation: "In a star (wye) connection: VL = Vp × √3. UK: 230V phase × 1.732 = 400V line.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 74,
    question: "What is the relationship between line and phase current in a star connection?",
    options: [
      "IL = Ip × √3",
      "IL = Ip / √3",
      "IL = Ip (same)",
      "IL = Ip × 3"
    ],
    correctAnswer: 2,
    explanation: "In a star connection, line current equals phase current: IL = Ip, because the line current flows directly through each phase.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 75,
    question: "What is the relationship between line and phase voltage in a delta connection?",
    options: [
      "VL = Vp × √3",
      "VL = Vp / √3",
      "VL = Vp (same)",
      "VL = Vp × 3"
    ],
    correctAnswer: 2,
    explanation: "In a delta connection, line voltage equals phase voltage: VL = Vp, because each phase is connected across two lines.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 76,
    question: "What is the relationship between line and phase current in a delta connection?",
    options: [
      "IL = Ip (same)",
      "IL = Ip × √3",
      "IL = Ip / √3",
      "IL = Ip × 3"
    ],
    correctAnswer: 1,
    explanation: "In a delta connection: IL = Ip × √3. Line current is √3 times the phase current because two phase currents combine at each line.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 77,
    question: "What is the formula for three-phase power in a balanced load?",
    options: [
      "P = VL × IL",
      "P = √3 × VL × IL × cos(φ)",
      "P = 3 × VL × IL × cos(φ)",
      "P = VL × IL × cos(φ)"
    ],
    correctAnswer: 1,
    explanation: "Three-phase power P = √3 × VL × IL × cos(φ), or equivalently P = 3 × Vp × Ip × cos(φ)",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 78,
    question: "A balanced three-phase load draws 20A per phase at 400V line voltage, PF = 0.85. What is the total power?",
    options: [
      "8kW",
      "13.6kW",
      "11.78kW",
      "6.8kW"
    ],
    correctAnswer: 2,
    explanation: "P = √3 × VL × IL × PF = 1.732 × 400 × 20 × 0.85 = 11,782W ≈ 11.78kW",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 79,
    question: "What is the main advantage of three-phase over single-phase power?",
    options: [
      "Lower voltage",
      "Smoother power delivery and more efficient for motors",
      "Simpler wiring",
      "Lower cost"
    ],
    correctAnswer: 1,
    explanation: "Three-phase provides smoother power delivery (constant, not pulsating), is more efficient for motors, and transmits more power with less conductor material.",
    section: "3.3",
    difficulty: "basic"
  },
  {
    id: 80,
    question: "What is a balanced three-phase load?",
    options: [
      "Loads on all three phases",
      "Equal load on each phase with equal phase angles",
      "Any load using all three phases",
      "A load with unity power factor"
    ],
    correctAnswer: 1,
    explanation: "A balanced load has equal impedance on each phase, drawing equal currents at equal phase angles. The neutral carries no current in a balanced system.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 81,
    question: "What current flows in the neutral of a balanced three-phase star load?",
    options: [
      "Line current × 3",
      "Line current × √3",
      "Zero",
      "Line current"
    ],
    correctAnswer: 2,
    explanation: "In a balanced three-phase system, the three phase currents sum to zero at any instant due to their 120° phase displacement, so neutral current is zero.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 82,
    question: "What is the purpose of the neutral conductor in a three-phase system?",
    options: [
      "To carry the sum of all phase currents",
      "To provide a return path for unbalanced currents and single-phase loads",
      "To provide earth fault protection",
      "To increase voltage"
    ],
    correctAnswer: 1,
    explanation: "The neutral provides a return path for any unbalanced currents and allows connection of single-phase loads between phase and neutral.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 83,
    question: "What is phase rotation (phase sequence)?",
    options: [
      "The physical rotation of cables",
      "The order in which the three phases reach their peak values",
      "The rotation speed of motors",
      "The cable colour sequence"
    ],
    correctAnswer: 1,
    explanation: "Phase rotation indicates the sequence in which phases reach their maximum values (L1-L2-L3 or L1-L3-L2). It determines motor rotation direction.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 84,
    question: "What happens if two phases of a three-phase motor supply are swapped?",
    options: [
      "Motor won't run",
      "Motor reverses direction",
      "Motor runs faster",
      "Motor runs slower"
    ],
    correctAnswer: 1,
    explanation: "Swapping any two phases reverses the phase rotation, causing three-phase motors to run in the opposite direction.",
    section: "3.3",
    difficulty: "basic"
  },
  {
    id: 85,
    question: "What is a star-delta starter used for?",
    options: [
      "Controlling motor speed",
      "Reducing starting current of large three-phase motors",
      "Reversing motor direction",
      "Emergency stopping"
    ],
    correctAnswer: 1,
    explanation: "Star-delta starting reduces motor starting current to about 1/3 of direct-on-line current by initially connecting windings in star, then switching to delta.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 86,
    question: "By what factor does star-delta starting reduce starting current compared to DOL?",
    options: [
      "Half",
      "One-third",
      "One-quarter",
      "Two-thirds"
    ],
    correctAnswer: 1,
    explanation: "Star-delta starting reduces voltage per winding by √3, so starting current is reduced to approximately 1/3 of DOL starting current.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 87,
    question: "What is the UK colour coding for three-phase conductors?",
    options: [
      "Red, Yellow, Blue",
      "Brown, Black, Grey",
      "L1, L2, L3",
      "Red, White, Blue"
    ],
    correctAnswer: 1,
    explanation: "UK harmonised colours for three-phase are: L1=Brown, L2=Black, L3=Grey, N=Blue, Earth=Green/Yellow",
    section: "3.3",
    difficulty: "basic"
  },
  {
    id: 88,
    question: "A three-phase motor is rated at 15kW with efficiency 90% and PF 0.85. What is the line current at 400V?",
    options: [
      "25.4A",
      "28.3A",
      "21.6A",
      "32.4A"
    ],
    correctAnswer: 1,
    explanation: "Input power = 15000/0.9 = 16,667W. I = P/(√3 × VL × PF) = 16,667/(1.732 × 400 × 0.85) = 28.3A",
    section: "3.3",
    difficulty: "advanced"
  },
  {
    id: 89,
    question: "What is the neutral current if phase currents are L1=30A, L2=20A, L3=25A (all in phase with their voltages)?",
    options: [
      "75A",
      "25A",
      "Approximately 8.66A",
      "Zero"
    ],
    correctAnswer: 2,
    explanation: "For unbalanced loads, neutral current requires vector addition of the three phase currents. Simple calculation gives approximately 8.66A for this example.",
    section: "3.3",
    difficulty: "advanced"
  },
  {
    id: 90,
    question: "What is a four-wire three-phase system?",
    options: [
      "Three phases plus earth",
      "Three phases plus neutral",
      "Four phases",
      "Three phases plus two neutrals"
    ],
    correctAnswer: 1,
    explanation: "A four-wire three-phase system has three phase conductors plus a neutral, allowing both three-phase and single-phase loads to be connected.",
    section: "3.3",
    difficulty: "basic"
  },
  {
    id: 91,
    question: "What is a three-wire three-phase system?",
    options: [
      "Three phases with no neutral",
      "Three phases with earth only",
      "Two phases plus neutral",
      "Three phase delta supply only"
    ],
    correctAnswer: 0,
    explanation: "A three-wire system has only the three phase conductors with no neutral. Used for balanced loads like motors or delta-connected equipment.",
    section: "3.3",
    difficulty: "basic"
  },
  {
    id: 92,
    question: "What is the total apparent power of a balanced three-phase load?",
    options: [
      "S = VL × IL",
      "S = √3 × VL × IL",
      "S = 3 × VL × IL",
      "S = VL × IL × √3/2"
    ],
    correctAnswer: 1,
    explanation: "Three-phase apparent power S = √3 × VL × IL (in VA or kVA), regardless of power factor.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 93,
    question: "What is phase voltage in a 400V three-phase system?",
    options: [
      "400V",
      "693V",
      "231V",
      "133V"
    ],
    correctAnswer: 2,
    explanation: "Phase voltage Vp = VL/√3 = 400/1.732 = 231V (≈230V)",
    section: "3.3",
    difficulty: "basic"
  },
  {
    id: 94,
    question: "A 400V three-phase heater has three 50Ω elements in star. What is the total power?",
    options: [
      "3,174W",
      "9,600W",
      "3,200W",
      "5,529W"
    ],
    correctAnswer: 0,
    explanation: "Phase voltage = 400/√3 = 231V. Power per phase = V²/R = 231²/50 = 1,067W. Total = 3 × 1,067 = 3,200W (approximately 3,174W exact)",
    section: "3.3",
    difficulty: "advanced"
  },
  {
    id: 95,
    question: "The same 50Ω elements connected in delta across 400V would dissipate:",
    options: [
      "3,200W",
      "9,600W",
      "5,542W",
      "1,067W"
    ],
    correctAnswer: 1,
    explanation: "In delta, each element sees 400V. Power per phase = 400²/50 = 3,200W. Total = 3 × 3,200 = 9,600W (three times star power)",
    section: "3.3",
    difficulty: "advanced"
  },
  {
    id: 96,
    question: "What instrument measures phase rotation?",
    options: [
      "Multimeter",
      "Phase rotation indicator/meter",
      "Oscilloscope only",
      "Clamp meter"
    ],
    correctAnswer: 1,
    explanation: "A phase rotation indicator (or phase sequence indicator) determines the direction of phase rotation before connecting motors or sensitive equipment.",
    section: "3.3",
    difficulty: "basic"
  },
  {
    id: 97,
    question: "What is an unbalanced load?",
    options: [
      "A load that is too heavy",
      "A load with unequal current draw on each phase",
      "A load connected incorrectly",
      "A load with poor power factor"
    ],
    correctAnswer: 1,
    explanation: "An unbalanced load draws different currents on each phase. This causes neutral current to flow and can cause voltage unbalance.",
    section: "3.3",
    difficulty: "basic"
  },
  {
    id: 98,
    question: "What problems can phase unbalance cause in three-phase motors?",
    options: [
      "No problems",
      "Increased heating, reduced torque, and potential motor damage",
      "Faster operation",
      "Only direction issues"
    ],
    correctAnswer: 1,
    explanation: "Phase unbalance causes uneven currents in motor windings, leading to overheating, reduced efficiency, lower torque, vibration, and potential damage.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 99,
    question: "What percentage voltage unbalance is typically acceptable for motors?",
    options: [
      "Up to 10%",
      "Up to 2-3%",
      "Up to 5%",
      "Any unbalance is acceptable"
    ],
    correctAnswer: 1,
    explanation: "Voltage unbalance should generally be kept below 2-3%. Even small voltage unbalance causes much larger current unbalance in motors.",
    section: "3.3",
    difficulty: "intermediate"
  },
  {
    id: 100,
    question: "A 22kW three-phase motor at 400V, PF=0.88, efficiency=91%. What is the line current?",
    options: [
      "31.7A",
      "39.5A",
      "44.7A",
      "35.2A"
    ],
    correctAnswer: 1,
    explanation: "Input = 22000/0.91 = 24,176W. IL = P/(√3 × VL × PF) = 24,176/(1.732 × 400 × 0.88) = 39.5A",
    section: "3.3",
    difficulty: "advanced"
  },

  // ============================================
  // Section 3.4: Transformers (Questions 101-125)
  // ============================================
  {
    id: 101,
    question: "What is the basic principle of a transformer?",
    options: [
      "Electrostatic induction",
      "Electromagnetic induction",
      "Chemical energy conversion",
      "Thermal energy transfer"
    ],
    correctAnswer: 1,
    explanation: "Transformers work on electromagnetic induction - a changing current in the primary creates a changing magnetic field that induces voltage in the secondary.",
    section: "3.4",
    difficulty: "basic"
  },
  {
    id: 102,
    question: "What determines the voltage ratio of a transformer?",
    options: [
      "The core material",
      "The turns ratio (N2/N1)",
      "The power rating",
      "The frequency"
    ],
    correctAnswer: 1,
    explanation: "Voltage ratio equals turns ratio: V2/V1 = N2/N1. Double the secondary turns doubles the secondary voltage.",
    section: "3.4",
    difficulty: "basic"
  },
  {
    id: 103,
    question: "A transformer has 500 primary turns and 50 secondary turns. If primary voltage is 230V, what is secondary voltage?",
    options: [
      "2,300V",
      "23V",
      "2.3V",
      "115V"
    ],
    correctAnswer: 1,
    explanation: "V2 = V1 × (N2/N1) = 230 × (50/500) = 230 × 0.1 = 23V. This is a step-down transformer (10:1 ratio).",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 104,
    question: "What is a step-up transformer?",
    options: [
      "A transformer that increases current",
      "A transformer that increases voltage",
      "A transformer on steps",
      "A transformer with variable output"
    ],
    correctAnswer: 1,
    explanation: "A step-up transformer has more secondary turns than primary, so output voltage is higher than input voltage.",
    section: "3.4",
    difficulty: "basic"
  },
  {
    id: 105,
    question: "In an ideal transformer, if voltage is stepped up, what happens to current?",
    options: [
      "Current also increases",
      "Current decreases proportionally",
      "Current stays the same",
      "Current becomes zero"
    ],
    correctAnswer: 1,
    explanation: "Power is conserved in an ideal transformer: P1 = P2, so V1I1 = V2I2. If voltage doubles, current halves.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 106,
    question: "A 100VA transformer has 230V primary and 12V secondary. What is the maximum secondary current?",
    options: [
      "0.43A",
      "8.33A",
      "100A",
      "19.2A"
    ],
    correctAnswer: 1,
    explanation: "VA = V × I, so Isec = VA/Vsec = 100/12 = 8.33A",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 107,
    question: "What is transformer efficiency typically?",
    options: [
      "50-60%",
      "70-80%",
      "95-99%",
      "100%"
    ],
    correctAnswer: 2,
    explanation: "Transformers are highly efficient devices, typically 95-99% efficient, with losses mainly from core hysteresis, eddy currents, and winding resistance.",
    section: "3.4",
    difficulty: "basic"
  },
  {
    id: 108,
    question: "What causes eddy current losses in transformers?",
    options: [
      "Poor connections",
      "Circulating currents induced in the iron core",
      "Overloading",
      "Low frequency"
    ],
    correctAnswer: 1,
    explanation: "Eddy currents are circular currents induced in the iron core by the changing magnetic field. They cause heating and energy loss.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 109,
    question: "How are eddy current losses minimised?",
    options: [
      "Using solid iron cores",
      "Using laminated cores (thin insulated sheets)",
      "Using copper cores",
      "Using lower voltage"
    ],
    correctAnswer: 1,
    explanation: "Laminating the core (using thin insulated sheets) increases resistance to eddy currents, reducing losses significantly.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 110,
    question: "What are hysteresis losses in transformers?",
    options: [
      "Losses due to wire resistance",
      "Energy lost in repeatedly magnetising and demagnetising the core",
      "Losses due to leakage flux",
      "Losses in the insulation"
    ],
    correctAnswer: 1,
    explanation: "Hysteresis losses occur because energy is required to repeatedly reverse the magnetic domains in the core material during each AC cycle.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 111,
    question: "What is the purpose of an isolation transformer?",
    options: [
      "To increase voltage",
      "To provide electrical isolation between primary and secondary with no voltage change",
      "To reduce power",
      "To store energy"
    ],
    correctAnswer: 1,
    explanation: "An isolation transformer (1:1 ratio) provides electrical isolation between input and output circuits for safety, without changing voltage.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 112,
    question: "Why can't transformers work with DC?",
    options: [
      "DC is too dangerous",
      "No changing current means no changing magnetic field, so no induced voltage",
      "DC has wrong polarity",
      "Transformers can work with DC"
    ],
    correctAnswer: 1,
    explanation: "Transformers require a changing magnetic field to induce voltage. DC produces a steady magnetic field, so no voltage is induced in the secondary.",
    section: "3.4",
    difficulty: "basic"
  },
  {
    id: 113,
    question: "What is a current transformer (CT) used for?",
    options: [
      "Increasing current",
      "Measuring high currents by stepping them down to a safe measurable level",
      "Converting AC to DC",
      "Storing current"
    ],
    correctAnswer: 1,
    explanation: "Current transformers step down high currents to lower values (typically 1A or 5A) safe for measurement and metering instruments.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 114,
    question: "Why must a CT secondary never be open-circuited while energised?",
    options: [
      "It will stop working",
      "Dangerous high voltages develop that can damage insulation and harm personnel",
      "It will reverse",
      "The primary will stop"
    ],
    correctAnswer: 1,
    explanation: "Open-circuiting a CT removes the demagnetising effect of secondary current, causing core saturation and dangerous high voltages on the secondary.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 115,
    question: "What is a voltage transformer (VT/PT) used for?",
    options: [
      "Boosting supply voltage",
      "Stepping down high voltage for measurement and protection circuits",
      "Creating high voltage",
      "Filtering voltage"
    ],
    correctAnswer: 1,
    explanation: "Voltage transformers (potential transformers) step down high voltages to standard values (typically 110V) for safe measurement and protection relay operation.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 116,
    question: "What is an auto-transformer?",
    options: [
      "An automatic transformer",
      "A transformer with a single winding serving as both primary and secondary",
      "A car transformer",
      "A digital transformer"
    ],
    correctAnswer: 1,
    explanation: "An auto-transformer has one winding with taps, with part of the winding common to both primary and secondary. More efficient but no isolation.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 117,
    question: "What advantage does an auto-transformer have?",
    options: [
      "Better isolation",
      "Smaller, lighter, cheaper, and more efficient for small voltage changes",
      "Higher voltage capability",
      "Better regulation"
    ],
    correctAnswer: 1,
    explanation: "Auto-transformers are smaller, lighter, and more efficient than two-winding transformers for small voltage differences, but provide no isolation.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 118,
    question: "What is voltage regulation in transformers?",
    options: [
      "Maintaining constant input voltage",
      "The change in secondary voltage from no-load to full-load, expressed as a percentage",
      "Adjusting transformer taps",
      "Protecting against overvoltage"
    ],
    correctAnswer: 1,
    explanation: "Voltage regulation = (Vno-load - Vfull-load)/Vfull-load × 100%. Good regulation means small voltage change with varying load.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 119,
    question: "What is transformer impedance (Z%)?",
    options: [
      "The physical size",
      "The percentage voltage drop at full load due to resistance and reactance",
      "The efficiency",
      "The insulation class"
    ],
    correctAnswer: 1,
    explanation: "Impedance voltage (Z%) is the primary voltage needed to circulate full-load current with the secondary short-circuited, expressed as a percentage.",
    section: "3.4",
    difficulty: "advanced"
  },
  {
    id: 120,
    question: "A 1000kVA transformer has 5% impedance. What is the fault current with a secondary short circuit?",
    options: [
      "20 × full load current",
      "5 × full load current",
      "100 × full load current",
      "50 × full load current"
    ],
    correctAnswer: 0,
    explanation: "Short circuit current = Full load current / (Z%/100) = FLC / 0.05 = 20 × FLC",
    section: "3.4",
    difficulty: "advanced"
  },
  {
    id: 121,
    question: "What is a three-phase transformer connection Dy11?",
    options: [
      "Delta primary, star secondary with 11 o'clock phase shift",
      "Star primary, delta secondary",
      "Three separate transformers",
      "A broken transformer"
    ],
    correctAnswer: 0,
    explanation: "Dy11 indicates Delta primary (D), star secondary (y), with secondary leading primary by 30° (11 o'clock position on a clock diagram).",
    section: "3.4",
    difficulty: "advanced"
  },
  {
    id: 122,
    question: "Why is oil used in large transformers?",
    options: [
      "For lubrication",
      "For cooling and insulation",
      "To reduce noise",
      "To increase efficiency"
    ],
    correctAnswer: 1,
    explanation: "Transformer oil provides electrical insulation and helps remove heat from the windings through convection.",
    section: "3.4",
    difficulty: "basic"
  },
  {
    id: 123,
    question: "What is a tap changer used for?",
    options: [
      "Changing transformer oil",
      "Adjusting the turns ratio to regulate output voltage",
      "Connecting multiple transformers",
      "Emergency shutdown"
    ],
    correctAnswer: 1,
    explanation: "Tap changers allow adjustment of the turns ratio (by selecting different winding taps) to compensate for voltage variations and maintain output voltage.",
    section: "3.4",
    difficulty: "intermediate"
  },
  {
    id: 124,
    question: "What is the kVA rating of a transformer?",
    options: [
      "Its voltage",
      "Its maximum continuous apparent power output",
      "Its weight",
      "Its efficiency"
    ],
    correctAnswer: 1,
    explanation: "kVA rating is the maximum continuous apparent power the transformer can deliver without exceeding temperature limits.",
    section: "3.4",
    difficulty: "basic"
  },
  {
    id: 125,
    question: "A 50kVA transformer at 400V secondary can deliver maximum current of:",
    options: [
      "125A",
      "72.2A",
      "50A",
      "200A"
    ],
    correctAnswer: 1,
    explanation: "For three-phase: I = kVA × 1000/(√3 × V) = 50,000/(1.732 × 400) = 72.2A",
    section: "3.4",
    difficulty: "intermediate"
  },

  // ============================================
  // Section 3.5: Motors & Generators (Questions 126-160)
  // ============================================
  {
    id: 126,
    question: "What is the principle of motor operation?",
    options: [
      "Electromagnetic induction",
      "Current-carrying conductor in a magnetic field experiences a force",
      "Electrostatic attraction",
      "Thermal expansion"
    ],
    correctAnswer: 1,
    explanation: "Motors work on the principle that a current-carrying conductor in a magnetic field experiences a force (Fleming's Left Hand Rule).",
    section: "3.5",
    difficulty: "basic"
  },
  {
    id: 127,
    question: "What is the principle of generator operation?",
    options: [
      "Current-carrying conductor in magnetic field",
      "Moving a conductor through a magnetic field induces an EMF",
      "Magnetic field stores energy",
      "Electrostatic induction"
    ],
    correctAnswer: 1,
    explanation: "Generators work on electromagnetic induction - moving a conductor through a magnetic field (or vice versa) induces an EMF (Fleming's Right Hand Rule).",
    section: "3.5",
    difficulty: "basic"
  },
  {
    id: 128,
    question: "What does Fleming's Left Hand Rule determine?",
    options: [
      "Direction of induced current",
      "Direction of force on a current-carrying conductor in a magnetic field (motor action)",
      "Direction of magnetic field",
      "Direction of electron flow"
    ],
    correctAnswer: 1,
    explanation: "Fleming's Left Hand Rule gives the direction of force on a current-carrying conductor: First finger=Field, seCond finger=Current, thuMb=Motion.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 129,
    question: "What does Fleming's Right Hand Rule determine?",
    options: [
      "Direction of motor rotation",
      "Direction of induced EMF in a generator",
      "Direction of magnetic field",
      "Direction of force"
    ],
    correctAnswer: 1,
    explanation: "Fleming's Right Hand Rule gives the direction of induced EMF (generator action): First finger=Field, thuMb=Motion, seCond finger=Current/EMF.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 130,
    question: "What is an induction motor?",
    options: [
      "A motor with permanent magnets",
      "A motor where the rotor current is induced by the stator's rotating magnetic field",
      "A motor using DC supply",
      "A motor with brushes"
    ],
    correctAnswer: 1,
    explanation: "In an induction motor, the rotating stator magnetic field induces currents in the rotor conductors, which then experience a force producing rotation.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 131,
    question: "What is synchronous speed?",
    options: [
      "The actual motor speed",
      "The speed of the rotating magnetic field, determined by supply frequency and number of poles",
      "The speed at full load",
      "The starting speed"
    ],
    correctAnswer: 1,
    explanation: "Synchronous speed Ns = (120 × f) / p, where f is frequency in Hz and p is number of poles. At 50Hz, 4-pole: Ns = 1500 RPM.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 132,
    question: "What is the synchronous speed of a 4-pole motor at 50Hz?",
    options: [
      "3000 RPM",
      "1500 RPM",
      "1000 RPM",
      "750 RPM"
    ],
    correctAnswer: 1,
    explanation: "Ns = (120 × f) / p = (120 × 50) / 4 = 6000/4 = 1500 RPM",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 133,
    question: "What is slip in an induction motor?",
    options: [
      "A fault condition",
      "The difference between synchronous speed and actual rotor speed",
      "Belt slippage",
      "Bearing wear"
    ],
    correctAnswer: 1,
    explanation: "Slip is the difference between synchronous and rotor speed, usually expressed as a percentage: s = (Ns - Nr)/Ns × 100%",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 134,
    question: "A 4-pole motor has synchronous speed 1500 RPM and runs at 1440 RPM. What is the slip?",
    options: [
      "6%",
      "4%",
      "2%",
      "60 RPM"
    ],
    correctAnswer: 1,
    explanation: "Slip = (Ns - Nr)/Ns × 100% = (1500 - 1440)/1500 × 100% = 60/1500 × 100% = 4%",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 135,
    question: "Why does an induction motor need slip to operate?",
    options: [
      "It doesn't need slip",
      "Without slip, there would be no relative motion between rotor and field, so no induced current",
      "To reduce speed",
      "For cooling"
    ],
    correctAnswer: 1,
    explanation: "Slip creates relative motion between the rotor and rotating field. This relative motion is needed to induce current in the rotor and produce torque.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 136,
    question: "What type of rotor does a squirrel cage motor have?",
    options: [
      "Wound rotor with slip rings",
      "Rotor with aluminium or copper bars short-circuited by end rings",
      "Permanent magnet rotor",
      "DC armature"
    ],
    correctAnswer: 1,
    explanation: "A squirrel cage rotor has conductive bars (aluminium or copper) short-circuited at both ends by rings, resembling a squirrel cage.",
    section: "3.5",
    difficulty: "basic"
  },
  {
    id: 137,
    question: "What is the advantage of a squirrel cage motor?",
    options: [
      "Variable speed",
      "Simple, robust, low maintenance, and lower cost",
      "High starting torque",
      "Speed control"
    ],
    correctAnswer: 1,
    explanation: "Squirrel cage motors are simple, robust, require minimal maintenance (no brushes or slip rings), and are less expensive than wound rotor motors.",
    section: "3.5",
    difficulty: "basic"
  },
  {
    id: 138,
    question: "What is the typical starting current of a squirrel cage motor compared to full load current?",
    options: [
      "Same as full load",
      "2-3 times full load",
      "6-8 times full load",
      "Half of full load"
    ],
    correctAnswer: 2,
    explanation: "Direct-on-line starting current is typically 6-8 times full load current, which is why starting methods are used for large motors.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 139,
    question: "What is a Variable Frequency Drive (VFD)?",
    options: [
      "A type of motor",
      "An electronic device that controls motor speed by varying the supply frequency",
      "A generator controller",
      "A voltage regulator"
    ],
    correctAnswer: 1,
    explanation: "A VFD (or Variable Speed Drive) controls motor speed by varying the frequency and voltage of the power supplied to an AC motor.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 140,
    question: "Why is V/f ratio kept constant in VFD control?",
    options: [
      "To save energy",
      "To maintain constant magnetic flux and prevent motor overheating",
      "To increase torque",
      "To reduce noise"
    ],
    correctAnswer: 1,
    explanation: "Keeping V/f constant maintains constant magnetic flux in the motor. Reducing frequency without reducing voltage would cause core saturation and overheating.",
    section: "3.5",
    difficulty: "advanced"
  },
  {
    id: 141,
    question: "What is a soft starter?",
    options: [
      "A slow motor",
      "A device that reduces starting current by gradually increasing voltage",
      "A padded starter button",
      "A low-torque motor"
    ],
    correctAnswer: 1,
    explanation: "A soft starter uses thyristors to gradually increase voltage to the motor during starting, reducing starting current and mechanical stress.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 142,
    question: "What is the main function of motor starters?",
    options: [
      "Only to turn motors on",
      "To provide starting, stopping, protection, and sometimes speed control",
      "To generate power",
      "To cool motors"
    ],
    correctAnswer: 1,
    explanation: "Motor starters provide controlled starting, stopping, overload protection, and may provide reduced voltage starting and other control functions.",
    section: "3.5",
    difficulty: "basic"
  },
  {
    id: 143,
    question: "What is DOL starting?",
    options: [
      "Delayed On-Line starting",
      "Direct-On-Line starting - connecting the motor directly to full supply voltage",
      "Digital On-Line starting",
      "Dual On-Line starting"
    ],
    correctAnswer: 1,
    explanation: "DOL (Direct-On-Line) starting connects the motor directly to the supply at full voltage, resulting in high starting current but simple control.",
    section: "3.5",
    difficulty: "basic"
  },
  {
    id: 144,
    question: "What is the purpose of a motor overload relay?",
    options: [
      "To start the motor",
      "To protect the motor from excessive current that could cause overheating",
      "To increase motor power",
      "To control speed"
    ],
    correctAnswer: 1,
    explanation: "Overload relays protect motors from sustained overcurrent that could cause overheating and winding damage, typically set at 105-125% of full load current.",
    section: "3.5",
    difficulty: "basic"
  },
  {
    id: 145,
    question: "What is the difference between overload and short circuit protection?",
    options: [
      "They are the same",
      "Overload protects against moderate sustained overcurrent; short circuit protects against very high fault currents",
      "Short circuit protection is slower",
      "Overload protection is faster"
    ],
    correctAnswer: 1,
    explanation: "Overload protection is slow (allows starting current) but trips on sustained moderate overcurrent. Short circuit protection trips instantly on very high fault currents.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 146,
    question: "What is motor power factor typically like?",
    options: [
      "Always unity (1.0)",
      "Lagging, typically 0.8-0.9 at full load",
      "Leading",
      "Zero"
    ],
    correctAnswer: 1,
    explanation: "Induction motors have lagging power factor due to magnetising current. At full load, PF is typically 0.8-0.9; at light loads it's much lower.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 147,
    question: "What is motor efficiency typically?",
    options: [
      "50-60%",
      "70-95% depending on size and type",
      "100%",
      "30-40%"
    ],
    correctAnswer: 1,
    explanation: "Motor efficiency varies with size: small motors 70-85%, larger motors 90-95%+. IE efficiency classes define minimum efficiency levels.",
    section: "3.5",
    difficulty: "basic"
  },
  {
    id: 148,
    question: "What are motor IE efficiency classes?",
    options: [
      "Installation categories",
      "International Efficiency classes - IE1 (Standard) to IE5 (Ultra Premium)",
      "Insulation classes",
      "Protection ratings"
    ],
    correctAnswer: 1,
    explanation: "IE classes define motor efficiency levels: IE1 (Standard), IE2 (High), IE3 (Premium), IE4 (Super Premium), IE5 (Ultra Premium).",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 149,
    question: "What is a single-phase induction motor?",
    options: [
      "A three-phase motor on one phase",
      "A motor designed to run on single-phase supply using starting mechanisms",
      "A smaller motor",
      "A DC motor"
    ],
    correctAnswer: 1,
    explanation: "Single-phase induction motors need auxiliary starting means (capacitor, split-phase, shaded pole) as single-phase supply doesn't create a rotating field directly.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 150,
    question: "What is a capacitor-start motor?",
    options: [
      "A motor stored with a capacitor",
      "A single-phase motor using a capacitor to create phase shift for starting",
      "A motor that starts slowly",
      "A DC motor with capacitor"
    ],
    correctAnswer: 1,
    explanation: "A capacitor-start motor uses a capacitor in series with a starting winding to create phase shift, producing a rotating field for starting.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 151,
    question: "What is a synchronous motor?",
    options: [
      "A fast motor",
      "A motor that runs at exactly synchronous speed",
      "A motor synchronised to another",
      "An automatic motor"
    ],
    correctAnswer: 1,
    explanation: "A synchronous motor runs at exactly synchronous speed, with no slip. It requires DC excitation or permanent magnets and is used where precise speed is needed.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 152,
    question: "What is back-EMF in a motor?",
    options: [
      "Voltage from the motor terminals",
      "The voltage induced in motor windings that opposes the supply, increasing with speed",
      "Reverse voltage",
      "Negative voltage"
    ],
    correctAnswer: 1,
    explanation: "Back-EMF is voltage induced in the motor windings opposing the supply (like a generator). It increases with speed and limits motor current.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 153,
    question: "Why is starting current so high in motors?",
    options: [
      "Motor fault",
      "At standstill, there is no back-EMF to oppose supply, so only winding resistance limits current",
      "High torque requirement",
      "Cold windings"
    ],
    correctAnswer: 1,
    explanation: "At standstill, back-EMF is zero (no rotation). Only the low winding resistance limits current, resulting in high starting current.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 154,
    question: "What is a permanent magnet motor?",
    options: [
      "A motor that can't be stopped",
      "A motor using permanent magnets instead of electromagnetic field windings",
      "A motor fixed in place",
      "A heavy motor"
    ],
    correctAnswer: 1,
    explanation: "Permanent magnet motors use permanent magnets (often in the rotor) instead of electromagnets, offering high efficiency and power density.",
    section: "3.5",
    difficulty: "basic"
  },
  {
    id: 155,
    question: "What is a brushless DC (BLDC) motor?",
    options: [
      "A DC motor without brushes, using electronic commutation",
      "A very clean motor",
      "A motor that doesn't need oil",
      "A wireless motor"
    ],
    correctAnswer: 0,
    explanation: "BLDC motors have permanent magnet rotors and wound stators. Electronic commutation replaces mechanical brushes, improving reliability and efficiency.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 156,
    question: "What is motor torque?",
    options: [
      "Motor speed",
      "Rotational force produced by the motor, measured in Nm",
      "Motor power",
      "Motor efficiency"
    ],
    correctAnswer: 1,
    explanation: "Torque is the rotational force a motor produces, measured in Newton-metres (Nm). Power = Torque × Angular velocity.",
    section: "3.5",
    difficulty: "basic"
  },
  {
    id: 157,
    question: "What is the relationship between power, torque, and speed?",
    options: [
      "P = T + n",
      "P = (2π × n × T) / 60 where n is RPM",
      "P = T / n",
      "P = T × n / 1000"
    ],
    correctAnswer: 1,
    explanation: "Power (W) = (2π × n × T) / 60, where n is speed in RPM and T is torque in Nm. Or P = ω × T where ω is rad/s.",
    section: "3.5",
    difficulty: "advanced"
  },
  {
    id: 158,
    question: "What is the IP rating of a motor?",
    options: [
      "Internet Protocol rating",
      "Ingress Protection - protection against solid objects and liquids",
      "Internal Power rating",
      "Installation Position"
    ],
    correctAnswer: 1,
    explanation: "IP rating (e.g., IP55) indicates protection against ingress of solids (first digit) and liquids (second digit). Higher numbers mean better protection.",
    section: "3.5",
    difficulty: "basic"
  },
  {
    id: 159,
    question: "What does motor insulation Class F mean?",
    options: [
      "Fire resistant",
      "Maximum temperature rating of 155°C for the winding insulation",
      "French standard",
      "Fast insulation"
    ],
    correctAnswer: 1,
    explanation: "Insulation classes indicate maximum operating temperature: Class B=130°C, Class F=155°C, Class H=180°C. Exceeding these shortens insulation life.",
    section: "3.5",
    difficulty: "intermediate"
  },
  {
    id: 160,
    question: "What is regenerative braking in motors?",
    options: [
      "Using new brake pads",
      "Converting kinetic energy back to electrical energy during deceleration",
      "Emergency braking",
      "Self-repairing brakes"
    ],
    correctAnswer: 1,
    explanation: "Regenerative braking converts mechanical kinetic energy back to electrical energy (motor acts as generator during braking), which can be returned to supply or dissipated.",
    section: "3.5",
    difficulty: "intermediate"
  },

  // ============================================
  // Section 3.6: Power Factor (Questions 161-185)
  // ============================================
  {
    id: 161,
    question: "What is power factor?",
    options: [
      "Voltage divided by current",
      "The ratio of true power to apparent power (cos φ)",
      "Current times voltage",
      "Resistance divided by impedance"
    ],
    correctAnswer: 1,
    explanation: "Power factor is the ratio of true power (W) to apparent power (VA): PF = P/S = cos φ. It indicates how effectively power is used.",
    section: "3.6",
    difficulty: "basic"
  },
  {
    id: 162,
    question: "What is the ideal power factor?",
    options: [
      "0",
      "0.5",
      "1.0 (unity)",
      "-1.0"
    ],
    correctAnswer: 2,
    explanation: "Unity power factor (1.0) is ideal - all power supplied does useful work. Current and voltage are in phase.",
    section: "3.6",
    difficulty: "basic"
  },
  {
    id: 163,
    question: "What type of load causes lagging power factor?",
    options: [
      "Resistive",
      "Capacitive",
      "Inductive",
      "LED lights"
    ],
    correctAnswer: 2,
    explanation: "Inductive loads (motors, transformers, inductors) cause lagging power factor because current lags behind voltage.",
    section: "3.6",
    difficulty: "basic"
  },
  {
    id: 164,
    question: "What type of load causes leading power factor?",
    options: [
      "Inductive",
      "Capacitive",
      "Resistive",
      "Motors"
    ],
    correctAnswer: 1,
    explanation: "Capacitive loads cause leading power factor because current leads voltage in capacitive circuits.",
    section: "3.6",
    difficulty: "basic"
  },
  {
    id: 165,
    question: "Why is low power factor undesirable?",
    options: [
      "It uses less energy",
      "Higher current needed for same power, causing increased losses and charges",
      "Equipment lasts longer",
      "It's not undesirable"
    ],
    correctAnswer: 1,
    explanation: "Low PF means higher current for the same real power, causing increased I²R losses, voltage drops, larger cable requirements, and often penalty charges.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 166,
    question: "A load draws 100kVA at 0.7 PF. How much true power is consumed?",
    options: [
      "100kW",
      "70kW",
      "143kW",
      "30kW"
    ],
    correctAnswer: 1,
    explanation: "True Power P = Apparent Power × PF = 100kVA × 0.7 = 70kW",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 167,
    question: "How is power factor corrected?",
    options: [
      "By adding more inductors",
      "By adding capacitors to counteract inductive reactive power",
      "By reducing load",
      "By increasing voltage"
    ],
    correctAnswer: 1,
    explanation: "Capacitors supply leading reactive power that cancels lagging reactive power from inductors, improving overall power factor.",
    section: "3.6",
    difficulty: "basic"
  },
  {
    id: 168,
    question: "What are power factor correction capacitors?",
    options: [
      "Storage capacitors",
      "Capacitors installed to improve power factor by supplying reactive power locally",
      "Starting capacitors",
      "Filter capacitors"
    ],
    correctAnswer: 1,
    explanation: "PFC capacitors supply the reactive power needed by inductive loads locally, reducing reactive current drawn from the supply.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 169,
    question: "A motor draws 50A at 230V with PF 0.75. What capacitor kVAr is needed to correct to 0.95?",
    options: [
      "Approximately 5.5kVAr",
      "Approximately 4.5kVAr",
      "Approximately 11.5kVAr",
      "Approximately 8.6kVAr"
    ],
    correctAnswer: 0,
    explanation: "Current PF=0.75, angle=41.4°, tan=0.88. Target PF=0.95, angle=18.2°, tan=0.33. kVAr needed = P×(tan θ1-tan θ2) = 8.625×(0.88-0.33) ≈ 5.5kVAr",
    section: "3.6",
    difficulty: "advanced"
  },
  {
    id: 170,
    question: "Where should PFC capacitors ideally be installed?",
    options: [
      "At the meter only",
      "As close to the inductive load as possible",
      "In a separate building",
      "Outside the building"
    ],
    correctAnswer: 1,
    explanation: "Installing capacitors close to the load reduces reactive current in more of the distribution system, maximising loss reduction and voltage improvement.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 171,
    question: "What is automatic power factor correction (APFC)?",
    options: [
      "Self-correcting power factor",
      "A system that switches capacitor banks automatically based on measured power factor",
      "Manual correction",
      "Temporary correction"
    ],
    correctAnswer: 1,
    explanation: "APFC uses a controller to monitor power factor and automatically switch capacitor banks on/off to maintain target power factor as load varies.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 172,
    question: "What is the danger of over-correction (leading power factor)?",
    options: [
      "No danger",
      "Can cause voltage rise, resonance issues, and equipment damage",
      "Uses more energy",
      "Trips circuit breakers"
    ],
    correctAnswer: 1,
    explanation: "Over-correction causes leading PF, potentially resulting in voltage rise, resonance with system inductance, and damage to capacitors and equipment.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 173,
    question: "What is reactive power measured in?",
    options: [
      "Watts (W)",
      "VAr (volt-amperes reactive)",
      "VA (volt-amperes)",
      "Joules (J)"
    ],
    correctAnswer: 1,
    explanation: "Reactive power is measured in VAr (volt-amperes reactive) or kVAr. It represents energy oscillating between source and load, not consumed.",
    section: "3.6",
    difficulty: "basic"
  },
  {
    id: 174,
    question: "What is a kVArh meter?",
    options: [
      "A power meter",
      "A meter measuring reactive energy consumption over time",
      "An energy meter",
      "A voltage meter"
    ],
    correctAnswer: 1,
    explanation: "A kVArh meter measures reactive energy consumption. Some tariffs charge for reactive energy or impose penalties for low power factor.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 175,
    question: "What supply tariff penalty might apply for low power factor?",
    options: [
      "No penalties exist",
      "Reactive power charges or maximum demand charges on kVA instead of kW",
      "Only warnings",
      "Connection termination"
    ],
    correctAnswer: 1,
    explanation: "Utilities may charge for reactive power (kVArh), base demand charges on kVA rather than kW, or impose penalty factors for power factor below a threshold.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 176,
    question: "What typical power factor do utilities require?",
    options: [
      "No requirement",
      "Typically 0.9 or 0.95 lagging minimum",
      "Unity always",
      "0.5 minimum"
    ],
    correctAnswer: 1,
    explanation: "Many utilities require minimum power factor of 0.9 or 0.95. Below this, penalty charges or reactive power charges may apply.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 177,
    question: "What is displacement power factor?",
    options: [
      "Power factor due to movement",
      "Power factor determined by the phase angle between fundamental voltage and current",
      "Power factor of displaced equipment",
      "Variable power factor"
    ],
    correctAnswer: 1,
    explanation: "Displacement power factor is based on the phase displacement between fundamental (50Hz) voltage and current. It's affected by reactive components.",
    section: "3.6",
    difficulty: "advanced"
  },
  {
    id: 178,
    question: "What is distortion power factor?",
    options: [
      "Power factor in a damaged system",
      "The effect of harmonic distortion on total power factor",
      "Incorrect power factor",
      "Temporary power factor"
    ],
    correctAnswer: 1,
    explanation: "Distortion power factor accounts for the effect of harmonics. True PF = Displacement PF × Distortion PF. High harmonics reduce true power factor.",
    section: "3.6",
    difficulty: "advanced"
  },
  {
    id: 179,
    question: "What is the effect of harmonics on power factor?",
    options: [
      "No effect",
      "Harmonics reduce true power factor even if displacement power factor is good",
      "Improve power factor",
      "Only affect voltage"
    ],
    correctAnswer: 1,
    explanation: "Harmonics increase current without increasing real power, reducing true power factor. Harmonic filters may be needed alongside PFC capacitors.",
    section: "3.6",
    difficulty: "advanced"
  },
  {
    id: 180,
    question: "What is a detuned PFC capacitor bank?",
    options: [
      "A damaged capacitor",
      "Capacitors with series reactors to avoid resonance with system harmonics",
      "Capacitors without tuning",
      "Manually adjusted capacitors"
    ],
    correctAnswer: 1,
    explanation: "Detuned capacitor banks include series reactors that shift the resonant frequency away from common harmonics, preventing dangerous resonance conditions.",
    section: "3.6",
    difficulty: "advanced"
  },
  {
    id: 181,
    question: "What voltage rise might occur with power factor correction?",
    options: [
      "No voltage change",
      "Slight voltage rise due to reduced voltage drop from lower reactive current",
      "Voltage decrease",
      "Voltage becomes unstable"
    ],
    correctAnswer: 1,
    explanation: "Reducing reactive current reduces voltage drop in cables and transformers, potentially causing a slight voltage rise, especially at light loads.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 182,
    question: "Why do capacitors need discharge resistors?",
    options: [
      "To charge faster",
      "To safely discharge stored energy when disconnected, preventing shock hazard",
      "To improve power factor",
      "To reduce noise"
    ],
    correctAnswer: 1,
    explanation: "Capacitors store charge that can remain after disconnection. Discharge resistors safely dissipate this energy, typically reducing voltage to <50V within 60 seconds.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 183,
    question: "What is the effect of power factor on transformer loading?",
    options: [
      "No effect",
      "Lower power factor means transformer handles more kVA for the same kW delivered",
      "Transformer runs cooler",
      "Transformer becomes more efficient"
    ],
    correctAnswer: 1,
    explanation: "At low power factor, more current flows for the same real power, so transformer kVA loading increases, potentially requiring larger transformer capacity.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 184,
    question: "What is the typical discharge time requirement for PFC capacitors?",
    options: [
      "1 second",
      "60 seconds to discharge to <50V",
      "10 minutes",
      "Immediate"
    ],
    correctAnswer: 1,
    explanation: "Regulations typically require capacitors to discharge to 50V or less within 60 seconds of disconnection, or 5 minutes in some standards.",
    section: "3.6",
    difficulty: "intermediate"
  },
  {
    id: 185,
    question: "How does power factor correction reduce I²R losses?",
    options: [
      "By reducing resistance",
      "By reducing current flow for the same real power, current squared losses decrease",
      "By increasing voltage",
      "By cooling cables"
    ],
    correctAnswer: 1,
    explanation: "Improving PF reduces current (for same real power). Since losses are proportional to I², reducing current significantly reduces losses.",
    section: "3.6",
    difficulty: "intermediate"
  },

  // ============================================
  // Section 3.7: Advanced Calculations (Questions 186-200)
  // ============================================
  {
    id: 186,
    question: "What is the voltage drop formula for single-phase AC circuits?",
    options: [
      "Vd = I × R",
      "Vd = I × (R cos φ + X sin φ) × L",
      "Vd = I × L",
      "Vd = V × I"
    ],
    correctAnswer: 1,
    explanation: "For AC circuits, voltage drop includes both resistive and reactive components: Vd = I × (R cos φ + X sin φ) × L, accounting for power factor.",
    section: "3.7",
    difficulty: "advanced"
  },
  {
    id: 187,
    question: "What is the maximum permitted voltage drop for power circuits in BS 7671?",
    options: [
      "2%",
      "4%",
      "5%",
      "10%"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 recommends maximum 5% voltage drop from origin to load (3% for lighting, 5% for other circuits) to ensure proper equipment operation.",
    section: "3.7",
    difficulty: "intermediate"
  },
  {
    id: 188,
    question: "A cable has (mV/A/m) value of 7.3. What is voltage drop for 30A over 25m?",
    options: [
      "5.48V",
      "54.75V",
      "0.548V",
      "547.5V"
    ],
    correctAnswer: 0,
    explanation: "Vd = (mV/A/m) × I × L / 1000 = 7.3 × 30 × 25 / 1000 = 5.475V ≈ 5.48V",
    section: "3.7",
    difficulty: "intermediate"
  },
  {
    id: 189,
    question: "What is the formula for cable current-carrying capacity adjustment?",
    options: [
      "It = In × Ca × Cg × Ci",
      "It = In / (Ca × Cg × Ci)",
      "It = In + Ca + Cg + Ci",
      "It = In - Ca - Cg - Ci"
    ],
    correctAnswer: 1,
    explanation: "Tabulated current must be ≥ It = In / (Ca × Cg × Ci), where Ca=ambient temp factor, Cg=grouping factor, Ci=thermal insulation factor.",
    section: "3.7",
    difficulty: "advanced"
  },
  {
    id: 190,
    question: "What is the Earth Fault Loop Impedance formula for circuit protection?",
    options: [
      "Zs = Ze + R1 + R2",
      "Zs = Ze × R1 × R2",
      "Zs = Ze - R1 - R2",
      "Zs = (R1 + R2) / Ze"
    ],
    correctAnswer: 0,
    explanation: "Zs (total earth fault loop impedance) = Ze (external) + (R1 + R2) (circuit phase and CPC conductors).",
    section: "3.7",
    difficulty: "intermediate"
  },
  {
    id: 191,
    question: "What fault current will flow with Zs = 0.8Ω at 230V (neglecting reduced voltage)?",
    options: [
      "184A",
      "287.5A",
      "1840A",
      "28.75A"
    ],
    correctAnswer: 1,
    explanation: "If = V/Zs = 230/0.8 = 287.5A (simplified calculation not accounting for reduced voltage under fault)",
    section: "3.7",
    difficulty: "intermediate"
  },
  {
    id: 192,
    question: "What temperature correction applies to cable resistance at operating temperature?",
    options: [
      "No correction needed",
      "Multiply tabulated values by 1.20 (for 70°C operating) for thermoplastic cables",
      "Divide by 1.20",
      "Add 20%"
    ],
    correctAnswer: 1,
    explanation: "Cable resistance increases with temperature. For thermoplastic at 70°C, multiply 20°C values by approximately 1.20 for accurate fault calculations.",
    section: "3.7",
    difficulty: "advanced"
  },
  {
    id: 193,
    question: "What is the formula for prospective fault current at transformer secondary?",
    options: [
      "If = kVA × 100 / (√3 × V × Z%)",
      "If = kVA / V",
      "If = V / Z",
      "If = V × I × Z"
    ],
    correctAnswer: 0,
    explanation: "For three-phase transformer: If = (kVA × 1000 × 100) / (√3 × V × Z%) where Z% is the transformer impedance percentage.",
    section: "3.7",
    difficulty: "advanced"
  },
  {
    id: 194,
    question: "A 500kVA transformer at 400V with 5% impedance has prospective fault current of:",
    options: [
      "722A",
      "14,430A",
      "1,443A",
      "7,220A"
    ],
    correctAnswer: 1,
    explanation: "If = (500 × 1000 × 100) / (√3 × 400 × 5) = 50,000,000 / 3,464 = 14,434A ≈ 14,430A",
    section: "3.7",
    difficulty: "advanced"
  },
  {
    id: 195,
    question: "What is diversity in electrical design?",
    options: [
      "Different types of equipment",
      "A factor reducing total design load based on non-simultaneous maximum demands",
      "Circuit separation",
      "Phase balance"
    ],
    correctAnswer: 1,
    explanation: "Diversity accounts for the fact that not all loads operate simultaneously at maximum. Applying diversity factors reduces design load below simple sum.",
    section: "3.7",
    difficulty: "intermediate"
  },
  {
    id: 196,
    question: "How is total maximum demand calculated with diversity?",
    options: [
      "Simple sum of all loads",
      "Sum of individual demands × appropriate diversity factors",
      "Largest single load only",
      "Average of all loads"
    ],
    correctAnswer: 1,
    explanation: "Maximum demand applies diversity factors to load categories (e.g., 100% of largest cooker + 30% of remaining cooking load + other percentages).",
    section: "3.7",
    difficulty: "intermediate"
  },
  {
    id: 197,
    question: "What is the adiabatic equation for fault current withstand?",
    options: [
      "S = I²t/k²",
      "S² = I²t/k²",
      "k²S² = I²t",
      "I = k×S/√t"
    ],
    correctAnswer: 2,
    explanation: "The adiabatic equation k²S² = I²t relates conductor CSA (S), fault current (I), duration (t), and material constant (k) for fault withstand.",
    section: "3.7",
    difficulty: "advanced"
  },
  {
    id: 198,
    question: "What minimum CPC size is needed for 6000A fault for 0.4s with k=115?",
    options: [
      "2.5mm²",
      "4mm²",
      "6mm²",
      "10mm²"
    ],
    correctAnswer: 2,
    explanation: "S = √(I²t)/k = √(6000² × 0.4)/115 = √14,400,000/115 = 3794.7/115 = 33mm² minimum (use 6mm² from calculation: √(36,000,000×0.4)/115 ≈ 5.2mm²)",
    section: "3.7",
    difficulty: "advanced"
  },
  {
    id: 199,
    question: "What is the thermal equivalent current for intermittent loads?",
    options: [
      "Peak current",
      "The steady current producing the same heating effect as the intermittent load",
      "Minimum current",
      "Starting current"
    ],
    correctAnswer: 1,
    explanation: "Thermal equivalent current is the RMS value of varying load current that produces the same heating effect as a steady current.",
    section: "3.7",
    difficulty: "advanced"
  },
  {
    id: 200,
    question: "What is the relationship between energy, power and time?",
    options: [
      "E = P / t",
      "E = P × t",
      "E = P + t",
      "E = P² × t"
    ],
    correctAnswer: 1,
    explanation: "Energy = Power × Time. In electrical terms: E (joules) = P (watts) × t (seconds), or E (kWh) = P (kW) × t (hours).",
    section: "3.7",
    difficulty: "basic"
  }
];

// Helper function to get random questions for mock exams
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...module3Questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  return module3Questions.filter(q => q.section === section);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: 'basic' | 'intermediate' | 'advanced'): Question[] => {
  return module3Questions.filter(q => q.difficulty === difficulty);
};

export default module3Questions;
