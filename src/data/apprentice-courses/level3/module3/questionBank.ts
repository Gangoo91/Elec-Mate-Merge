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
      'R = V × I',
      'V = I × R',
      'P = I × R',
      'I = V × R',
    ],
    correctAnswer: 1,
    explanation:
      "Ohm's Law states that V = I × R, where V is voltage in volts, I is current in amps, and R is resistance in ohms.",
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 2,
    question: 'A circuit has a resistance of 20Ω and draws 5A. What is the voltage?',
    options: [
      '4V',
      '25V',
      '100V',
      '15V',
    ],
    correctAnswer: 2,
    explanation: 'Using V = I × R: V = 5A × 20Ω = 100V',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 3,
    question: 'What is the current through a 50Ω resistor connected to 230V?',
    options: [
      '280A',
      '11,500A',
      '0.22A',
      '4.6A',
    ],
    correctAnswer: 3,
    explanation: 'Using I = V/R: I = 230V ÷ 50Ω = 4.6A',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 4,
    question: 'What is the formula for electrical power?',
    options: [
      'P = V × I',
      'P = V ÷ I',
      'P = V + I',
      'P = V - I',
    ],
    correctAnswer: 0,
    explanation:
      'Electrical power P = V × I (watts = volts × amps). This can also be expressed as P = I²R or P = V²/R.',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 5,
    question: 'A 230V appliance draws 10A. What is its power rating?',
    options: [
      '23W',
      '2,300W',
      '240W',
      '2.3W',
    ],
    correctAnswer: 1,
    explanation: 'P = V × I = 230V × 10A = 2,300W (2.3kW)',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 6,
    question: 'What is the resistance of a 2kW heater operating at 230V?',
    options: [
      '8.7Ω',
      '115Ω',
      '26.45Ω',
      '460,000Ω',
    ],
    correctAnswer: 2,
    explanation: 'Using R = V²/P: R = (230)² ÷ 2000 = 52,900 ÷ 2000 = 26.45Ω',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 7,
    question: 'What happens to current if resistance increases while voltage stays constant?',
    options: [
      'Current increases',
      'Current stays the same',
      'Current fluctuates',
      'Current decreases',
    ],
    correctAnswer: 3,
    explanation:
      "According to Ohm's Law (I = V/R), if R increases and V is constant, current I will decrease proportionally.",
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 8,
    question: 'Three 10Ω resistors in series have a total resistance of:',
    options: [
      '30Ω',
      '10Ω',
      '3.33Ω',
      '100Ω',
    ],
    correctAnswer: 0,
    explanation: 'In series: Rtotal = R1 + R2 + R3 = 10 + 10 + 10 = 30Ω',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 9,
    question: 'Three 30Ω resistors in parallel have a total resistance of:',
    options: [
      '30Ω',
      '10Ω',
      '90Ω',
      '0.1Ω',
    ],
    correctAnswer: 1,
    explanation: 'In parallel with equal resistors: Rtotal = R/n = 30Ω/3 = 10Ω',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 10,
    question: 'What is the total resistance of 20Ω and 30Ω in parallel?',
    options: [
      '50Ω',
      '25Ω',
      '12Ω',
      '600Ω',
    ],
    correctAnswer: 2,
    explanation:
      'For two resistors in parallel: Rtotal = (R1 × R2)/(R1 + R2) = (20 × 30)/(20 + 30) = 600/50 = 12Ω',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 11,
    question: 'How much energy does a 3kW heater use in 2 hours?',
    options: [
      '1.5kWh',
      '1,500Wh',
      '5kWh',
      '6kWh',
    ],
    correctAnswer: 3,
    explanation: 'Energy = Power × Time = 3kW × 2h = 6kWh',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 12,
    question: 'What is 1 kilowatt-hour in joules?',
    options: [
      '3,600,000 joules',
      '3,600 joules',
      '1,000 joules',
      '360,000 joules',
    ],
    correctAnswer: 0,
    explanation: '1 kWh = 1000W × 3600s = 3,600,000 joules (3.6MJ)',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 13,
    question: 'A cable has resistance of 0.5Ω and carries 20A. What is the voltage drop?',
    options: [
      '0.025V',
      '10V',
      '40V',
      '400V',
    ],
    correctAnswer: 1,
    explanation: 'Voltage drop Vd = I × R = 20A × 0.5Ω = 10V',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 14,
    question: 'What power is dissipated in a cable with 0.5Ω resistance carrying 20A?',
    options: [
      '10W',
      '400W',
      '200W',
      '40W',
    ],
    correctAnswer: 2,
    explanation: 'Power loss P = I²R = (20)² × 0.5 = 400 × 0.5 = 200W',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 15,
    question: 'What is the SI unit of electrical resistance?',
    options: [
      'Volt',
      'Amp',
      'Watt',
      'Ohm',
    ],
    correctAnswer: 3,
    explanation: 'The ohm (Ω) is the SI unit of electrical resistance, named after Georg Ohm.',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 16,
    question: 'What is conductance and its unit?',
    options: [
      'The reciprocal of resistance, measured in siemens (S)',
      'Power dissipation, measured in watts',
      'Opposition to current flow, measured in ohms',
      'Current flow, measured in amps',
    ],
    correctAnswer: 0,
    explanation:
      'Conductance (G) is the reciprocal of resistance (G = 1/R), measured in siemens (S). Higher conductance means lower resistance.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 17,
    question: 'How does temperature affect the resistance of copper?',
    options: [
      'Resistance becomes zero at high temperature',
      'Resistance increases as temperature increases',
      'Resistance decreases as temperature increases',
      'Temperature has no effect',
    ],
    correctAnswer: 1,
    explanation:
      'Copper has a positive temperature coefficient - its resistance increases as temperature rises due to increased atomic vibration.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 18,
    question: 'What is resistivity?',
    options: [
      'The ratio of true power to apparent power (cos φ)',
      'Sum of voltages around a closed loop equals zero',
      'A material property indicating how strongly it opposes current flow',
      'Smoother power delivery and more efficient for motors',
    ],
    correctAnswer: 2,
    explanation:
      'Resistivity (ρ) is an intrinsic material property indicating opposition to current. R = ρL/A where L is length and A is cross-sectional area.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 19,
    question:
      'What is the resistance of a 100m cable with resistivity 0.0172 Ω·mm²/m and CSA of 2.5mm²?',
    options: [
      '0.172Ω',
      '1.72Ω',
      '6.88Ω',
      '0.688Ω',
    ],
    correctAnswer: 3,
    explanation: 'R = ρL/A = (0.0172 × 100)/2.5 = 1.72/2.5 = 0.688Ω',
    section: '3.1',
    difficulty: 'advanced',
  },
  {
    id: 20,
    question: 'What happens to cable resistance if you double its length?',
    options: [
      'Doubles',
      'Stays the same',
      'Halves',
      'Quadruples',
    ],
    correctAnswer: 0,
    explanation:
      'Resistance is directly proportional to length (R = ρL/A). Doubling length doubles resistance.',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 21,
    question: 'What happens to cable resistance if you double its cross-sectional area?',
    options: [
      'Doubles',
      'Halves',
      'Quadruples',
      'Stays the same',
    ],
    correctAnswer: 1,
    explanation:
      'Resistance is inversely proportional to area (R = ρL/A). Doubling area halves resistance.',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 22,
    question: 'In a series circuit, current is:',
    options: [
      'Different at each component',
      'Zero',
      'The same throughout',
      'Maximum at the power source',
    ],
    correctAnswer: 2,
    explanation:
      'In a series circuit, the same current flows through all components as there is only one path for current.',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 23,
    question: 'In a parallel circuit, voltage across each branch is:',
    options: [
      'Approximately 8.66A',
      'The turns ratio (N2/N1)',
      'Phase rotation indicator/meter',
      'The same for all branches',
    ],
    correctAnswer: 3,
    explanation:
      'In a parallel circuit, voltage is the same across all parallel branches as they share common connection points.',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 24,
    question: "What is Kirchhoff's Current Law (KCL)?",
    options: [
      'Sum of currents entering a node equals sum leaving',
      'Voltage around a loop equals zero',
      'Current equals voltage divided by resistance',
      'Power equals current squared times resistance',
    ],
    correctAnswer: 0,
    explanation:
      'KCL states that the algebraic sum of currents at any node (junction) is zero - currents entering equal currents leaving.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 25,
    question: "What is Kirchhoff's Voltage Law (KVL)?",
    options: [
      'Current at a node sums to zero',
      'Sum of voltages around a closed loop equals zero',
      'Voltage equals current times resistance',
      'Power equals voltage times current',
    ],
    correctAnswer: 1,
    explanation:
      'KVL states that the algebraic sum of all voltages around any closed loop equals zero - voltage rises equal voltage drops.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 26,
    question: 'What is the power dissipated in a 100Ω resistor with 5V across it?',
    options: [
      '500W',
      '20W',
      '0.25W',
      '0.5W',
    ],
    correctAnswer: 2,
    explanation: 'P = V²/R = (5)²/100 = 25/100 = 0.25W',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 27,
    question: 'A 60W lamp operates for 8 hours. How many kWh of energy does it use?',
    options: [
      '480kWh',
      '7.5kWh',
      '4.8kWh',
      '0.48kWh',
    ],
    correctAnswer: 3,
    explanation: 'Energy = Power × Time = 60W × 8h = 480Wh = 0.48kWh',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 28,
    question: 'What is the current drawn by a 9.2kW shower on a 230V supply?',
    options: [
      '40A',
      '25A',
      '0.025A',
      '2,116A',
    ],
    correctAnswer: 0,
    explanation: 'I = P/V = 9,200W ÷ 230V = 40A',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 29,
    question:
      'Two resistors of 6Ω and 12Ω are connected in parallel. What is their combined resistance?',
    options: [
      '18Ω',
      '4Ω',
      '2Ω',
      '72Ω',
    ],
    correctAnswer: 1,
    explanation: 'Rtotal = (R1 × R2)/(R1 + R2) = (6 × 12)/(6 + 12) = 72/18 = 4Ω',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 30,
    question:
      'A 5Ω and 20Ω resistor are in series. What voltage appears across the 5Ω resistor if total supply is 100V?',
    options: [
      '25V',
      '80V',
      '20V',
      '5V',
    ],
    correctAnswer: 2,
    explanation:
      'Total R = 5 + 20 = 25Ω. Current I = 100/25 = 4A. Voltage across 5Ω = 4A × 5Ω = 20V',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 31,
    question: 'What is the maximum power transfer theorem?',
    options: [
      'Maximum power is transferred when load resistance is zero',
      'Power transfer is independent of resistance',
      'Maximum power is transferred when load resistance is infinite',
      'Maximum power is transferred when load resistance equals source resistance',
    ],
    correctAnswer: 3,
    explanation:
      'Maximum power is transferred from source to load when the load resistance equals the internal source resistance.',
    section: '3.1',
    difficulty: 'advanced',
  },
  {
    id: 32,
    question: 'What is the internal resistance of an ideal voltage source?',
    options: [
      'Zero',
      'Infinite',
      'Equal to load resistance',
      'Very high',
    ],
    correctAnswer: 0,
    explanation:
      'An ideal voltage source has zero internal resistance, maintaining constant voltage regardless of load current.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 33,
    question:
      'A battery has EMF of 12V and internal resistance of 0.5Ω. What terminal voltage with 5A load?',
    options: [
      '12V',
      '9.5V',
      '14.5V',
      '2.5V',
    ],
    correctAnswer: 1,
    explanation:
      'Terminal voltage = EMF - (I × internal resistance) = 12V - (5A × 0.5Ω) = 12V - 2.5V = 9.5V',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 34,
    question: 'What is the efficiency of a device that outputs 900W while consuming 1000W?',
    options: [
      '111%',
      '100%',
      '90%',
      '9%',
    ],
    correctAnswer: 2,
    explanation: 'Efficiency = (Output Power / Input Power) × 100 = (900/1000) × 100 = 90%',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 35,
    question:
      'A motor is 85% efficient and produces 2kW of mechanical output. What electrical power does it consume?',
    options: [
      '1.7kW',
      '1.7kW',
      '2kW',
      '2.35kW',
    ],
    correctAnswer: 3,
    explanation: 'Input Power = Output Power / Efficiency = 2000W / 0.85 = 2,353W ≈ 2.35kW',
    section: '3.1',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 3.2: AC Theory (Questions 36-70)
  // ============================================
  {
    id: 36,
    question: 'What is the frequency of UK mains supply?',
    options: [
      '50Hz',
      '60Hz',
      '100Hz',
      '25Hz',
    ],
    correctAnswer: 0,
    explanation: 'UK mains electricity operates at 50Hz, meaning 50 complete cycles per second.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 37,
    question: 'What is the relationship between frequency and period?',
    options: [
      'f = T',
      'f = 1/T',
      'f = T²',
      'f = 2T',
    ],
    correctAnswer: 1,
    explanation:
      'Frequency (f) is the reciprocal of period (T): f = 1/T. For 50Hz, T = 1/50 = 0.02 seconds = 20ms.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 38,
    question: 'What is the period of a 50Hz waveform?',
    options: [
      '50ms',
      '10ms',
      '20ms',
      '100ms',
    ],
    correctAnswer: 2,
    explanation: 'Period T = 1/f = 1/50 = 0.02 seconds = 20ms',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 39,
    question: 'What is the peak voltage of UK 230V RMS mains?',
    options: [
      '230V',
      '163V',
      '460V',
      '325V',
    ],
    correctAnswer: 3,
    explanation: 'Peak voltage Vp = Vrms × √2 = 230 × 1.414 = 325V',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 40,
    question: 'What is RMS voltage?',
    options: [
      'The DC equivalent that produces the same heating effect',
      'To maintain constant magnetic flux and prevent motor overheating',
      'The reciprocal of resistance, measured in siemens (S)',
      'Current-carrying conductor in a magnetic field experiences a force',
    ],
    correctAnswer: 0,
    explanation:
      'RMS (Root Mean Square) voltage is the equivalent DC voltage that would produce the same power/heating effect in a resistive load.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 41,
    question: 'What is the relationship between RMS and peak values for a sine wave?',
    options: [
      'Current decreases proportionally',
      'Vrms = Vp / √2 (or Vp × 0.707)',
      'Three phases plus neutral',
      'Typically 0.9 or 0.95 lagging minimum',
    ],
    correctAnswer: 1,
    explanation:
      'For a sine wave: Vrms = Vp/√2 = Vp × 0.707. Conversely, Vp = Vrms × √2 = Vrms × 1.414',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 42,
    question: 'What is peak-to-peak voltage?',
    options: [
      'Same as peak voltage',
      'The average voltage',
      'Twice the peak voltage',
      'Half the peak voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Peak-to-peak voltage (Vpp) is the total swing from positive peak to negative peak = 2 × Vp. For 230V RMS: Vpp = 2 × 325V = 650V',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 43,
    question: 'What is inductive reactance?',
    options: [
      'To provide a return path for unbalanced currents and single-phase loads',
      'The reciprocal of resistance, measured in siemens (S)',
      'By adding capacitors to counteract inductive reactive power',
      'Opposition of an inductor to AC, increasing with frequency',
    ],
    correctAnswer: 3,
    explanation:
      'Inductive reactance (XL) is the opposition to AC by an inductor: XL = 2πfL. It increases with frequency.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 44,
    question: 'What is the formula for inductive reactance?',
    options: [
      'XL = 2πfL',
      'XL = f/2πL',
      'XL = L/f',
      'XL = L × f',
    ],
    correctAnswer: 0,
    explanation:
      'Inductive reactance XL = 2πfL, where f is frequency in Hz and L is inductance in henrys.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 45,
    question: 'What is the inductive reactance of a 0.1H inductor at 50Hz?',
    options: [
      '5Ω',
      '31.4Ω',
      '0.5Ω',
      '314Ω',
    ],
    correctAnswer: 1,
    explanation: 'XL = 2πfL = 2 × 3.14159 × 50 × 0.1 = 31.4Ω',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 46,
    question: 'What is capacitive reactance?',
    options: [
      'The reciprocal of resistance, measured in siemens (S)',
      'Maximum power is transferred when load resistance equals source resistance',
      'Opposition of a capacitor to AC, decreasing with frequency',
      'Sum of voltages around a closed loop equals zero',
    ],
    correctAnswer: 2,
    explanation:
      'Capacitive reactance (XC) is the opposition to AC by a capacitor: XC = 1/(2πfC). It decreases with frequency.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 47,
    question: 'What is the formula for capacitive reactance?',
    options: [
      'XC = 2πfC',
      'XC = C/f',
      'XC = f × C',
      'XC = 1/(2πfC)',
    ],
    correctAnswer: 3,
    explanation:
      'Capacitive reactance XC = 1/(2πfC), where f is frequency in Hz and C is capacitance in farads.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 48,
    question: 'What is the capacitive reactance of a 100μF capacitor at 50Hz?',
    options: [
      '31.8Ω',
      '318Ω',
      '0.031Ω',
      '3.18Ω',
    ],
    correctAnswer: 0,
    explanation: 'XC = 1/(2πfC) = 1/(2 × 3.14159 × 50 × 100×10⁻⁶) = 1/0.0314 = 31.8Ω',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 49,
    question: 'In a purely inductive circuit, current lags voltage by:',
    options: [
      '45°',
      '90°',
      '0°',
      '180°',
    ],
    correctAnswer: 1,
    explanation:
      'In a purely inductive circuit, current lags voltage by 90° because the inductor opposes changes in current.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 50,
    question: 'In a purely capacitive circuit, current leads voltage by:',
    options: [
      '45°',
      '180°',
      '90°',
      '0°',
    ],
    correctAnswer: 2,
    explanation:
      'In a purely capacitive circuit, current leads voltage by 90° because capacitor current flows before voltage builds up.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 51,
    question: 'What is impedance?',
    options: [
      'The reciprocal of resistance, measured in siemens (S)',
      'Moving a conductor through a magnetic field induces an EMF',
      'A motor using permanent magnets instead of electromagnetic field windings',
      'Total opposition to AC, combining resistance and reactance',
    ],
    correctAnswer: 3,
    explanation:
      'Impedance (Z) is the total opposition to AC current, combining resistance and reactance: Z = √(R² + X²)',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 52,
    question: 'A circuit has R = 30Ω and XL = 40Ω. What is the impedance?',
    options: [
      '50Ω',
      '70Ω',
      '10Ω',
      '35Ω',
    ],
    correctAnswer: 0,
    explanation: 'Z = √(R² + XL²) = √(30² + 40²) = √(900 + 1600) = √2500 = 50Ω',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 53,
    question: 'What is the phase angle in a circuit with R = 30Ω and XL = 40Ω?',
    options: [
      '90°',
      '53.13°',
      '45°',
      '36.87°',
    ],
    correctAnswer: 1,
    explanation: 'Phase angle θ = tan⁻¹(XL/R) = tan⁻¹(40/30) = tan⁻¹(1.333) = 53.13°',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 54,
    question: 'What is true power in an AC circuit?',
    options: [
      'V × I',
      'V × I × sin(φ)',
      'V × I × cos(φ)',
      'V²/R',
    ],
    correctAnswer: 2,
    explanation:
      'True (real) power P = V × I × cos(φ), measured in watts, where φ is the phase angle. It represents actual work done.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 55,
    question: 'What is reactive power?',
    options: [
      'Reducing starting current of large three-phase motors',
      'Sum of voltages around a closed loop equals zero',
      'Ingress Protection - protection against solid objects and liquids',
      'Power stored and returned by inductors and capacitors',
    ],
    correctAnswer: 3,
    explanation:
      'Reactive power Q = V × I × sin(φ), measured in VAr. It represents energy stored and returned by inductors and capacitors, not consumed.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 56,
    question: 'What is apparent power?',
    options: [
      'V × I (the product of RMS voltage and current)',
      'Lagging, typically 0.8-0.9 at full load',
      'The reciprocal of resistance, measured in siemens (S)',
      'Typically 0.9 or 0.95 lagging minimum',
    ],
    correctAnswer: 0,
    explanation:
      "Apparent power S = V × I, measured in VA. It's the vector sum of true and reactive power: S = √(P² + Q²)",
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 57,
    question: 'What is the power triangle relationship?',
    options: [
      'S = P + Q',
      'S² = P² + Q²',
      'S = P × Q',
      'S = P / Q',
    ],
    correctAnswer: 1,
    explanation:
      'In the power triangle: S² = P² + Q², where S is apparent power (VA), P is true power (W), and Q is reactive power (VAr).',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 58,
    question: 'What is power factor?',
    options: [
      'True power divided by reactive power',
      'Reactive power divided by apparent power',
      'True power divided by apparent power (cos φ)',
      'Apparent power divided by true power',
    ],
    correctAnswer: 2,
    explanation:
      'Power factor = True Power / Apparent Power = P/S = cos(φ). It indicates how effectively power is being used.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 59,
    question: 'A circuit draws 10A at 230V with power factor 0.8. What is the true power?',
    options: [
      '2,300W',
      '1,380W',
      '2,875W',
      '1,840W',
    ],
    correctAnswer: 3,
    explanation: 'True Power P = V × I × PF = 230 × 10 × 0.8 = 1,840W',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 60,
    question: 'What causes a lagging power factor?',
    options: [
      'Inductive loads',
      'Capacitive loads',
      'Resistive loads',
      'LED lighting',
    ],
    correctAnswer: 0,
    explanation:
      'Inductive loads (motors, transformers) cause a lagging power factor because current lags behind voltage.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 61,
    question: 'What is resonance in an AC circuit?',
    options: [
      'Opposition of a capacitor to AC, decreasing with frequency',
      'When inductive reactance equals capacitive reactance',
      'Total opposition to AC, combining resistance and reactance',
      'The difference between synchronous speed and actual rotor speed',
    ],
    correctAnswer: 1,
    explanation:
      'Resonance occurs when XL = XC, causing them to cancel out. At resonance, impedance is purely resistive and current is maximum.',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 62,
    question: 'What is the resonant frequency formula?',
    options: [
      'fr = 2π√(LC)',
      'fr = √(L/C)',
      'fr = 1/(2π√(LC))',
      'fr = LC',
    ],
    correctAnswer: 2,
    explanation: 'Resonant frequency fr = 1/(2π√(LC)), where L is inductance and C is capacitance.',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 63,
    question: 'What is the angular frequency ω?',
    options: [
      'f × 2',
      'f²',
      'f / 2π',
      '2πf (radians per second)',
    ],
    correctAnswer: 3,
    explanation:
      "Angular frequency ω = 2πf, measured in radians per second. It's used in reactance formulas: XL = ωL, XC = 1/(ωC)",
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 64,
    question: 'What is the skin effect in AC conductors?',
    options: [
      'Tendency for AC current to flow near the conductor surface',
      'A device that reduces starting current by gradually increasing voltage',
      'Power stored and returned by inductors and capacitors',
      'The reciprocal of resistance, measured in siemens (S)',
    ],
    correctAnswer: 0,
    explanation:
      'Skin effect causes AC current to concentrate near the conductor surface, reducing effective cross-sectional area and increasing resistance at higher frequencies.',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 65,
    question: 'A 230V supply has a current of 5A at 60° lagging. What is the true power?',
    options: [
      '1,150W',
      '575W',
      '997W',
      '1,000W',
    ],
    correctAnswer: 1,
    explanation: 'P = V × I × cos(φ) = 230 × 5 × cos(60°) = 230 × 5 × 0.5 = 575W',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 66,
    question: 'What is the form factor of a sine wave?',
    options: [
      '1.0',
      '1.414',
      '1.11',
      '0.707',
    ],
    correctAnswer: 2,
    explanation:
      'Form factor = RMS value / Average value = (Vp/√2) / (2Vp/π) = π/(2√2) ≈ 1.11 for a sine wave',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 67,
    question: 'What is the crest factor of a sine wave?',
    options: [
      '1.0',
      '1.11',
      '0.707',
      '1.414',
    ],
    correctAnswer: 3,
    explanation:
      'Crest factor (peak factor) = Peak value / RMS value = Vp / (Vp/√2) = √2 ≈ 1.414 for a sine wave',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 68,
    question: 'What happens to capacitive reactance as frequency increases?',
    options: [
      'Decreases',
      'Increases',
      'Stays the same',
      'Becomes infinite',
    ],
    correctAnswer: 0,
    explanation:
      'Capacitive reactance XC = 1/(2πfC) decreases as frequency increases - capacitors pass high frequencies more easily.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 69,
    question: 'What happens to inductive reactance as frequency increases?',
    options: [
      'Decreases',
      'Increases',
      'Stays the same',
      'Becomes zero',
    ],
    correctAnswer: 1,
    explanation:
      'Inductive reactance XL = 2πfL increases with frequency - inductors oppose high-frequency changes more strongly.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 70,
    question: 'In a series RLC circuit at resonance, impedance equals:',
    options: [
      'Infinite',
      'Zero',
      'The resistance R alone',
      'XL + XC',
    ],
    correctAnswer: 2,
    explanation:
      'At resonance, XL = XC so they cancel, leaving only resistance. Impedance Z = R, and current is at maximum.',
    section: '3.2',
    difficulty: 'advanced',
  },

  // ============================================
  // Section 3.3: Three-Phase Systems (Questions 71-100)
  // ============================================
  {
    id: 71,
    question: 'What is the phase difference between phases in a three-phase supply?',
    options: [
      '90°',
      '180°',
      '60°',
      '120°',
    ],
    correctAnswer: 3,
    explanation:
      'In a three-phase supply, the three phases are displaced by 120° (one-third of a cycle) from each other.',
    section: '3.3',
    difficulty: 'basic',
  },
  {
    id: 72,
    question: 'What is the UK three-phase line voltage?',
    options: [
      '400V',
      '230V',
      '415V',
      '440V',
    ],
    correctAnswer: 0,
    explanation:
      'UK three-phase line voltage (between phases) is 400V. Phase voltage (to neutral) is 230V. Ratio is √3 (1.732).',
    section: '3.3',
    difficulty: 'basic',
  },
  {
    id: 73,
    question: 'What is the relationship between line and phase voltage in a star connection?',
    options: [
      'VL = Vp',
      'VL = Vp × √3',
      'VL = Vp / √3',
      'VL = Vp × 3',
    ],
    correctAnswer: 1,
    explanation: 'In a star (wye) connection: VL = Vp × √3. UK: 230V phase × 1.732 = 400V line.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 74,
    question: 'What is the relationship between line and phase current in a star connection?',
    options: [
      'IL = Ip × √3',
      'IL = Ip / √3',
      'IL = Ip (same)',
      'IL = Ip × 3',
    ],
    correctAnswer: 2,
    explanation:
      'In a star connection, line current equals phase current: IL = Ip, because the line current flows directly through each phase.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 75,
    question: 'What is the relationship between line and phase voltage in a delta connection?',
    options: [
      'VL = Vp × √3',
      'VL = Vp / √3',
      'VL = Vp × 3',
      'VL = Vp (same)',
    ],
    correctAnswer: 3,
    explanation:
      'In a delta connection, line voltage equals phase voltage: VL = Vp, because each phase is connected across two lines.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 76,
    question: 'What is the relationship between line and phase current in a delta connection?',
    options: [
      'IL = Ip × √3',
      'IL = Ip (same)',
      'IL = Ip / √3',
      'IL = Ip × 3',
    ],
    correctAnswer: 0,
    explanation:
      'In a delta connection: IL = Ip × √3. Line current is √3 times the phase current because two phase currents combine at each line.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 77,
    question: 'What is the formula for three-phase power in a balanced load?',
    options: [
      'P = VL × IL',
      'P = √3 × VL × IL × cos(φ)',
      'P = 3 × VL × IL × cos(φ)',
      'P = VL × IL × cos(φ)',
    ],
    correctAnswer: 1,
    explanation:
      'Three-phase power P = √3 × VL × IL × cos(φ), or equivalently P = 3 × Vp × Ip × cos(φ)',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 78,
    question:
      'A balanced three-phase load draws 20A per phase at 400V line voltage, PF = 0.85. What is the total power?',
    options: [
      '8kW',
      '13.6kW',
      '11.78kW',
      '6.8kW',
    ],
    correctAnswer: 2,
    explanation: 'P = √3 × VL × IL × PF = 1.732 × 400 × 20 × 0.85 = 11,782W ≈ 11.78kW',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 79,
    question: 'What is the main advantage of three-phase over single-phase power?',
    options: [
      'Adjusting the turns ratio to regulate output voltage',
      'The reciprocal of resistance, measured in siemens (S)',
      'V × I (the product of RMS voltage and current)',
      'Smoother power delivery and more efficient for motors',
    ],
    correctAnswer: 3,
    explanation:
      'Three-phase provides smoother power delivery (constant, not pulsating), is more efficient for motors, and transmits more power with less conductor material.',
    section: '3.3',
    difficulty: 'basic',
  },
  {
    id: 80,
    question: 'What is a balanced three-phase load?',
    options: [
      'Equal load on each phase with equal phase angles',
      'As close to the inductive load as possible',
      'Simple, robust, low maintenance, and lower cost',
      'The effect of harmonic distortion on total power factor',
    ],
    correctAnswer: 0,
    explanation:
      'A balanced load has equal impedance on each phase, drawing equal currents at equal phase angles. The neutral carries no current in a balanced system.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 81,
    question: 'What current flows in the neutral of a balanced three-phase star load?',
    options: [
      'Line current × √3',
      'Zero',
      'Line current × 3',
      'Line current',
    ],
    correctAnswer: 1,
    explanation:
      'In a balanced three-phase system, the three phase currents sum to zero at any instant due to their 120° phase displacement, so neutral current is zero.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 82,
    question: 'What is the purpose of the neutral conductor in a three-phase system?',
    options: [
      'It reduces neutral current, voltage imbalance and supply losses',
      'No changing current means no changing magnetic field, so no induced voltage',
      'To provide a return path for unbalanced currents and single-phase loads',
      'Current-carrying conductor in a magnetic field experiences a force',
    ],
    correctAnswer: 2,
    explanation:
      'The neutral provides a return path for any unbalanced currents and allows connection of single-phase loads between phase and neutral.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 83,
    question: 'What is phase rotation (phase sequence)?',
    options: [
      'Photovoltaic effect in a semiconductor p-n junction',
      'A motor designed to run on single-phase supply using starting mechanisms',
      'By adding capacitors to counteract inductive reactive power',
      'The order in which the three phases reach their peak values',
    ],
    correctAnswer: 3,
    explanation:
      'Phase rotation indicates the sequence in which phases reach their maximum values (L1-L2-L3 or L1-L3-L2). It determines motor rotation direction.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 84,
    question: 'What happens if two phases of a three-phase motor supply are swapped?',
    options: [
      'Motor reverses direction',
      'Motor runs faster',
      'Motor runs slower',
      "Motor won't run",
    ],
    correctAnswer: 0,
    explanation:
      'Swapping any two phases reverses the phase rotation, causing three-phase motors to run in the opposite direction.',
    section: '3.3',
    difficulty: 'basic',
  },
  {
    id: 85,
    question: 'What is a star-delta starter used for?',
    options: [
      'Photovoltaic effect in a semiconductor p-n junction',
      'Reducing starting current of large three-phase motors',
      'Sum of voltages around a closed loop equals zero',
      'Rotor with aluminium or copper bars short-circuited by end rings',
    ],
    correctAnswer: 1,
    explanation:
      'Star-delta starting reduces motor starting current to about 1/3 of direct-on-line current by initially connecting windings in star, then switching to delta.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 86,
    question: 'By what factor does star-delta starting reduce starting current compared to DOL?',
    options: [
      'Half',
      'One-quarter',
      'One-third',
      'Two-thirds',
    ],
    correctAnswer: 2,
    explanation:
      'Star-delta starting reduces voltage per winding by √3, so starting current is reduced to approximately 1/3 of DOL starting current.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 87,
    question: 'What is the UK colour coding for three-phase conductors?',
    options: [
      'Red, Yellow, Blue',
      'Red, White, Blue',
      'L1, L2, L3',
      'Brown, Black, Grey',
    ],
    correctAnswer: 3,
    explanation:
      'UK harmonised colours for three-phase are: L1=Brown, L2=Black, L3=Grey, N=Blue, Earth=Green/Yellow',
    section: '3.3',
    difficulty: 'basic',
  },
  {
    id: 88,
    question:
      'A three-phase motor is rated at 15kW with efficiency 90% and PF 0.85. What is the line current at 400V?',
    options: [
      '28.3A',
      '25.4A',
      '21.6A',
      '32.4A',
    ],
    correctAnswer: 0,
    explanation:
      'Input power = 15000/0.9 = 16,667W. I = P/(√3 × VL × PF) = 16,667/(1.732 × 400 × 0.85) = 28.3A',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 89,
    question:
      'What is the neutral current if phase currents are L1=30A, L2=20A, L3=25A (all in phase with their voltages)?',
    options: [
      '75A',
      'Approximately 8.66A',
      '25A',
      'Zero',
    ],
    correctAnswer: 1,
    explanation:
      'For unbalanced loads, neutral current requires vector addition of the three phase currents. Simple calculation gives approximately 8.66A for this example.',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 90,
    question: 'What is a four-wire three-phase system?',
    options: [
      'Three phases plus earth',
      'Four phases',
      'Three phases plus neutral',
      'Three phases plus two neutrals',
    ],
    correctAnswer: 2,
    explanation:
      'A four-wire three-phase system has three phase conductors plus a neutral, allowing both three-phase and single-phase loads to be connected.',
    section: '3.3',
    difficulty: 'basic',
  },
  {
    id: 91,
    question: 'What is a three-wire three-phase system?',
    options: [
      'Three phase delta supply only',
      'Three phases with earth only',
      'Two phases plus neutral',
      'Three phases with no neutral',
    ],
    correctAnswer: 3,
    explanation:
      'A three-wire system has only the three phase conductors with no neutral. Used for balanced loads like motors or delta-connected equipment.',
    section: '3.3',
    difficulty: 'basic',
  },
  {
    id: 92,
    question: 'What is the total apparent power of a balanced three-phase load?',
    options: [
      'S = √3 × VL × IL',
      'S = 3 × VL × IL',
      'S = VL × IL × √3/2',
      'S = VL × IL',
    ],
    correctAnswer: 0,
    explanation:
      'Three-phase apparent power S = √3 × VL × IL (in VA or kVA), regardless of power factor.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 93,
    question: 'What is phase voltage in a 400V three-phase system?',
    options: [
      '400V',
      '231V',
      '133V',
      '693V',
    ],
    correctAnswer: 1,
    explanation: 'Phase voltage Vp = VL/√3 = 400/1.732 = 231V (≈230V)',
    section: '3.3',
    difficulty: 'basic',
  },
  {
    id: 94,
    question: 'A 400V three-phase heater has three 50Ω elements in star. What is the total power?',
    options: [
      '3,200W',
      '9,600W',
      '3,174W',
      '5,529W',
    ],
    correctAnswer: 2,
    explanation:
      'Phase voltage = 400/√3 = 231V. Power per phase = V²/R = 231²/50 = 1,067W. Total = 3 × 1,067 = 3,200W (approximately 3,174W exact)',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 95,
    question: 'The same 50Ω elements connected in delta across 400V would dissipate:',
    options: [
      '3,200W',
      '1,067W',
      '5,542W',
      '9,600W',
    ],
    correctAnswer: 3,
    explanation:
      'In delta, each element sees 400V. Power per phase = 400²/50 = 3,200W. Total = 3 × 3,200 = 9,600W (three times star power)',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 96,
    question: 'What instrument measures phase rotation?',
    options: [
      'Phase rotation indicator/meter',
      'Three phases with no neutral',
      '2πf (radians per second)',
      '70-95% depending on size and type',
    ],
    correctAnswer: 0,
    explanation:
      'A phase rotation indicator (or phase sequence indicator) determines the direction of phase rotation before connecting motors or sensitive equipment.',
    section: '3.3',
    difficulty: 'basic',
  },
  {
    id: 97,
    question: 'What is an unbalanced load?',
    options: [
      'By adding capacitors to counteract inductive reactive power',
      'A load with unequal current draw on each phase',
      'Direction of induced EMF in a generator',
      'A motor that runs at exactly synchronous speed',
    ],
    correctAnswer: 1,
    explanation:
      'An unbalanced load draws different currents on each phase. This causes neutral current to flow and can cause voltage unbalance.',
    section: '3.3',
    difficulty: 'basic',
  },
  {
    id: 98,
    question: 'What problems can phase unbalance cause in three-phase motors?',
    options: [
      'No changing current means no changing magnetic field, so no induced voltage',
      'Rotational force produced by the motor, measured in Nm',
      'Increased heating, reduced torque, and potential motor damage',
      'Smoother power delivery and more efficient for motors',
    ],
    correctAnswer: 2,
    explanation:
      'Phase unbalance causes uneven currents in motor windings, leading to overheating, reduced efficiency, lower torque, vibration, and potential damage.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 99,
    question: 'What percentage voltage unbalance is typically acceptable for motors?',
    options: [
      'Up to 10%',
      'Any unbalance is acceptable',
      'Up to 5%',
      'Up to 2-3%',
    ],
    correctAnswer: 3,
    explanation:
      'Voltage unbalance should generally be kept below 2-3%. Even small voltage unbalance causes much larger current unbalance in motors.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 100,
    question:
      'A 22kW three-phase motor at 400V, PF=0.88, efficiency=91%. What is the line current?',
    options: [
      '39.5A',
      '44.7A',
      '35.2A',
      '31.7A',
    ],
    correctAnswer: 0,
    explanation:
      'Input = 22000/0.91 = 24,176W. IL = P/(√3 × VL × PF) = 24,176/(1.732 × 400 × 0.88) = 39.5A',
    section: '3.3',
    difficulty: 'advanced',
  },

  // ============================================
  // Section 3.4: Transformers (Questions 101-125)
  // ============================================
  {
    id: 101,
    question: 'What is the basic principle of a transformer?',
    options: [
      'Electrostatic induction',
      'Electromagnetic induction',
      'Chemical energy conversion',
      'Thermal energy transfer',
    ],
    correctAnswer: 1,
    explanation:
      'Transformers work on electromagnetic induction - a changing current in the primary creates a changing magnetic field that induces voltage in the secondary.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 102,
    question: 'What determines the voltage ratio of a transformer?',
    options: [
      'The core material',
      'The frequency',
      'The turns ratio (N2/N1)',
      'The power rating',
    ],
    correctAnswer: 2,
    explanation:
      'Voltage ratio equals turns ratio: V2/V1 = N2/N1. Double the secondary turns doubles the secondary voltage.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 103,
    question:
      'A transformer has 500 primary turns and 50 secondary turns. If primary voltage is 230V, what is secondary voltage?',
    options: [
      '115V',
      '2,300V',
      '2.3V',
      '23V',
    ],
    correctAnswer: 3,
    explanation:
      'V2 = V1 × (N2/N1) = 230 × (50/500) = 230 × 0.1 = 23V. This is a step-down transformer (10:1 ratio).',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 104,
    question: 'What is a step-up transformer?',
    options: [
      'A transformer that increases voltage',
      'A transformer that increases current',
      'A transformer on steps',
      'A transformer with variable output',
    ],
    correctAnswer: 0,
    explanation:
      'A step-up transformer has more secondary turns than primary, so output voltage is higher than input voltage.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 105,
    question: 'In an ideal transformer, if voltage is stepped up, what happens to current?',
    options: [
      'Current stays the same',
      'Current decreases proportionally',
      'Current becomes zero',
      'Current also increases',
    ],
    correctAnswer: 1,
    explanation:
      'Power is conserved in an ideal transformer: P1 = P2, so V1I1 = V2I2. If voltage doubles, current halves.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 106,
    question:
      'A 100VA transformer has 230V primary and 12V secondary. What is the maximum secondary current?',
    options: [
      '0.43A',
      '100A',
      '8.33A',
      '19.2A',
    ],
    correctAnswer: 2,
    explanation: 'VA = V × I, so Isec = VA/Vsec = 100/12 = 8.33A',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 107,
    question: 'What is transformer efficiency typically?',
    options: [
      '50-60%',
      '70-80%',
      '100%',
      '95-99%',
    ],
    correctAnswer: 3,
    explanation:
      'Transformers are highly efficient devices, typically 95-99% efficient, with losses mainly from core hysteresis, eddy currents, and winding resistance.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 108,
    question: 'What causes eddy current losses in transformers?',
    options: [
      'Circulating currents induced in the iron core',
      'A load with unequal current draw on each phase',
      'Simple, robust, low maintenance, and lower cost',
      'When copper losses equal iron losses',
    ],
    correctAnswer: 0,
    explanation:
      'Eddy currents are circular currents induced in the iron core by the changing magnetic field. They cause heating and energy loss.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 109,
    question: 'How are eddy current losses minimised?',
    options: [
      'A DC motor without brushes, using electronic commutation',
      'Using laminated cores (thin insulated sheets)',
      'Reducing starting current of large three-phase motors',
      'Equal load on each phase with equal phase angles',
    ],
    correctAnswer: 1,
    explanation:
      'Laminating the core (using thin insulated sheets) increases resistance to eddy currents, reducing losses significantly.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 110,
    question: 'What are hysteresis losses in transformers?',
    options: [
      'Smoother power delivery and more efficient for motors',
      'The reciprocal of resistance, measured in siemens (S)',
      'Energy lost in repeatedly magnetising and demagnetising the core',
      'A load with unequal current draw on each phase',
    ],
    correctAnswer: 2,
    explanation:
      'Hysteresis losses occur because energy is required to repeatedly reverse the magnetic domains in the core material during each AC cycle.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 111,
    question: 'What is the purpose of an isolation transformer?',
    options: [
      'Varying both the supply frequency and the voltage proportionally (V/f control)',
      'A contactor is generally larger and rated for higher current loads, often with auxiliary contacts',
      'Lower power factor means transformer handles more kVA for the same kW delivered',
      'To provide electrical isolation between primary and secondary with no voltage change',
    ],
    correctAnswer: 3,
    explanation:
      'An isolation transformer (1:1 ratio) provides electrical isolation between input and output circuits for safety, without changing voltage.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 112,
    question: "Why can't transformers work with DC?",
    options: [
      'No changing current means no changing magnetic field, so no induced voltage',
      'Energy lost in repeatedly magnetising and demagnetising the core',
      'A meter measuring reactive energy consumption over time',
      'At standstill, there is no back-EMF to oppose supply, so only winding resistance limits current',
    ],
    correctAnswer: 0,
    explanation:
      'Transformers require a changing magnetic field to induce voltage. DC produces a steady magnetic field, so no voltage is induced in the secondary.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 113,
    question: 'What is a current transformer (CT) used for?',
    options: [
      'An electronic device that controls motor speed by varying the supply frequency',
      'Measuring high currents by stepping them down to a safe measurable level',
      'A motor using permanent magnets instead of electromagnetic field windings',
      'Sum of individual demands × appropriate diversity factors',
    ],
    correctAnswer: 1,
    explanation:
      'Current transformers step down high currents to lower values (typically 1A or 5A) safe for measurement and metering instruments.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 114,
    question: 'Why must a CT secondary never be open-circuited while energised?',
    options: [
      'Current-carrying conductor in a magnetic field experiences a force',
      'The effect of harmonic distortion on total power factor',
      'Dangerous high voltages develop that can damage insulation and harm personnel',
      'Direct-On-Line starting - connecting the motor directly to full supply voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Open-circuiting a CT removes the demagnetising effect of secondary current, causing core saturation and dangerous high voltages on the secondary.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 115,
    question: 'What is a voltage transformer (VT/PT) used for?',
    options: [
      'Total opposition to AC, combining resistance and reactance',
      'To maintain constant magnetic flux and prevent motor overheating',
      'Sum of individual demands × appropriate diversity factors',
      'Stepping down high voltage for measurement and protection circuits',
    ],
    correctAnswer: 3,
    explanation:
      'Voltage transformers (potential transformers) step down high voltages to standard values (typically 110V) for safe measurement and protection relay operation.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 116,
    question: 'What is an auto-transformer?',
    options: [
      'A transformer with a single winding serving as both primary and secondary',
      'The order in which the three phases reach their peak values',
      'To maintain constant magnetic flux and prevent motor overheating',
      'Direction of force on a current-carrying conductor in a magnetic field (motor action)',
    ],
    correctAnswer: 0,
    explanation:
      'An auto-transformer has one winding with taps, with part of the winding common to both primary and secondary. More efficient but no isolation.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 117,
    question: 'What advantage does an auto-transformer have?',
    options: [
      'Energy lost in repeatedly magnetising and demagnetising the core',
      'Smaller, lighter, cheaper, and more efficient for small voltage changes',
      'Multiply tabulated values by 1.20 (for 70°C operating) for thermoplastic cables',
      'Direct-On-Line starting - connecting the motor directly to full supply voltage',
    ],
    correctAnswer: 1,
    explanation:
      'Auto-transformers are smaller, lighter, and more efficient than two-winding transformers for small voltage differences, but provide no isolation.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 118,
    question: 'What is voltage regulation in transformers?',
    options: [
      'Power factor determined by the phase angle between fundamental voltage and current',
      'A transformer with a single winding serving as both primary and secondary',
      'The change in secondary voltage from no-load to full-load, expressed as a percentage',
      'A device that reduces starting current by gradually increasing voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Voltage regulation = (Vno-load - Vfull-load)/Vfull-load × 100%. Good regulation means small voltage change with varying load.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: 'What is transformer impedance (Z%)?',
    options: [
      'The order in which the three phases reach their peak values',
      'By reducing current flow for the same real power, current squared losses decrease',
      'To protect the motor from excessive current that could cause overheating',
      'The percentage voltage drop at full load due to resistance and reactance',
    ],
    correctAnswer: 3,
    explanation:
      'Impedance voltage (Z%) is the primary voltage needed to circulate full-load current with the secondary short-circuited, expressed as a percentage.',
    section: '3.4',
    difficulty: 'advanced',
  },
  {
    id: 120,
    question:
      'A 1000kVA transformer has 5% impedance. What is the fault current with a secondary short circuit?',
    options: [
      '20 × full load current',
      '100 × full load current',
      '5 × full load current',
      '50 × full load current',
    ],
    correctAnswer: 0,
    explanation: 'Short circuit current = Full load current / (Z%/100) = FLC / 0.05 = 20 × FLC',
    section: '3.4',
    difficulty: 'advanced',
  },
  {
    id: 121,
    question: 'What is a three-phase transformer connection Dy11?',
    options: [
      "Stepping down high voltage for measurement and protection circuits",
      "Delta primary, star secondary with 11 o'clock phase shift",
      "True power divided by apparent power (cos φ)",
      "The reciprocal of resistance, measured in siemens (S)",
    ],
    correctAnswer: 1,
    explanation:
      "Dy11 indicates Delta primary (D), star secondary (y), with secondary leading primary by 30° (11 o'clock position on a clock diagram).",
    section: '3.4',
    difficulty: 'advanced',
  },
  {
    id: 122,
    question: 'Why is oil used in large transformers?',
    options: [
      'For lubrication',
      'To increase efficiency',
      'For cooling and insulation',
      'To reduce noise',
    ],
    correctAnswer: 2,
    explanation:
      'Transformer oil provides electrical insulation and helps remove heat from the windings through convection.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 123,
    question: 'What is a tap changer used for?',
    options: [
      'A load with unequal current draw on each phase',
      'The ratio of true power to apparent power (cos φ)',
      'Ingress Protection - protection against solid objects and liquids',
      'Adjusting the turns ratio to regulate output voltage',
    ],
    correctAnswer: 3,
    explanation:
      'Tap changers allow adjustment of the turns ratio (by selecting different winding taps) to compensate for voltage variations and maintain output voltage.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 124,
    question: 'What is the kVA rating of a transformer?',
    options: [
      'Its maximum continuous apparent power output',
      'Power stored and returned by inductors and capacitors',
      'A load with unequal current draw on each phase',
      'Sum of voltages around a closed loop equals zero',
    ],
    correctAnswer: 0,
    explanation:
      'kVA rating is the maximum continuous apparent power the transformer can deliver without exceeding temperature limits.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 125,
    question: 'A 50kVA transformer at 400V secondary can deliver maximum current of:',
    options: ['125A', '72.2A', '50A', '200A'],
    correctAnswer: 1,
    explanation: 'For three-phase: I = kVA × 1000/(√3 × V) = 50,000/(1.732 × 400) = 72.2A',
    section: '3.4',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 3.5: Motors & Generators (Questions 126-160)
  // ============================================
  {
    id: 126,
    question: 'What is the principle of motor operation?',
    options: [
      'Equal load on each phase with equal phase angles',
      'Sum of individual demands × appropriate diversity factors',
      'Current-carrying conductor in a magnetic field experiences a force',
      'To provide a return path for unbalanced currents and single-phase loads',
    ],
    correctAnswer: 2,
    explanation:
      "Motors work on the principle that a current-carrying conductor in a magnetic field experiences a force (Fleming's Left Hand Rule).",
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 127,
    question: 'What is the principle of generator operation?',
    options: [
      'Resistance increases as temperature increases',
      'When inductive reactance equals capacitive reactance',
      'True power divided by apparent power (cos φ)',
      'Moving a conductor through a magnetic field induces an EMF',
    ],
    correctAnswer: 3,
    explanation:
      "Generators work on electromagnetic induction - moving a conductor through a magnetic field (or vice versa) induces an EMF (Fleming's Right Hand Rule).",
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 128,
    question: "What does Fleming's Left Hand Rule determine?",
    options: [
      'Direction of force on a current-carrying conductor in a magnetic field (motor action)',
      'The change in secondary voltage from no-load to full-load, expressed as a percentage',
      'Converting kinetic energy back to electrical energy during deceleration',
      'A single-phase motor using a capacitor to create phase shift for starting',
    ],
    correctAnswer: 0,
    explanation:
      "Fleming's Left Hand Rule gives the direction of force on a current-carrying conductor: First finger=Field, seCond finger=Current, thuMb=Motion.",
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 129,
    question: "What does Fleming's Right Hand Rule determine?",
    options: [
      'Sum of voltages around a closed loop equals zero',
      'Direction of induced EMF in a generator',
      'A load with unequal current draw on each phase',
      'V × I (the product of RMS voltage and current)',
    ],
    correctAnswer: 1,
    explanation:
      "Fleming's Right Hand Rule gives the direction of induced EMF (generator action): First finger=Field, thuMb=Motion, seCond finger=Current/EMF.",
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 130,
    question: 'What is an induction motor?',
    options: [
      "Direct-On-Line starting - connecting the motor directly to full supply voltage",
      "To maintain constant magnetic flux and prevent motor overheating",
      "A motor where the rotor current is induced by the stator's rotating magnetic field",
      "To reduce I²R transmission losses by reducing current for the same power",
    ],
    correctAnswer: 2,
    explanation:
      'In an induction motor, the rotating stator magnetic field induces currents in the rotor conductors, which then experience a force producing rotation.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 131,
    question: 'What is synchronous speed?',
    options: [
      'A contactor is generally larger and rated for higher current loads, often with auxiliary contacts',
      'A material property indicating how strongly it opposes current flow',
      'A device that reduces starting current by gradually increasing voltage',
      'The speed of the rotating magnetic field, determined by supply frequency and number of poles',
    ],
    correctAnswer: 3,
    explanation:
      'Synchronous speed Ns = (120 × f) / p, where f is frequency in Hz and p is number of poles. At 50Hz, 4-pole: Ns = 1500 RPM.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 132,
    question: 'What is the synchronous speed of a 4-pole motor at 50Hz?',
    options: [
      '1500 RPM',
      '1000 RPM',
      '750 RPM',
      '3000 RPM',
    ],
    correctAnswer: 0,
    explanation: 'Ns = (120 × f) / p = (120 × 50) / 4 = 6000/4 = 1500 RPM',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 133,
    question: 'What is slip in an induction motor?',
    options: [
      'Capacitors installed to improve power factor by supplying reactive power locally',
      'The difference between synchronous speed and actual rotor speed',
      'No changing current means no changing magnetic field, so no induced voltage',
      'International Efficiency classes - IE1 (Standard) to IE5 (Ultra Premium)',
    ],
    correctAnswer: 1,
    explanation:
      'Slip is the difference between synchronous and rotor speed, usually expressed as a percentage: s = (Ns - Nr)/Ns × 100%',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 134,
    question:
      'A 4-pole motor has synchronous speed 1500 RPM and runs at 1440 RPM. What is the slip?',
    options: [
      '6%',
      '2%',
      '4%',
      '60 RPM',
    ],
    correctAnswer: 2,
    explanation: 'Slip = (Ns - Nr)/Ns × 100% = (1500 - 1440)/1500 × 100% = 60/1500 × 100% = 4%',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 135,
    question: 'Why does an induction motor need slip to operate?',
    options: [
      'Converting kinetic energy back to electrical energy during deceleration',
      'A contactor is generally larger and rated for higher current loads, often with auxiliary contacts',
      'International Efficiency classes - IE1 (Standard) to IE5 (Ultra Premium)',
      'Without slip, there would be no relative motion between rotor and field, so no induced current',
    ],
    correctAnswer: 3,
    explanation:
      'Slip creates relative motion between the rotor and rotating field. This relative motion is needed to induce current in the rotor and produce torque.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 136,
    question: 'What type of rotor does a squirrel cage motor have?',
    options: [
      'Rotor with aluminium or copper bars short-circuited by end rings',
      'No changing current means no changing magnetic field, so no induced voltage',
      'Adjusting the turns ratio to regulate output voltage',
      'Simple, robust, low maintenance, and lower cost',
    ],
    correctAnswer: 0,
    explanation:
      'A squirrel cage rotor has conductive bars (aluminium or copper) short-circuited at both ends by rings, resembling a squirrel cage.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 137,
    question: 'What is the advantage of a squirrel cage motor?',
    options: [
      'The reciprocal of resistance, measured in siemens (S)',
      'Simple, robust, low maintenance, and lower cost',
      'A load with unequal current draw on each phase',
      'Sum of individual demands × appropriate diversity factors',
    ],
    correctAnswer: 1,
    explanation:
      'Squirrel cage motors are simple, robust, require minimal maintenance (no brushes or slip rings), and are less expensive than wound rotor motors.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 138,
    question:
      'What is the typical starting current of a squirrel cage motor compared to full load current?',
    options: [
      'Same as full load',
      '2-3 times full load',
      '6-8 times full load',
      'Half of full load',
    ],
    correctAnswer: 2,
    explanation:
      'Direct-on-line starting current is typically 6-8 times full load current, which is why starting methods are used for large motors.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 139,
    question: 'What is a Variable Frequency Drive (VFD)?',
    options: [
      'Slight voltage rise due to reduced voltage drop from lower reactive current',
      'The change in secondary voltage from no-load to full-load, expressed as a percentage',
      'To provide a return path for unbalanced currents and single-phase loads',
      'An electronic device that controls motor speed by varying the supply frequency',
    ],
    correctAnswer: 3,
    explanation:
      'A VFD (or Variable Speed Drive) controls motor speed by varying the frequency and voltage of the power supplied to an AC motor.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 140,
    question: 'Why is V/f ratio kept constant in VFD control?',
    options: [
      'To maintain constant magnetic flux and prevent motor overheating',
      'The order in which the three phases reach their peak values',
      'A single-phase motor using a capacitor to create phase shift for starting',
      'Energy lost in repeatedly magnetising and demagnetising the core',
    ],
    correctAnswer: 0,
    explanation:
      'Keeping V/f constant maintains constant magnetic flux in the motor. Reducing frequency without reducing voltage would cause core saturation and overheating.',
    section: '3.5',
    difficulty: 'advanced',
  },
  {
    id: 141,
    question: 'What is a soft starter?',
    options: [
      'Smoother power delivery and more efficient for motors',
      'A device that reduces starting current by gradually increasing voltage',
      'A motor where the rotor current is induced by the stator\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s rotating magnetic field',
      'The order in which the three phases reach their peak values',
    ],
    correctAnswer: 1,
    explanation:
      'A soft starter uses thyristors to gradually increase voltage to the motor during starting, reducing starting current and mechanical stress.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 142,
    question: 'What is the main function of motor starters?',
    options: [
      'To safely discharge stored energy when disconnected, preventing shock hazard',
      'Stepping down high voltage for measurement and protection circuits',
      'To provide starting, stopping, protection, and sometimes speed control',
      'When inductive reactance equals capacitive reactance',
    ],
    correctAnswer: 2,
    explanation:
      'Motor starters provide controlled starting, stopping, overload protection, and may provide reduced voltage starting and other control functions.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 143,
    question: 'What is DOL starting?',
    options: [
      'The ratio of the sum of harmonic powers to the fundamental power',
      'Varying both the supply frequency and the voltage proportionally (V/f control)',
      'Maximum temperature rating of 155°C for the winding insulation',
      'Direct-On-Line starting - connecting the motor directly to full supply voltage',
    ],
    correctAnswer: 3,
    explanation:
      'DOL (Direct-On-Line) starting connects the motor directly to the supply at full voltage, resulting in high starting current but simple control.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 144,
    question: 'What is the purpose of a motor overload relay?',
    options: [
      'To protect the motor from excessive current that could cause overheating',
      'A motor using permanent magnets instead of electromagnetic field windings',
      'The steady current producing the same heating effect as the intermittent load',
      'Reducing starting current of large three-phase motors',
    ],
    correctAnswer: 0,
    explanation:
      'Overload relays protect motors from sustained overcurrent that could cause overheating and winding damage, typically set at 105-125% of full load current.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 145,
    question: 'What is the difference between overload and short circuit protection?',
    options: [
      'By reducing current flow for the same real power, current squared losses decrease',
      'Overload protects against moderate sustained overcurrent; short circuit protects against very high fault currents',
      'At standstill, there is no back-EMF to oppose supply, so only winding resistance limits current',
      'Without slip, there would be no relative motion between rotor and field, so no induced current',
    ],
    correctAnswer: 1,
    explanation:
      'Overload protection is slow (allows starting current) but trips on sustained moderate overcurrent. Short circuit protection trips instantly on very high fault currents.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 146,
    question: 'What is motor power factor typically like?',
    options: [
      'A load with unequal current draw on each phase',
      '60 seconds to discharge to <50V',
      'Lagging, typically 0.8-0.9 at full load',
      '70-95% depending on size and type',
    ],
    correctAnswer: 2,
    explanation:
      "Induction motors have lagging power factor due to magnetising current. At full load, PF is typically 0.8-0.9; at light loads it's much lower.",
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 147,
    question: 'What is motor efficiency typically?',
    options: [
      'P = √3 × VL × IL × cos(φ)',
      'Lagging, typically 0.8-0.9 at full load',
      'Phase rotation indicator/meter',
      '70-95% depending on size and type',
    ],
    correctAnswer: 3,
    explanation:
      'Motor efficiency varies with size: small motors 70-85%, larger motors 90-95%+. IE efficiency classes define minimum efficiency levels.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 148,
    question: 'What are motor IE efficiency classes?',
    options: [
      'International Efficiency classes - IE1 (Standard) to IE5 (Ultra Premium)',
      'Increased heating, reduced torque, and potential motor damage',
      'The effect of harmonic distortion on total power factor',
      'Stepping down high voltage for measurement and protection circuits',
    ],
    correctAnswer: 0,
    explanation:
      'IE classes define motor efficiency levels: IE1 (Standard), IE2 (High), IE3 (Premium), IE4 (Super Premium), IE5 (Ultra Premium).',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 149,
    question: 'What is a single-phase induction motor?',
    options: [
      'Converting kinetic energy back to electrical energy during deceleration',
      'A motor designed to run on single-phase supply using starting mechanisms',
      'Energy lost in repeatedly magnetising and demagnetising the core',
      'To safely discharge stored energy when disconnected, preventing shock hazard',
    ],
    correctAnswer: 1,
    explanation:
      "Single-phase induction motors need auxiliary starting means (capacitor, split-phase, shaded pole) as single-phase supply doesn't create a rotating field directly.",
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 150,
    question: 'What is a capacitor-start motor?',
    options: [
      'A meter measuring reactive energy consumption over time',
      'Rotational force produced by the motor, measured in Nm',
      'A single-phase motor using a capacitor to create phase shift for starting',
      'To protect the motor from excessive current that could cause overheating',
    ],
    correctAnswer: 2,
    explanation:
      'A capacitor-start motor uses a capacitor in series with a starting winding to create phase shift, producing a rotating field for starting.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 151,
    question: 'What is a synchronous motor?',
    options: [
      'Direction of induced EMF in a generator',
      'Power stored and returned by inductors and capacitors',
      'The DC equivalent that produces the same heating effect',
      'A motor that runs at exactly synchronous speed',
    ],
    correctAnswer: 3,
    explanation:
      'A synchronous motor runs at exactly synchronous speed, with no slip. It requires DC excitation or permanent magnets and is used where precise speed is needed.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 152,
    question: 'What is back-EMF in a motor?',
    options: [
      'The voltage induced in motor windings that opposes the supply, increasing with speed',
      'Stepping down high voltage for measurement and protection circuits',
      'International Efficiency classes - IE1 (Standard) to IE5 (Ultra Premium)',
      'Energy lost in repeatedly magnetising and demagnetising the core',
    ],
    correctAnswer: 0,
    explanation:
      'Back-EMF is voltage induced in the motor windings opposing the supply (like a generator). It increases with speed and limits motor current.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 153,
    question: 'Why is starting current so high in motors?',
    options: [
      'A device that reduces starting current by gradually increasing voltage',
      'At standstill, there is no back-EMF to oppose supply, so only winding resistance limits current',
      'A transformer with a single winding serving as both primary and secondary',
      'The percentage voltage drop at full load due to resistance and reactance',
    ],
    correctAnswer: 1,
    explanation:
      'At standstill, back-EMF is zero (no rotation). Only the low winding resistance limits current, resulting in high starting current.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 154,
    question: 'What is a permanent magnet motor?',
    options: [
      'Capacitors installed to improve power factor by supplying reactive power locally',
      'Smoother power delivery and more efficient for motors',
      'A motor using permanent magnets instead of electromagnetic field windings',
      'To maintain constant magnetic flux and prevent motor overheating',
    ],
    correctAnswer: 2,
    explanation:
      'Permanent magnet motors use permanent magnets (often in the rotor) instead of electromagnets, offering high efficiency and power density.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 155,
    question: 'What is a brushless DC (BLDC) motor?',
    options: [
      'Using laminated cores (thin insulated sheets)',
      'The reciprocal of resistance, measured in siemens (S)',
      'Total opposition to AC, combining resistance and reactance',
      'A DC motor without brushes, using electronic commutation',
    ],
    correctAnswer: 3,
    explanation:
      'BLDC motors have permanent magnet rotors and wound stators. Electronic commutation replaces mechanical brushes, improving reliability and efficiency.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 156,
    question: 'What is motor torque?',
    options: [
      'Rotational force produced by the motor, measured in Nm',
      'It reduces neutral current, voltage imbalance and supply losses',
      'The difference between synchronous speed and actual rotor speed',
      'The effect of harmonic distortion on total power factor',
    ],
    correctAnswer: 0,
    explanation:
      'Torque is the rotational force a motor produces, measured in Newton-metres (Nm). Power = Torque × Angular velocity.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 157,
    question: 'What is the relationship between power, torque, and speed?',
    options: [
      'Direction of induced EMF in a generator',
      'P = (2π × n × T) / 60 where n is RPM',
      'Its maximum continuous apparent power output',
      'Vrms = Vp / √2 (or Vp × 0.707)',
    ],
    correctAnswer: 1,
    explanation:
      'Power (W) = (2π × n × T) / 60, where n is speed in RPM and T is torque in Nm. Or P = ω × T where ω is rad/s.',
    section: '3.5',
    difficulty: 'advanced',
  },
  {
    id: 158,
    question: 'What is the IP rating of a motor?',
    options: [
      'Capacitors installed to improve power factor by supplying reactive power locally',
      'Multiply tabulated values by 1.20 (for 70°C operating) for thermoplastic cables',
      'Ingress Protection - protection against solid objects and liquids',
      'A device that reduces starting current by gradually increasing voltage',
    ],
    correctAnswer: 2,
    explanation:
      'IP rating (e.g., IP55) indicates protection against ingress of solids (first digit) and liquids (second digit). Higher numbers mean better protection.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 159,
    question: 'What does motor insulation Class F mean?',
    options: [
      'Using four diodes that conduct in pairs on each half cycle',
      'To provide a return path for unbalanced currents and single-phase loads',
      'The percentage voltage drop at full load due to resistance and reactance',
      'Maximum temperature rating of 155°C for the winding insulation',
    ],
    correctAnswer: 3,
    explanation:
      'Insulation classes indicate maximum operating temperature: Class B=130°C, Class F=155°C, Class H=180°C. Exceeding these shortens insulation life.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 160,
    question: 'What is regenerative braking in motors?',
    options: [
      'Converting kinetic energy back to electrical energy during deceleration',
      'Ingress Protection - protection against solid objects and liquids',
      'The order in which the three phases reach their peak values',
      'A motor designed to run on single-phase supply using starting mechanisms',
    ],
    correctAnswer: 0,
    explanation:
      'Regenerative braking converts mechanical kinetic energy back to electrical energy (motor acts as generator during braking), which can be returned to supply or dissipated.',
    section: '3.5',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 3.6: Power Factor (Questions 161-185)
  // ============================================
  {
    id: 161,
    question: 'What is power factor?',
    options: [
      'Opposition of an inductor to AC, increasing with frequency',
      'The ratio of true power to apparent power (cos φ)',
      'Its maximum continuous apparent power output',
      'Sum of voltages around a closed loop equals zero',
    ],
    correctAnswer: 1,
    explanation:
      'Power factor is the ratio of true power (W) to apparent power (VA): PF = P/S = cos φ. It indicates how effectively power is used.',
    section: '3.6',
    difficulty: 'basic',
  },
  {
    id: 162,
    question: 'What is the ideal power factor?',
    options: [
      '0',
      '0.5',
      '1.0 (unity)',
      '-1.0',
    ],
    correctAnswer: 2,
    explanation:
      'Unity power factor (1.0) is ideal - all power supplied does useful work. Current and voltage are in phase.',
    section: '3.6',
    difficulty: 'basic',
  },
  {
    id: 163,
    question: 'What type of load causes lagging power factor?',
    options: [
      'LED lights',
      'Resistive',
      'Capacitive',
      'Inductive',
    ],
    correctAnswer: 3,
    explanation:
      'Inductive loads (motors, transformers, inductors) cause lagging power factor because current lags behind voltage.',
    section: '3.6',
    difficulty: 'basic',
  },
  {
    id: 164,
    question: 'What type of load causes leading power factor?',
    options: [
      'Capacitive',
      'Motors',
      'Resistive',
      'Inductive',
    ],
    correctAnswer: 0,
    explanation:
      'Capacitive loads cause leading power factor because current leads voltage in capacitive circuits.',
    section: '3.6',
    difficulty: 'basic',
  },
  {
    id: 165,
    question: 'Why is low power factor undesirable?',
    options: [
      'The reciprocal of resistance, measured in siemens (S)',
      'Higher current needed for same power, causing increased losses and charges',
      'A DC motor without brushes, using electronic commutation',
      'Without slip, there would be no relative motion between rotor and field, so no induced current',
    ],
    correctAnswer: 1,
    explanation:
      'Low PF means higher current for the same real power, causing increased I²R losses, voltage drops, larger cable requirements, and often penalty charges.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 166,
    question: 'A load draws 100kVA at 0.7 PF. How much true power is consumed?',
    options: [
      '100kW',
      '143kW',
      '70kW',
      '30kW',
    ],
    correctAnswer: 2,
    explanation: 'True Power P = Apparent Power × PF = 100kVA × 0.7 = 70kW',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 167,
    question: 'How is power factor corrected?',
    options: [
      'The reciprocal of resistance, measured in siemens (S)',
      'Tendency for AC current to flow near the conductor surface',
      'Maximum power is transferred when load resistance equals source resistance',
      'By adding capacitors to counteract inductive reactive power',
    ],
    correctAnswer: 3,
    explanation:
      'Capacitors supply leading reactive power that cancels lagging reactive power from inductors, improving overall power factor.',
    section: '3.6',
    difficulty: 'basic',
  },
  {
    id: 168,
    question: 'What are power factor correction capacitors?',
    options: [
      'Capacitors installed to improve power factor by supplying reactive power locally',
      'A device that reduces starting current by gradually increasing voltage',
      'Converting kinetic energy back to electrical energy during deceleration',
      'No changing current means no changing magnetic field, so no induced voltage',
    ],
    correctAnswer: 0,
    explanation:
      'PFC capacitors supply the reactive power needed by inductive loads locally, reducing reactive current drawn from the supply.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 169,
    question:
      'A motor draws 50A at 230V with PF 0.75. What capacitor kVAr is needed to correct to 0.95?',
    options: [
      'Approximately 4.5kVAr',
      'Approximately 5.5kVAr',
      'Approximately 11.5kVAr',
      'Approximately 8.6kVAr',
    ],
    correctAnswer: 1,
    explanation:
      'Current PF=0.75, angle=41.4°, tan=0.88. Target PF=0.95, angle=18.2°, tan=0.33. kVAr needed = P×(tan θ1-tan θ2) = 8.625×(0.88-0.33) ≈ 5.5kVAr',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 170,
    question: 'Where should PFC capacitors ideally be installed?',
    options: [
      'Vd = I × (R cos φ + X sin φ) × L',
      'Photovoltaic effect in a semiconductor p-n junction',
      'As close to the inductive load as possible',
      'If = kVA × 100 / (√3 × V × Z%)',
    ],
    correctAnswer: 2,
    explanation:
      'Installing capacitors close to the load reduces reactive current in more of the distribution system, maximising loss reduction and voltage improvement.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 171,
    question: 'What is automatic power factor correction (APFC)?',
    options: [
      'The speed of the rotating magnetic field, determined by supply frequency and number of poles',
      'Direction of force on a current-carrying conductor in a magnetic field (motor action)',
      'By adding capacitors to counteract inductive reactive power',
      'A system that switches capacitor banks automatically based on measured power factor',
    ],
    correctAnswer: 3,
    explanation:
      'APFC uses a controller to monitor power factor and automatically switch capacitor banks on/off to maintain target power factor as load varies.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 172,
    question: 'What is the danger of over-correction (leading power factor)?',
    options: [
      'Can cause voltage rise, resonance issues, and equipment damage',
      'To protect the motor from excessive current that could cause overheating',
      'Simple, robust, low maintenance, and lower cost',
      'The DC equivalent that produces the same heating effect',
    ],
    correctAnswer: 0,
    explanation:
      'Over-correction causes leading PF, potentially resulting in voltage rise, resonance with system inductance, and damage to capacitors and equipment.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 173,
    question: 'What is reactive power measured in?',
    options: [
      'The same for all branches',
      'VAr (volt-amperes reactive)',
      'The turns ratio (N2/N1)',
      '20 × full load current',
    ],
    correctAnswer: 1,
    explanation:
      'Reactive power is measured in VAr (volt-amperes reactive) or kVAr. It represents energy oscillating between source and load, not consumed.',
    section: '3.6',
    difficulty: 'basic',
  },
  {
    id: 174,
    question: 'What is a kVArh meter?',
    options: [
      'A material property indicating how strongly it opposes current flow',
      'Can cause voltage rise, resonance issues, and equipment damage',
      'A meter measuring reactive energy consumption over time',
      'Resistance increases as temperature increases',
    ],
    correctAnswer: 2,
    explanation:
      'A kVArh meter measures reactive energy consumption. Some tariffs charge for reactive energy or impose penalties for low power factor.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 175,
    question: 'What supply tariff penalty might apply for low power factor?',
    options: [
      'Maximum power is transferred when load resistance equals source resistance',
      'Energy lost in repeatedly magnetising and demagnetising the core',
      'Opposition of a capacitor to AC, decreasing with frequency',
      'Reactive power charges or maximum demand charges on kVA instead of kW',
    ],
    correctAnswer: 3,
    explanation:
      'Utilities may charge for reactive power (kVArh), base demand charges on kVA rather than kW, or impose penalty factors for power factor below a threshold.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 176,
    question: 'What typical power factor do utilities require?',
    options: [
      'Typically 0.9 or 0.95 lagging minimum',
      'A load with unequal current draw on each phase',
      'Simple, robust, low maintenance, and lower cost',
      'Its maximum continuous apparent power output',
    ],
    correctAnswer: 0,
    explanation:
      'Many utilities require minimum power factor of 0.9 or 0.95. Below this, penalty charges or reactive power charges may apply.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 177,
    question: 'What is displacement power factor?',
    options: [
      'The order in which the three phases reach their peak values',
      'Power factor determined by the phase angle between fundamental voltage and current',
      'The difference between synchronous speed and actual rotor speed',
      'Total opposition to AC, combining resistance and reactance',
    ],
    correctAnswer: 1,
    explanation:
      "Displacement power factor is based on the phase displacement between fundamental (50Hz) voltage and current. It's affected by reactive components.",
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 178,
    question: 'What is distortion power factor?',
    options: [
      'Smoother power delivery and more efficient for motors',
      'The ratio of true power to apparent power (cos φ)',
      'The effect of harmonic distortion on total power factor',
      'Adjusting the turns ratio to regulate output voltage',
    ],
    correctAnswer: 2,
    explanation:
      'Distortion power factor accounts for the effect of harmonics. True PF = Displacement PF × Distortion PF. High harmonics reduce true power factor.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 179,
    question: 'What is the effect of harmonics on power factor?',
    options: [
      'A motor designed to run on single-phase supply using starting mechanisms',
      'The effect of harmonic distortion on total power factor',
      'A material property indicating how strongly it opposes current flow',
      'Harmonics reduce true power factor even if displacement power factor is good',
    ],
    correctAnswer: 3,
    explanation:
      'Harmonics increase current without increasing real power, reducing true power factor. Harmonic filters may be needed alongside PFC capacitors.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 180,
    question: 'What is a detuned PFC capacitor bank?',
    options: [
      'Capacitors with series reactors to avoid resonance with system harmonics',
      'No changing current means no changing magnetic field, so no induced voltage',
      'The reciprocal of resistance, measured in siemens (S)',
      'Reducing starting current of large three-phase motors',
    ],
    correctAnswer: 0,
    explanation:
      'Detuned capacitor banks include series reactors that shift the resonant frequency away from common harmonics, preventing dangerous resonance conditions.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 181,
    question: 'What voltage rise might occur with power factor correction?',
    options: [
      'Direct-On-Line starting - connecting the motor directly to full supply voltage',
      'Slight voltage rise due to reduced voltage drop from lower reactive current',
      'The difference between synchronous speed and actual rotor speed',
      'Maximum power is transferred when load resistance equals source resistance',
    ],
    correctAnswer: 1,
    explanation:
      'Reducing reactive current reduces voltage drop in cables and transformers, potentially causing a slight voltage rise, especially at light loads.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 182,
    question: 'Why do capacitors need discharge resistors?',
    options: [
      'Capacitors with series reactors to avoid resonance with system harmonics',
      'To reduce I²R transmission losses by reducing current for the same power',
      'To safely discharge stored energy when disconnected, preventing shock hazard',
      'Rotor with aluminium or copper bars short-circuited by end rings',
    ],
    correctAnswer: 2,
    explanation:
      'Capacitors store charge that can remain after disconnection. Discharge resistors safely dissipate this energy, typically reducing voltage to <50V within 60 seconds.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 183,
    question: 'What is the effect of power factor on transformer loading?',
    options: [
      'A device that reduces starting current by gradually increasing voltage',
      'An electronic device that controls motor speed by varying the supply frequency',
      'Capacitors with series reactors to avoid resonance with system harmonics',
      'Lower power factor means transformer handles more kVA for the same kW delivered',
    ],
    correctAnswer: 3,
    explanation:
      'At low power factor, more current flows for the same real power, so transformer kVA loading increases, potentially requiring larger transformer capacity.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 184,
    question: 'What is the typical discharge time requirement for PFC capacitors?',
    options: [
      '60 seconds to discharge to <50V',
      '2πf (radians per second)',
      'Approximately 1.9 hours',
      'Lagging, typically 0.8-0.9 at full load',
    ],
    correctAnswer: 0,
    explanation:
      'Regulations typically require capacitors to discharge to 50V or less within 60 seconds of disconnection, or 5 minutes in some standards.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 185,
    question: 'How does power factor correction reduce I²R losses?',
    options: [
      'Without slip, there would be no relative motion between rotor and field, so no induced current',
      'By reducing current flow for the same real power, current squared losses decrease',
      'A motor designed to run on single-phase supply using starting mechanisms',
      'Using four diodes that conduct in pairs on each half cycle',
    ],
    correctAnswer: 1,
    explanation:
      'Improving PF reduces current (for same real power). Since losses are proportional to I², reducing current significantly reduces losses.',
    section: '3.6',
    difficulty: 'intermediate',
  },

  // ============================================
  // Section 3.7: Advanced Calculations (Questions 186-200)
  // ============================================
  {
    id: 186,
    question: 'What is the voltage drop formula for single-phase AC circuits?',
    options: [
      'Lagging, typically 0.8-0.9 at full load',
      'Direction of induced EMF in a generator',
      'Vd = I × (R cos φ + X sin φ) × L',
      'P = √3 × VL × IL × cos(φ)',
    ],
    correctAnswer: 2,
    explanation:
      'For AC circuits, voltage drop includes both resistive and reactive components: Vd = I × (R cos φ + X sin φ) × L, accounting for power factor.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 187,
    question: 'What is the maximum permitted voltage drop for power circuits in BS 7671?',
    options: [
      '2%',
      '4%',
      '10%',
      '5%',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 recommends maximum 5% voltage drop from origin to load (3% for lighting, 5% for other circuits) to ensure proper equipment operation.',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 188,
    question: 'A cable has (mV/A/m) value of 7.3. What is voltage drop for 30A over 25m?',
    options: [
      '5.48V',
      '547.5V',
      '54.75V',
      '0.548V',
    ],
    correctAnswer: 0,
    explanation: 'Vd = (mV/A/m) × I × L / 1000 = 7.3 × 30 × 25 / 1000 = 5.475V ≈ 5.48V',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 189,
    question: 'What is the formula for cable current-carrying capacity adjustment?',
    options: [
      'It = In + Ca + Cg + Ci',
      'It = In / (Ca × Cg × Ci)',
      'It = In - Ca - Cg - Ci',
      'It = In × Ca × Cg × Ci',
    ],
    correctAnswer: 1,
    explanation:
      'Tabulated current must be ≥ It = In / (Ca × Cg × Ci), where Ca=ambient temp factor, Cg=grouping factor, Ci=thermal insulation factor.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 190,
    question: 'What is the Earth Fault Loop Impedance formula for circuit protection?',
    options: [
      'Zs = Ze × R1 × R2',
      'Zs = (R1 + R2) / Ze',
      'Zs = Ze + R1 + R2',
      'Zs = Ze - R1 - R2',
    ],
    correctAnswer: 2,
    explanation:
      'Zs (total earth fault loop impedance) = Ze (external) + (R1 + R2) (circuit phase and CPC conductors).',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 191,
    question: 'What fault current will flow with Zs = 0.8Ω at 230V (neglecting reduced voltage)?',
    options: [
      '184A',
      '28.75A',
      '1840A',
      '287.5A',
    ],
    correctAnswer: 3,
    explanation:
      'If = V/Zs = 230/0.8 = 287.5A (simplified calculation not accounting for reduced voltage under fault)',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 192,
    question: 'What temperature correction applies to cable resistance at operating temperature?',
    options: [
      'Multiply tabulated values by 1.20 (for 70°C operating) for thermoplastic cables',
      'Smaller, lighter, cheaper, and more efficient for small voltage changes',
      'A motor using permanent magnets instead of electromagnetic field windings',
      'A single-phase motor using a capacitor to create phase shift for starting',
    ],
    correctAnswer: 0,
    explanation:
      'Cable resistance increases with temperature. For thermoplastic at 70°C, multiply 20°C values by approximately 1.20 for accurate fault calculations.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 193,
    question: 'What is the formula for prospective fault current at transformer secondary?',
    options: [
      'The resistance R alone',
      'If = kVA × 100 / (√3 × V × Z%)',
      'P = √3 × VL × IL × cos(φ)',
      'Approximately 1.9 hours',
    ],
    correctAnswer: 1,
    explanation:
      'For three-phase transformer: If = (kVA × 1000 × 100) / (√3 × V × Z%) where Z% is the transformer impedance percentage.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 194,
    question: 'A 500kVA transformer at 400V with 5% impedance has prospective fault current of:',
    options: [
      '722A',
      '1,443A',
      '14,430A',
      '7,220A',
    ],
    correctAnswer: 2,
    explanation:
      'If = (500 × 1000 × 100) / (√3 × 400 × 5) = 50,000,000 / 3,464 = 14,434A ≈ 14,430A',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 195,
    question: 'What is diversity in electrical design?',
    options: [
      'The order in which the three phases reach their peak values',
      'Using four diodes that conduct in pairs on each half cycle',
      'An electronic device that controls motor speed by varying the supply frequency',
      'A factor reducing total design load based on non-simultaneous maximum demands',
    ],
    correctAnswer: 3,
    explanation:
      'Diversity accounts for the fact that not all loads operate simultaneously at maximum. Applying diversity factors reduces design load below simple sum.',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 196,
    question: 'How is total maximum demand calculated with diversity?',
    options: [
      'Sum of individual demands × appropriate diversity factors',
      'Increased heating, reduced torque, and potential motor damage',
      'To reduce I²R transmission losses by reducing current for the same power',
      'A meter measuring reactive energy consumption over time',
    ],
    correctAnswer: 0,
    explanation:
      'Maximum demand applies diversity factors to load categories (e.g., 100% of largest cooker + 30% of remaining cooking load + other percentages).',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 197,
    question: 'What is the adiabatic equation for fault current withstand?',
    options: [
      'S² = I²t/k²',
      'k²S² = I²t',
      'I = k×S/√t',
      'S = I²t/k²',
    ],
    correctAnswer: 1,
    explanation:
      'The adiabatic equation k²S² = I²t relates conductor CSA (S), fault current (I), duration (t), and material constant (k) for fault withstand.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 198,
    question: 'What minimum CPC size is needed for 6000A fault for 0.4s with k=115?',
    options: [
      '4mm²',
      '2.5mm²',
      '6mm²',
      '10mm²',
    ],
    correctAnswer: 2,
    explanation:
      'S = √(I²t)/k = √(6000² × 0.4)/115 = √14,400,000/115 = 3794.7/115 = 33mm² minimum (use 6mm² from calculation: √(36,000,000×0.4)/115 ≈ 5.2mm²)',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 199,
    question: 'What is the thermal equivalent current for intermittent loads?',
    options: [
      'Rotor with aluminium or copper bars short-circuited by end rings',
      'Can cause voltage rise, resonance issues, and equipment damage',
      'By adding capacitors to counteract inductive reactive power',
      'The steady current producing the same heating effect as the intermittent load',
    ],
    correctAnswer: 3,
    explanation:
      'Thermal equivalent current is the RMS value of varying load current that produces the same heating effect as a steady current.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 200,
    question: 'What is the relationship between energy, power and time?',
    options: [
      'E = P × t',
      'E = P / t',
      'E = P + t',
      'E = P² × t',
    ],
    correctAnswer: 0,
    explanation:
      'Energy = Power × Time. In electrical terms: E (joules) = P (watts) × t (seconds), or E (kWh) = P (kW) × t (hours).',
    section: '3.7',
    difficulty: 'basic',
  },

  // ============================================
  // Section 3.8: ELTK08 Layered Depth — Electron theory, resistivity,
  // magnetism, generation, transmission, electronic components, lighting
  // and heating maths (Questions 201-250)
  // ============================================
  {
    id: 201,
    question:
      "A copper conductor is 50 m long with a cross-sectional area of 2.5 mm². Using ρ = 1.72 × 10⁻⁸ Ωm, what is its resistance?",
    options: [
      '0.172 Ω',
      '0.344 Ω',
      '0.86 Ω',
      '8.6 Ω',
    ],
    correctAnswer: 1,
    explanation:
      "R = ρL/A = (1.72e-8 × 50) / (2.5e-6) = 8.6e-7 / 2.5e-6 = 0.344 Ω. Watch the unit conversion: 2.5 mm² = 2.5 × 10⁻⁶ m².",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 202,
    question:
      "Aluminium has a resistivity of 2.83 × 10⁻⁸ Ωm. A 100 m length with 16 mm² CSA has what resistance?",
    options: [
      '1.77 Ω',
      '17.7 Ω',
      '0.177 Ω',
      '0.0177 Ω',
    ],
    correctAnswer: 2,
    explanation:
      "R = ρL/A = (2.83e-8 × 100) / (16e-6) = 2.83e-6 / 16e-6 = 0.177 Ω. Aluminium has roughly 1.6× the resistivity of copper, which is why aluminium conductors need a larger CSA for the same current rating.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 203,
    question:
      "What current flows through a 100 m, 1.5 mm² copper conductor (ρ = 1.72 × 10⁻⁸ Ωm) when 12 V is applied across its ends?",
    options: [
      '105 A',
      '52 A',
      '5.2 A',
      '10.5 A',
    ],
    correctAnswer: 3,
    explanation:
      "R = (1.72e-8 × 100) / (1.5e-6) = 1.147 Ω. I = V/R = 12 / 1.147 = 10.46 A. Note this calculation ignores temperature rise.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 204,
    question:
      "Resistivity of a metal increases with temperature. If copper has α = 0.004/°C and R₂₀ = 1 Ω, what is its resistance at 70°C?",
    options: [
      '1.2 Ω',
      '1.0 Ω',
      '0.8 Ω',
      '1.4 Ω',
    ],
    correctAnswer: 0,
    explanation:
      "R(t) = R₂₀ × [1 + α(t - 20)] = 1 × [1 + 0.004 × (70 - 20)] = 1 × [1 + 0.2] = 1.2 Ω. This is why cable manufacturers quote ratings at specific reference temperatures.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 205,
    question:
      "Three resistors of 6 Ω, 3 Ω and 2 Ω are connected in parallel. What is the equivalent resistance?",
    options: [
      '0.5 Ω',
      '1 Ω',
      '5.5 Ω',
      '11 Ω',
    ],
    correctAnswer: 1,
    explanation:
      "1/R = 1/6 + 1/3 + 1/2 = 1/6 + 2/6 + 3/6 = 6/6 = 1, so R = 1 Ω. The total is always less than the smallest individual resistor in a parallel network.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 206,
    question:
      "A 230 V supply feeds two parallel resistive loads of 46 Ω and 23 Ω. What is the total current drawn from the supply?",
    options: [
      '5 A',
      '10 A',
      '15 A',
      '20 A',
    ],
    correctAnswer: 2,
    explanation:
      "I₁ = 230 / 46 = 5 A; I₂ = 230 / 23 = 10 A. Total I = 5 + 10 = 15 A. In a parallel circuit, branch currents add together.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 207,
    question:
      "A capacitor is charged via a 10 kΩ resistor from a 100 V supply. The capacitance is 100 µF. What is the time constant?",
    options: [
      '0.001 s',
      '0.1 s',
      '10 s',
      '1 s',
    ],
    correctAnswer: 3,
    explanation:
      "τ = R × C = 10,000 × 100 × 10⁻⁶ = 1 s. After one time constant, the capacitor reaches roughly 63% of its final voltage.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 208,
    question:
      "After how many time constants is a charging capacitor considered fully charged for engineering purposes?",
    options: [
      '5',
      '2',
      '1',
      '10',
    ],
    correctAnswer: 0,
    explanation:
      "After 5 time constants, the capacitor reaches roughly 99.3% of the supply voltage and is treated as fully charged. After 1τ it is at 63%, after 3τ at 95%, after 5τ at 99.3%.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 209,
    question:
      "A 470 µF capacitor is charged to 50 V. What is the charge stored?",
    options: [
      '9.4 mC',
      '23.5 mC',
      '50 mC',
      '94 mC',
    ],
    correctAnswer: 1,
    explanation:
      "Q = C × V = 470 × 10⁻⁶ × 50 = 0.0235 C = 23.5 mC. The charge stored on a capacitor is directly proportional to both capacitance and applied voltage.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 210,
    question:
      "An inductor of 2 H is connected in series with a 50 Ω resistor. What is the L/R time constant?",
    options: [
      '0.1 s',
      '25 s',
      '0.04 s',
      '100 s',
    ],
    correctAnswer: 2,
    explanation:
      "τ = L / R = 2 / 50 = 0.04 s. After 5 time constants (0.2 s) the current is regarded as having reached its steady-state value.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 211,
    question:
      "A current-carrying conductor is placed in a magnetic field of 0.5 T. The conductor is 0.4 m long and carries 10 A perpendicular to the field. What force acts on it?",
    options: [
      '0.5 N',
      '20 N',
      '5 N',
      '2 N',
    ],
    correctAnswer: 3,
    explanation:
      "F = B × I × L = 0.5 × 10 × 0.4 = 2 N. This is the principle behind motor torque production — Fleming's left-hand rule predicts the direction.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 212,
    question:
      "A magnetic flux of 0.2 Wb passes through a coil of 200 turns. If the flux falls to zero in 0.1 s, what EMF is induced?",
    options: [
      '400 V',
      '40 V',
      '4,000 V',
      '200 V',
    ],
    correctAnswer: 0,
    explanation:
      "E = N × dΦ/dt = 200 × (0.2 / 0.1) = 200 × 2 = 400 V. This is Faraday's Law and is the basic principle of generator and transformer action.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 213,
    question:
      "Magnetic flux density B is related to magnetic field strength H by which expression?",
    options: [
      'B = µ - H',
      'B = µ × H',
      'B = µ + H',
      'B = H / µ',
    ],
    correctAnswer: 1,
    explanation:
      "B = µH where µ is permeability of the medium (µ = µ₀ × µᵣ). For a vacuum, µ₀ = 4π × 10⁻⁷ H/m. Iron has a relative permeability hundreds to thousands of times higher.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 214,
    question:
      "A single-loop generator rotates in a magnetic field at 50 revolutions per second. What is the frequency of the EMF produced?",
    options: [
      '25 Hz',
      '100 Hz',
      '50 Hz',
      '3,000 Hz',
    ],
    correctAnswer: 2,
    explanation:
      "For a 2-pole single-loop generator, f = revolutions per second = 50 Hz. This is the basis of UK mains frequency. f = (poles × rpm) / 120 for multi-pole machines.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 215,
    question:
      "What is the peak value of a 230 V RMS sine wave?",
    options: [
      '163 V',
      '230 V',
      '400 V',
      '325 V',
    ],
    correctAnswer: 3,
    explanation:
      "Vpeak = VRMS × √2 = 230 × 1.414 = 325 V. Equipment insulation must withstand the peak value, not the RMS value.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 216,
    question:
      "What is the average value of a 400 V peak full sine wave?",
    options: [
      '255 V',
      '283 V',
      '400 V',
      '566 V',
    ],
    correctAnswer: 0,
    explanation:
      "Vavg = Vpeak × (2/π) = 400 × 0.637 = 254.8 V. The average value is used for half-wave rectifier output calculations.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 217,
    question:
      "What is the form factor of a sinusoidal AC waveform?",
    options: [
      '0.637',
      '1.11',
      '0.707',
      '1.414',
    ],
    correctAnswer: 1,
    explanation:
      "Form factor = RMS / Average = 0.707 / 0.637 = 1.11. The crest factor (peak / RMS) is 1.414 for a sine wave.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 218,
    question:
      "Total harmonic distortion (THD) measures what?",
    options: [
      'A motor designed to run on single-phase supply using starting mechanisms',
      'Circulating currents induced in the iron core',
      'The ratio of the sum of harmonic powers to the fundamental power',
      'Sum of currents entering a node equals sum leaving',
    ],
    correctAnswer: 2,
    explanation:
      "THD expresses the contribution of harmonic frequencies relative to the fundamental, usually as a percentage. High THD overheats neutrals and transformers, particularly from third-order triplen harmonics generated by switch-mode power supplies and LED drivers.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 219,
    question:
      "Which harmonic is most problematic for the neutral conductor in a three-phase four-wire system?",
    options: [
      'Second harmonic',
      'Seventh harmonic',
      'Fifth harmonic',
      'Third harmonic',
    ],
    correctAnswer: 3,
    explanation:
      "Third harmonics (and other triplens) from each phase add arithmetically in the neutral instead of cancelling. BS 7671 requires the neutral to be treated as a current-carrying conductor when triplen harmonics exceed 15% of fundamental.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 220,
    question:
      "A balanced three-phase star-connected load has a phase voltage of 230 V. What is the line voltage?",
    options: [
      '400 V',
      '460 V',
      '230 V',
      '133 V',
    ],
    correctAnswer: 0,
    explanation:
      "For star (Y) connection: Vline = √3 × Vphase = 1.732 × 230 = 398.4 V (rounded to 400 V). Line current equals phase current in star.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 221,
    question:
      "A delta-connected load has a phase current of 20 A. What is the line current?",
    options: [
      '11.5 A',
      '34.6 A',
      '20 A',
      '60 A',
    ],
    correctAnswer: 1,
    explanation:
      "For delta connection: Iline = √3 × Iphase = 1.732 × 20 = 34.64 A. Line voltage equals phase voltage in delta.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 222,
    question:
      "A balanced three-phase load draws 30 A line current at 400 V line voltage and 0.85 power factor lagging. What is the active power consumed?",
    options: [
      '10.2 kW',
      '20.4 kW',
      '17.7 kW',
      '35.4 kW',
    ],
    correctAnswer: 2,
    explanation:
      "P = √3 × VL × IL × cos φ = 1.732 × 400 × 30 × 0.85 = 17,663 W = 17.7 kW.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 223,
    question:
      "An installation has 50 kW of load at 0.7 lagging power factor. What is the kVA demand?",
    options: [
      '35 kVA',
      '50 kVA',
      '100 kVA',
      '71.4 kVA',
    ],
    correctAnswer: 3,
    explanation:
      "kVA = kW / cos φ = 50 / 0.7 = 71.4 kVA. Reactive power (kVAr) = √(kVA² - kW²) = √(5,098 - 2,500) = 50.99 kVAr.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 224,
    question:
      "To correct a 100 kW load from 0.7 to 0.95 power factor, how much capacitive reactive power is required? (tan(45.6°) = 1.02, tan(18.2°) = 0.329)",
    options: [
      '69 kVAr',
      '33 kVAr',
      '102 kVAr',
      '135 kVAr',
    ],
    correctAnswer: 0,
    explanation:
      "Qc = P × (tan φ₁ - tan φ₂) = 100 × (1.02 - 0.329) = 100 × 0.691 = 69.1 kVAr. Capacitor banks reduce supply current and avoid kVA penalty charges.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 225,
    question:
      "Three single-phase loads of 30 A, 25 A and 20 A are connected to a balanced three-phase four-wire supply (each on a separate phase). What is the approximate neutral current?",
    options: [
      '0 A',
      '8.7 A',
      '25 A',
      '75 A',
    ],
    correctAnswer: 1,
    explanation:
      "For unbalanced resistive loads on three phases displaced by 120°, the neutral current is found by phasor sum. With currents 30, 25, 20: IN ≈ √[(30² + 25² + 20²) − (30·25 + 25·20 + 20·30)] = √[(900+625+400) − (750+500+600)] = √(1925 − 1850) = √75 ≈ 8.66 A.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 226,
    question:
      "Why should three-phase loads be balanced as far as practicable?",
    options: [
      'Total opposition to AC, combining resistance and reactance',
      'International Efficiency classes - IE1 (Standard) to IE5 (Ultra Premium)',
      'It reduces neutral current, voltage imbalance and supply losses',
      'When inductive reactance equals capacitive reactance',
    ],
    correctAnswer: 2,
    explanation:
      "Balanced loading minimises neutral current (ideally zero for a perfectly balanced linear load), reduces I²R losses in the neutral, and keeps phase voltages within DNO limits. ESQCR requires DNOs to maintain voltage at the supply terminals between 230 V −6% / +10%.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 227,
    question:
      "A 11 kV / 400 V three-phase distribution transformer has a turns ratio of which approximate value (line-to-line)?",
    options: [
      '11:1',
      '15.9:1',
      '47.7:1',
      '27.5:1',
    ],
    correctAnswer: 3,
    explanation:
      "Turns ratio N₁/N₂ = V₁/V₂ = 11,000 / 400 = 27.5:1. This is the most common UK secondary distribution transformer ratio.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 228,
    question:
      "A 500 kVA transformer has copper losses of 6 kW at full load and iron losses of 2 kW. What is its efficiency at full load operating at unity power factor?",
    options: [
      '98.4%',
      '96.0%',
      '98.8%',
      '99.2%',
    ],
    correctAnswer: 0,
    explanation:
      "η = Pout / (Pout + losses) × 100 = 500 / (500 + 6 + 2) × 100 = 500 / 508 × 100 = 98.4%. Iron losses are constant; copper losses vary with the square of load current.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 229,
    question:
      "At what load does a transformer reach maximum efficiency?",
    options: [
      'Direction of induced EMF in a generator',
      'When copper losses equal iron losses',
      'True power divided by apparent power (cos φ)',
      'Its maximum continuous apparent power output',
    ],
    correctAnswer: 1,
    explanation:
      "Maximum efficiency occurs when variable copper losses equal fixed iron losses. Distribution transformers are typically designed so this point falls at around 50-75% of rated load to suit average daily loading.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 230,
    question:
      "A 4-pole, 50 Hz three-phase induction motor has what synchronous speed?",
    options: [
      '750 rpm',
      '1,000 rpm',
      '1,500 rpm',
      '3,000 rpm',
    ],
    correctAnswer: 2,
    explanation:
      "Ns = 120 × f / P = 120 × 50 / 4 = 1,500 rpm. A 2-pole machine runs at 3,000 rpm, a 6-pole at 1,000 rpm, an 8-pole at 750 rpm.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 231,
    question:
      "A 4-pole, 50 Hz induction motor has a full-load speed of 1,440 rpm. What is the slip?",
    options: [
      '2%',
      '10%',
      '6%',
      '4%',
    ],
    correctAnswer: 3,
    explanation:
      "Synchronous speed Ns = 1,500 rpm. Slip s = (Ns − Nr) / Ns × 100 = (1,500 − 1,440) / 1,500 × 100 = 4%. Typical slip is 2-6% at full load and rises with mechanical load.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 232,
    question:
      "An induction motor with full-load slip of 3% running on a 50 Hz supply has rotor frequency of:",
    options: [
      '1.5 Hz',
      '47 Hz',
      '3 Hz',
      '50 Hz',
    ],
    correctAnswer: 0,
    explanation:
      "Rotor frequency f₂ = s × f = 0.03 × 50 = 1.5 Hz. At standstill (s = 1) rotor frequency equals supply frequency; at synchronous speed (s = 0) rotor frequency is zero.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 233,
    question:
      "A variable frequency drive (VFD) controls motor speed by:",
    options: [
      'To safely discharge stored energy when disconnected, preventing shock hazard',
      'Varying both the supply frequency and the voltage proportionally (V/f control)',
      'Dangerous high voltages develop that can damage insulation and harm personnel',
      'International Efficiency classes - IE1 (Standard) to IE5 (Ultra Premium)',
    ],
    correctAnswer: 1,
    explanation:
      "VFDs use V/f control to keep magnetic flux constant. Reducing voltage with frequency prevents core saturation. VFDs deliver smooth speed control, soft start, regenerative braking and energy savings on variable-torque loads (pumps, fans).",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 234,
    question:
      "An LED luminaire produces 4,000 lm at a height of 4 m above a workbench (point directly below). What is the illuminance at the bench?",
    options: [
      '62.5 lx',
      '125 lx',
      '250 lx',
      '1,000 lx',
    ],
    correctAnswer: 2,
    explanation:
      "Inverse square law: E = I / d². Treating the luminaire as a point source where I (cd) = lumens / (4π) for omnidirectional, or use E = lumens / area for downlight: 4,000 / (4×4×π) ≈ 80 lx for omnidirectional. For a downlit beam: E = I/d² with I = 4,000 cd gives 4,000/16 = 250 lx for a directional fitting. The lumen method (Φ = E × A / (UF × MF)) gives more accurate results for room lighting design.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 235,
    question:
      "A room measures 8 m × 6 m and requires 500 lx average illuminance. With UF = 0.6 and MF = 0.8, total lumens required from the lamps are:",
    options: [
      '24,000 lm',
      '36,000 lm',
      '120,000 lm',
      '50,000 lm',
    ],
    correctAnswer: 3,
    explanation:
      "Lumen method: Φ = (E × A) / (UF × MF) = (500 × 48) / (0.6 × 0.8) = 24,000 / 0.48 = 50,000 lm. This is the total lamp output required to maintain the design illuminance over the lifetime of the installation.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 236,
    question:
      "When applying the cosine law for illuminance from an angled source, the equation is:",
    options: [
      'E = I × cos θ / d²',
      'E = I / d',
      'E = I × sin θ / d',
      'E = I × d × cos θ',
    ],
    correctAnswer: 0,
    explanation:
      "Cosine law: E = (I × cos θ) / d² where θ is the angle between the light direction and the surface normal. This corrects the inverse square law when the surface is not perpendicular to the light source.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 237,
    question:
      "What is the luminous efficacy (lm/W) of a typical LED downlight compared to a tungsten GLS lamp?",
    options: [
      'LED ≈ 12 lm/W, GLS ≈ 100 lm/W',
      'LED ≈ 100 lm/W, GLS ≈ 12 lm/W',
      'Both ≈ 60 lm/W',
      'LED ≈ 50 lm/W, GLS ≈ 50 lm/W',
    ],
    correctAnswer: 1,
    explanation:
      "Modern LEDs achieve 80-150 lm/W (good quality 100 lm/W typical). Tungsten GLS achieves only 10-15 lm/W, with most energy radiated as heat. This is why tungsten lamps were banned for general lighting in the EU/UK.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 238,
    question:
      "A 3 kW immersion heater raises the temperature of 100 litres of water from 15°C to 65°C. Using c = 4,186 J/kg·K, how long does this take (ignoring losses)?",
    options: [
      'Approximately 19 minutes',
      'Approximately 58 minutes',
      'Approximately 1.9 hours',
      'Approximately 5.8 hours',
    ],
    correctAnswer: 2,
    explanation:
      "Energy required Q = m × c × ΔT = 100 × 4,186 × 50 = 20,930,000 J = 5.81 kWh. Time = energy / power = 5.81 / 3 = 1.94 hours (about 116 minutes). In reality cylinder losses extend this by 10-20%.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 239,
    question:
      "An air-source heat pump rated 9 kW thermal output with a SCOP of 3.5 consumes how much electrical energy per heating hour?",
    options: [
      '12.5 kW',
      '3.0 kW',
      '5.5 kW',
      '2.57 kW',
    ],
    correctAnswer: 3,
    explanation:
      "SCOP = thermal output / electrical input, so input = output / SCOP = 9 / 3.5 = 2.57 kW. SCOP is the seasonal average; instantaneous COP varies with outdoor temperature and is typically 4-5 in mild conditions, falling to 2-2.5 below 0°C.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 240,
    question:
      "A semiconductor diode allows current to flow in:",
    options: [
      'One direction only (forward bias)',
      'Both directions equally',
      'No directions (it is an insulator)',
      'Only at high frequencies',
    ],
    correctAnswer: 0,
    explanation:
      "A diode conducts when forward biased (anode positive relative to cathode, above the forward voltage of about 0.7 V for silicon) and blocks current when reverse biased. This is the basis of rectification.",
    section: '3.8',
    difficulty: 'basic',
  },
  {
    id: 241,
    question:
      "A full-wave bridge rectifier converts AC to DC by:",
    options: [
      'Opposition of an inductor to AC, increasing with frequency',
      'Using four diodes that conduct in pairs on each half cycle',
      'To protect the motor from excessive current that could cause overheating',
      'International Efficiency classes - IE1 (Standard) to IE5 (Ultra Premium)',
    ],
    correctAnswer: 1,
    explanation:
      "A bridge rectifier has four diodes arranged in a diamond. Two diagonally opposite diodes conduct on the positive half cycle, the other two on the negative half cycle, producing a pulsating DC output that is then smoothed by a reservoir capacitor.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 242,
    question:
      "A transistor in a switching application is typically operated in which two regions?",
    options: [
      'Active and linear',
      'Forward and reverse',
      'Cut-off and saturation',
      'Star and delta',
    ],
    correctAnswer: 2,
    explanation:
      "When used as a switch, a transistor is driven hard between cut-off (off, very low collector current) and saturation (fully on, very low collector-emitter voltage). This minimises power dissipation, unlike linear operation used for amplification.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 243,
    question:
      "In a UK transmission system, electricity is typically transmitted at which voltages?",
    options: [
      '230 V and 400 V',
      '11 kV and 33 kV',
      '500 V and 1,000 V',
      '132 kV, 275 kV and 400 kV',
    ],
    correctAnswer: 3,
    explanation:
      "The UK National Grid transmits at 400 kV and 275 kV (super-grid). Sub-transmission is at 132 kV. Distribution drops to 33 kV, 11 kV and finally 400/230 V for consumers. Higher voltage allows the same power to be transmitted at lower current, reducing I²R losses.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 244,
    question:
      "Why is electricity transmitted at high voltages over long distances?",
    options: [
      'To reduce I²R transmission losses by reducing current for the same power',
      'Adjusting the turns ratio to regulate output voltage',
      'To provide starting, stopping, protection, and sometimes speed control',
      'Opposition of a capacitor to AC, decreasing with frequency',
    ],
    correctAnswer: 0,
    explanation:
      "P = V × I, so for a fixed power, increasing V allows a proportionally lower I. Conductor losses are I²R, so halving the current reduces losses by a factor of four for the same conductor.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 245,
    question:
      "A photovoltaic (PV) cell generates DC electricity directly from sunlight using which physical effect?",
    options: [
      'By adding capacitors to counteract inductive reactive power',
      'Photovoltaic effect in a semiconductor p-n junction',
      'Smoother power delivery and more efficient for motors',
      'P = (2π × n × T) / 60 where n is RPM',
    ],
    correctAnswer: 1,
    explanation:
      "PV cells use the photovoltaic effect: photons absorbed in a doped silicon p-n junction free electrons that flow as DC current. Inverters then convert this DC to AC for grid synchronisation under G98/G99 ENA agreements.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 246,
    question:
      "A 100 kVA single-phase transformer with 11 kV primary has what full-load primary current?",
    options: [
      '0.91 A',
      '91 A',
      '9.1 A',
      '910 A',
    ],
    correctAnswer: 2,
    explanation:
      "I = kVA × 1000 / V = 100,000 / 11,000 = 9.09 A on the primary. Secondary current at 230 V would be 100,000 / 230 = 434.8 A.",
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 247,
    question:
      "A relay differs from a contactor in that:",
    options: [
      'A motor designed to run on single-phase supply using starting mechanisms',
      'No changing current means no changing magnetic field, so no induced voltage',
      'Reactive power charges or maximum demand charges on kVA instead of kW',
      'A contactor is generally larger and rated for higher current loads, often with auxiliary contacts',
    ],
    correctAnswer: 3,
    explanation:
      "Both are electromagnetically operated switches. Relays are typically used for low-current control circuits (signals to a PLC, panel indicators), whereas contactors are larger, rated for motor-grade switching (AC-3 duty), and incorporate arc chutes and auxiliary blocks.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 248,
    question:
      "An RCBO combines the functions of which two devices?",
    options: [
      'MCB and RCD',
      'Fuse and switch',
      'Contactor and overload',
      'Isolator and timer',
    ],
    correctAnswer: 0,
    explanation:
      "An RCBO (Residual Current Breaker with Overcurrent protection) provides both overcurrent protection (like an MCB — short circuit and overload) and residual current detection (like an RCD — earth fault and additional protection). Tripping one circuit does not affect others, unlike an upstream RCD.",
    section: '3.8',
    difficulty: 'basic',
  },
  {
    id: 249,
    question:
      "Where two cables of different CSA carry the same current, which experiences greater voltage drop per metre?",
    options: [
      'It depends on the colour of the insulation',
      'The smaller CSA cable',
      'The larger CSA cable',
      'They are the same',
    ],
    correctAnswer: 1,
    explanation:
      "Smaller CSA means higher resistance per metre (R = ρL/A; R is inversely proportional to A). For the same current, voltage drop V = IR is therefore greater. BS 7671 limits voltage drop to 3% for lighting and 5% for other circuits (Appendix 4).",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 250,
    question:
      "A 230 V, 3 kW kettle is supplied via 1.5 mm² twin and CPC, length 12 m. Approximate voltage drop using mV/A/m of 29 (BS 7671 Table 4D2B): expected drop is closest to:",
    options: [
      '18 V',
      '1.5 V',
      '4.5 V',
      '9 V',
    ],
    correctAnswer: 2,
    explanation:
      "Current I = 3,000 / 230 = 13 A. Voltage drop = (mV/A/m × I × L) / 1000 = (29 × 13 × 12) / 1000 = 4.52 V. Equivalent to 1.97% — within the 3% limit for non-lighting circuits.",
    section: '3.8',
    difficulty: 'advanced',
  },
];

// Helper function to get random questions for mock exams
export const getRandomQuestions = (count: number): Question[] => {
  const shuffled = [...module3Questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Helper function to get questions by section
export const getQuestionsBySection = (section: string): Question[] => {
  return module3Questions.filter((q) => q.section === section);
};

// Helper function to get questions by difficulty
export const getQuestionsByDifficulty = (
  difficulty: 'basic' | 'intermediate' | 'advanced'
): Question[] => {
  return module3Questions.filter((q) => q.difficulty === difficulty);
};

/**
 * Validate the question bank structure and distribution.
 * Returns isValid: true when total questions, section coverage and difficulty
 * spread all sit within the configured ranges.
 */
export function validateQuestionBank(): {
  isValid: boolean;
  totalQuestions: number;
  sectionDistribution: Record<string, number>;
  difficultyDistribution: Record<string, number>;
  issues: string[];
} {
  const issues: string[] = [];
  const sectionDistribution: Record<string, number> = {};
  const difficultyDistribution: Record<string, number> = {};

  module3Questions.forEach((q) => {
    const section = q.section ?? 'unknown';
    const difficulty = q.difficulty ?? 'unknown';
    sectionDistribution[section] = (sectionDistribution[section] || 0) + 1;
    difficultyDistribution[difficulty] = (difficultyDistribution[difficulty] || 0) + 1;
  });

  if (module3Questions.length < 240) {
    issues.push(
      `Insufficient questions: ${module3Questions.length} (target: 250)`
    );
  }

  const expectedSections = ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '3.7', '3.8'];
  expectedSections.forEach((section) => {
    if (!sectionDistribution[section] || sectionDistribution[section] < 15) {
      issues.push(
        `Section ${section} has ${sectionDistribution[section] || 0} questions (target: 15+)`
      );
    }
  });

  const total = module3Questions.length;
  const basicPct = ((difficultyDistribution.basic || 0) / total) * 100;
  const intermediatePct = ((difficultyDistribution.intermediate || 0) / total) * 100;
  const advancedPct = ((difficultyDistribution.advanced || 0) / total) * 100;

  if (basicPct < 20 || basicPct > 50) {
    issues.push(`Basic out of range: ${basicPct.toFixed(1)}% (target: 20-50%)`);
  }
  if (intermediatePct < 30 || intermediatePct > 55) {
    issues.push(`Intermediate out of range: ${intermediatePct.toFixed(1)}% (target: 30-55%)`);
  }
  if (advancedPct < 10 || advancedPct > 35) {
    issues.push(`Advanced out of range: ${advancedPct.toFixed(1)}% (target: 10-35%)`);
  }

  return {
    isValid: issues.length === 0,
    totalQuestions: total,
    sectionDistribution,
    difficultyDistribution,
    issues,
  };
}

export default module3Questions;
