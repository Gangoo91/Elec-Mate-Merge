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

import {
  drawWeighted,
  LEVEL3_WEIGHTS,
  type DifficultyWeights,
} from '@/utils/apprenticeQuestionDraw';

export const module3Questions: Question[] = [
  // ============================================
  // Section 3.1: Ohm's Law & Power (Questions 1-35)
  // ============================================
  {
    id: 1,
    question: "What is the formula for Ohm's Law?",
    // Key corrected 2026-08-27: was index 2 (3,174 W). 400/sqrt(3) = 230.9 V,
    // 230.9^2/50 = 1,066.7 W per phase, x3 = 3,200 W exactly. 3,174 W is what
    // you get by rounding the phase voltage to 230 V before squaring, and the
    // explanation had the two the wrong way round.
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
      '1,150W',
      '2,300W',
      '2,400W',
      '23,000W',
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
    question: 'What is the total resistance of three 10 Ω resistors connected in series?',
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
    question: 'What is the total resistance of three 30 Ω resistors connected in parallel?',
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
    question: 'Which statement correctly defines conductance and gives its unit?',
    options: [
      'The reciprocal of resistance, measured in siemens (S)',
      'Energy converted per second, measured in watts (W)',
      'The opposition a conductor offers, measured in ohms (Ω)',
      'The rate of charge flow, measured in amperes (A)',
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
      'Resistance drops to zero at very high temperatures',
      'Resistance increases as temperature increases',
      'Resistance decreases as the temperature increases',
      'Temperature has no effect on resistance',
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
      'The total resistance measured from end to end of a complete series circuit',
      'The resistance of a particular conductor per metre of its total length',
      'A material property indicating how strongly it opposes current flow',
      'The opposition that a conductor offers only to an alternating current',
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
    difficulty: 'intermediate',
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
    question: 'What is true of the current at every point in a series circuit?',
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
    question: 'What is true of the voltage across each branch of a parallel circuit?',
    options: [
      'Divided equally between the branches',
      'Highest in the branch with most resistance',
      'Proportional to each branch resistance',
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
      'The voltages around a closed loop sum to zero',
      'Current equals the voltage divided by the resistance',
      'Power equals the current squared times resistance',
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
      'Sum of the currents at a node is always zero',
      'Sum of voltages around a closed loop equals zero',
      'Voltage always equals the current times the resistance',
      'Power equals the voltage multiplied by the current',
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
      'A 5 Ω and a 20 Ω resistor are connected in series across a 100 V supply. What voltage appears across the 5 Ω resistor?',
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
      'Maximum power is transferred when the load resistance is made as low as possible',
      'The power transferred is independent of both the load and source resistance',
      'Maximum power is transferred when the load resistance is made infinitely large',
      'Maximum power is transferred when load resistance equals source resistance',
    ],
    correctAnswer: 3,
    explanation:
      'Maximum power is transferred from source to load when the load resistance equals the internal source resistance.',
    section: '3.1',
    difficulty: 'basic',
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
    question: 'A device delivers 900 W of output while taking 1000 W from the supply. What is its efficiency as a percentage?',
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
      '1.85kW',
      '2kW',
      '2.35kW',
    ],
    correctAnswer: 3,
    explanation: 'Input Power = Output Power / Efficiency = 2000W / 0.85 = 2,353W ≈ 2.35kW. A common error is multiplying (2000 × 0.85 = 1.7kW) instead of dividing.',
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
      'f = T/2',
      'f = 1/T',
      'f = 1/T²',
      'f = 2/T',
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
    question: 'What is the peak value of a 230 V rms sinusoidal supply?',
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
      'The maximum instantaneous value the waveform reaches',
      'The average value of the waveform over one cycle',
      'The total swing from the positive peak to the negative peak',
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
      'Vrms = Vp × √2 (or Vp / 0.707)',
      'Vrms = Vp / √2 (or Vp × 0.707)',
      'Vrms = Vp × 2 (or Vp / 0.5)',
      'Vrms = Vp × π/2 (or Vp × 1.571)',
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
      'The average voltage value',
      'Twice the peak voltage',
      'One half of the peak voltage',
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
      'Opposition of an inductor to steady DC, increasing with current',
      'Opposition of an inductor to AC, decreasing as frequency rises',
      'The DC resistance of the inductor winding, measured with the supply off',
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
      'Opposition of a capacitor to AC, increasing as frequency rises',
      'Opposition of a capacitor to DC, independent of frequency',
      'Opposition of a capacitor to AC, decreasing with frequency',
      'The leakage resistance of the dielectric, which rises as the capacitor ages',
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
      'XC = (2πf)/C',
      'XC = C/(2πf)',
      'XC = (f × C)/2π',
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
    question: 'By what angle does the current lag the voltage in a purely inductive circuit?',
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
    question: 'By what angle does the current lead the voltage in a purely capacitive circuit?',
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
      'Opposition from the circuit resistance alone, ignoring any reactance',
      'Opposition from the reactance alone, ignoring any resistance',
      'The phase angle between voltage and current, expressed in degrees',
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
    question: 'A series circuit has a resistance of 30 Ω and an inductive reactance of 40 Ω. What is the impedance?',
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
    question: 'What is the phase angle between the supply voltage and the current in a series circuit with a resistance of 30 Ω and an inductive reactance of 40 Ω?',
    options: [
      '90°',
      '53.13°',
      '45°',
      '36.87°',
    ],
    correctAnswer: 1,
    explanation: 'Phase angle θ = tan⁻¹(XL/R) = tan⁻¹(40/30) = tan⁻¹(1.333) = 53.13°',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 54,
    question: 'What is true power in an AC circuit?',
    options: [
      'V × I (in VA)',
      'V × I × sin(φ)',
      'V × I × cos(φ)',
      'V²/(R × cos φ)',
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
      'Power converted to heat in resistive elements',
      'The total power drawn from the supply in VA',
      'The useful mechanical or thermal power delivered to a load',
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
      'V × I × cos φ (the power actually doing useful work)',
      'V × I × sin φ (the power stored and then returned)',
      'The arithmetic difference between true and reactive power (P − Q)',
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
      'True power divided by the reactive power (P/Q)',
      'Reactive power divided by apparent power (sin φ)',
      'True power divided by apparent power (cos φ)',
      'Apparent power divided by true power (S/P)',
    ],
    correctAnswer: 2,
    explanation:
      'Power factor = True Power / Apparent Power = P/S = cos(φ). It indicates how effectively power is being used.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 59,
    question: 'A single-phase circuit draws 10 A at 230 V with a power factor of 0.8. What is the true power, in watts?',
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
      'When the circuit resistance equals the total reactance',
      'When inductive reactance equals capacitive reactance',
      'When the supply frequency has reached its highest value',
      'When current and voltage are 90° out of phase',
    ],
    correctAnswer: 1,
    explanation:
      'Resonance occurs when XL = XC, causing them to cancel out. At resonance, impedance is purely resistive and current is maximum.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 62,
    question: 'What is the resonant frequency formula?',
    options: [
      'fr = 2π/√(LC)',
      'fr = √(L/C)',
      'fr = 1/(2π√(LC))',
      'fr = 1/(LC)',
    ],
    correctAnswer: 2,
    explanation: 'Resonant frequency fr = 1/(2π√(LC)), where L is inductance and C is capacitance.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 63,
    question: 'What is the angular frequency ω?',
    options: [
      'f / 2π (radians per second)',
      '2π / f (radians per second)',
      'f × 2 (radians per second)',
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
      'Tendency for AC current to concentrate at the conductor centre',
      'Surface heating of insulation caused by high frequency',
      'Loss of insulation resistance due to surface moisture',
    ],
    correctAnswer: 0,
    explanation:
      'Skin effect causes AC current to concentrate near the conductor surface, reducing effective cross-sectional area and increasing resistance at higher frequencies.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 65,
    question: 'A single-phase load takes 5 A from a 230 V supply, with the current lagging the voltage by 60°. What is the true power, in watts?',
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
    difficulty: 'basic',
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
    difficulty: 'basic',
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
    question: 'What does the impedance of a series RLC circuit equal at resonance?',
    options: [
      'An infinitely high impedance',
      'Zero, a perfect short circuit',
      'The resistance R alone',
      'The arithmetic sum XL + XC',
    ],
    correctAnswer: 2,
    explanation:
      'At resonance, XL = XC so they cancel, leaving only resistance. Impedance Z = R, and current is at maximum.',
    section: '3.2',
    difficulty: 'intermediate',
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
    question: 'What is the nominal line voltage of a UK three-phase low voltage supply?',
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
      'IL = (Ip × √3)',
      'IL = (Ip / √3)',
      'IL = Ip (same)',
      'IL = (Ip × 3)',
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
      'VL = (Vp × √3)',
      'VL = (Vp / √3)',
      'VL = (Vp × 3)',
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
      'P = (VL × IL)',
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
      'A balanced three-phase load draws 20 A in each line from a 400 V line voltage supply at a power factor of 0.85. What is the total true power, in kW?',
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
      'It removes the need for any earth connection',
      'It operates safely at a lower voltage than single-phase',
      'It eliminates the need for protective devices',
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
      'A load connected across all three phases and neutral',
      'A load where two phases carry equal current and one carries none',
      'A load that automatically switches between phases',
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
      'To carry the earth fault current safely back to the supply transformer',
      'To balance the connected load equally across all three of the line conductors',
      'To provide a return path for unbalanced currents and single-phase loads',
      'To increase the line voltage made available to the connected loads',
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
      'The rate at which the supply voltage alternates, measured in hertz',
      'The fixed 120° displacement between any two of the phases',
      'The direction in which a three-phase motor shaft physically turns',
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
    question: 'What happens if two of the line conductors feeding a three-phase motor are interchanged?',
    options: [
      'Motor reverses direction',
      'Motor runs faster than normal',
      'Motor slows below normal speed',
      'Motor will not start at all',
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
      'Reversing the direction of a three-phase motor',
      'Reducing starting current of large three-phase motors',
      'Increasing the running speed of a motor above synchronous',
      'Converting a single-phase supply to three-phase',
    ],
    correctAnswer: 1,
    explanation:
      'Star-delta starting reduces motor starting current to about 1/3 of direct-on-line current by initially connecting windings in star, then switching to delta.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 86,
    question: 'By what factor does star-delta starting reduce the starting current compared with direct-on-line starting?',
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
      'Marked L1, L2 and L3',
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
      'A three-phase motor delivers 15 kW of mechanical output at 400 V, with an efficiency of 90 % and a power factor of 0.85. What is the full-load line current?',
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
      'A three-phase four-wire supply carries 30 A in L1, 20 A in L2 and 25 A in L3, all loads being resistive. What is the neutral current?',
    options: [
      '75A',
      'Approximately 8.66A',
      '25A',
      'Zero',
    ],
    correctAnswer: 1,
    explanation:
      'For unbalanced loads displaced by 120°, neutral current is the phasor sum: IN = √[(I1²+I2²+I3²) − (I1·I2+I2·I3+I3·I1)] = √[(900+400+625) − (600+500+750)] = √75 ≈ 8.66A.',
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
    question: 'A 400 V three-phase heater has three 50 Ω elements connected in star. What total power does it dissipate?',
    options: [
      '3,200W',
      '9,600W',
      '3,174W',
      '5,529W',
    ],
    correctAnswer: 0,
    explanation:
      'Phase voltage = 400/√3 = 230.9 V. Power per phase = V²/R = 230.9²/50 = 1,066.7 W. Total = 3 × 1,066.7 = 3,200 W. Watch the 3,174 W distractor: that is what you get by rounding the phase voltage to 230 V before squaring it, and squaring magnifies the rounding error.',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 95,
    question: 'Three 50 Ω heater elements are connected in delta across a 400 V three-phase supply. What total power do they dissipate?',
    // Was a duplicate of id 66 (both asked form factor, both keyed 1.11).
    // Repointed at crest factor, which its own explanation already contrasted.
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
      'A clamp meter on the line/neutral pair',
      'An insulation/continuity tester',
      'A two-pole L/N voltage indicator',
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
      'A load drawing the same current in every phase line',
      'A load with unequal current draw on each phase',
      'A load that is connected between two phases only',
      'A load that draws no current from the neutral',
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
      'Increased running speed, higher torque and improved efficiency',
      'Reduced starting current, cooler windings and smoother running',
      'Increased heating, reduced torque, and potential motor damage',
      'A higher power factor, lower running current and less heating overall',
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
      'A three-phase motor delivers 22 kW of mechanical output from a 400 V supply at a power factor of 0.88 with an efficiency of 91 %. What is the full-load line current?',
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
      'The core material (steel/ferrite)',
      'The supply frequency (50/60 Hz)',
      'The turns ratio (N2/N1)',
      'The power rating (kVA/kW)',
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
      'A 100 VA transformer has a 230 V primary and a 12 V secondary. What is the maximum secondary current?',
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
    question: 'What efficiency is typical of a well-designed power transformer?',
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
      'Heating in the resistance of the copper windings',
      'Reversing the magnetic domains on every AC cycle',
      'Leaking magnetic flux escaping into the surrounding air',
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
      'Using a solid one-piece iron core (no laminations)',
      'Using laminated cores (thin insulated sheets)',
      'Operating the transformer on direct current (d.c.)',
      'Increasing the supply frequency (above 50 Hz)',
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
      'Energy lost as heat in the resistance of the windings',
      'Energy lost through circulating currents in the core',
      'Energy lost in repeatedly magnetising and demagnetising the core',
      'Energy lost through magnetic flux leaking into the air',
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
      'To step the voltage up for economic long-distance transmission at reduced current',
      'To smooth a pulsating DC supply into a steady DC output for electronic equipment',
      'To correct a lagging power factor by supplying leading reactive current to the load',
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
    question: 'Why will a transformer not produce an output from a steady d.c. supply?',
    options: [
      'No changing current means no changing magnetic field, so no induced voltage',
      'DC cannot magnetise a laminated steel core at all, so no flux is produced',
      'The core saturates the instant DC flows, so it rejects all further current',
      'DC reverses the secondary winding polarity, cancelling the output voltage',
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
      'Stepping high voltage down for measurement and protection circuits',
      'Measuring high currents by stepping them down to a safe measurable level',
      'Limiting the prospective fault current in a high-voltage circuit',
      'Correcting the power factor on a heavily loaded distribution feeder',
    ],
    correctAnswer: 1,
    explanation:
      'Current transformers step down high currents to lower values (typically 1A or 5A) safe for measurement and metering instruments.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 114,
    question: 'Why must the secondary of a current transformer never be left open circuit while the primary is energised?',
    options: [
      'The current in the primary conductor drops suddenly to zero on load',
      'The reading on the connected ammeter simply reverses its polarity',
      'Dangerous high voltages develop that can damage insulation and harm personnel',
      'The core demagnetises and the CT loses its calibration permanently',
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
      'Stepping high current down to a measurable level',
      'Providing electrical isolation with no change in voltage',
      'Correcting voltage drop on a long distribution cable',
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
      'A transformer that automatically adjusts its output voltage to the load',
      'A transformer with fully separate, electrically isolated windings',
      'A transformer that converts AC to DC for automotive use',
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
      'Complete electrical isolation between input and output, unlike a two-winding type',
      'Smaller, lighter, cheaper, and more efficient for small voltage changes',
      'The ability to run directly from a d.c. supply, since it has only one winding',
      'A fixed output voltage, held constant regardless of the input applied',
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
      'The ratio of secondary turns to primary turns, expressed as a percentage',
      'The maximum continuous secondary current, above which the windings overheat',
      'The change in secondary voltage from no-load to full-load, expressed as a percentage',
      'The proportion of input power lost as heat in the core, expressed as a percentage',
    ],
    correctAnswer: 2,
    explanation:
      'Voltage regulation = (Vno-load - Vfull-load)/Vfull-load × 100%. Good regulation means small voltage change with varying load.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 119,
    question: 'What does the percentage impedance of a transformer express?',
    options: [
      'The ratio of iron losses to copper losses at full load',
      'The percentage of rated current drawn when the secondary is open',
      'The turns ratio expressed as a percentage of the primary',
      'The percentage voltage drop at full load due to resistance and reactance',
    ],
    correctAnswer: 3,
    explanation:
      'Impedance voltage (Z%) is the primary voltage needed to circulate full-load current with the secondary short-circuited, expressed as a percentage.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 120,
    question:
      'A 1000 kVA transformer with a 400 V three-phase secondary has a percentage impedance of 5 %. What is the prospective short-circuit current at its secondary terminals?',
    options: [
      '20 × full load current',
      '100 × full load current',
      '5 × full load current',
      '50 × full load current',
    ],
    correctAnswer: 0,
    explanation: 'Short circuit current = Full load current / (Z%/100) = FLC / 0.05 = 20 × FLC',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 121,
    question: 'What is a three-phase transformer connection Dy11?',
    options: [
      "Star primary, delta secondary with no phase shift",
      "Delta primary, star secondary with 11 o'clock phase shift",
      "Delta primary, delta secondary with 1 o'clock phase shift",
      "Star primary, star secondary with 180° phase shift",
    ],
    correctAnswer: 1,
    explanation:
      "Dy11 indicates Delta primary (D), star secondary (y), with secondary leading primary by 30° (11 o'clock position on a clock diagram).",
    section: '3.4',
    difficulty: 'basic',
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
      'Switching the transformer between AC and DC operation',
      'Disconnecting the transformer under fault conditions',
      'Cooling the windings by circulating insulating oil',
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
    question: 'What does the kVA rating of a transformer state?',
    options: [
      'Its maximum continuous apparent power output',
      'Its real power output in kilowatts at unity power factor',
      'The reactive power it stores in its magnetic core',
      'The power lost as heat in the core and windings',
    ],
    correctAnswer: 0,
    explanation:
      'kVA rating is the maximum continuous apparent power the transformer can deliver without exceeding temperature limits.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 125,
    question: 'A 50 kVA transformer has a 400 V three-phase secondary. What is its maximum secondary line current?',
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
      'Moving a conductor through a magnetic field induces an EMF',
      'A changing current induces a voltage in a nearby winding',
      'Current-carrying conductor in a magnetic field experiences a force',
      'Opposite electric charges attract and like charges repel',
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
      'Passing current through a conductor in a field produces a force',
      'Maintaining a steady current in a coil produces a steady field',
      'Heating a junction of two dissimilar metals produces a voltage',
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
      'Direction of the induced EMF when a conductor moves through a field (generator action)',
      'The magnitude of the force on a current-carrying conductor (F = BIl)',
      'The direction of flux circling a current-carrying conductor (grip rule)',
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
      'Direction of force on a current-carrying conductor',
      'Direction of induced EMF in a generator',
      'Direction of magnetic flux inside a solenoid',
      'Polarity of the plates of a charged capacitor',
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
      'A motor whose rotor winding is fed with current through carbon brushes and slip rings',
      'A motor that always runs at exactly synchronous speed, whatever the load applied',
      "A motor where the rotor current is induced by the stator's rotating magnetic field",
      'A motor using permanent magnets in the rotor together with fully electronic commutation',
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
      'The actual running speed of the rotor at the shaft, measured under full rated load conditions',
      'The speed at which the motor draws its lowest current, measured at rated torque',
      'The maximum safe rotor speed, beyond which the stator windings begin to overheat',
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
    question: 'What is the synchronous speed of a four-pole induction motor on a 50 Hz supply, in rev/min?',
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
      'The mechanical wear between the rotor shaft and its bearings',
      'The difference between synchronous speed and actual rotor speed',
      'The amount by which the rotor speed exceeds the synchronous speed',
      'The phase difference between stator current and voltage',
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
      'A four-pole motor has a synchronous speed of 1500 rev/min and runs at 1440 rev/min. What is the slip as a percentage?',
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
      'Slip lets the rotor run slightly faster than the field, which is what happens at light load',
      'Slip reduces the heavy starting current, limiting the inrush each time the motor starts',
      'Slip holds the power factor close to unity, right across the working load range',
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
    question: 'How is the rotor of a cage induction motor constructed?',
    options: [
      'Rotor with aluminium or copper bars short-circuited by end rings',
      'Rotor with insulated windings connected to external slip rings and brushes',
      'Rotor made from permanent magnets bonded onto a laminated steel core',
      'Rotor with a segmented commutator and spring-loaded carbon brushes',
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
      'Easily adjustable speed, set by external rotor resistance',
      'Simple, robust, low maintenance, and lower cost',
      'Very high starting torque, drawn at low starting current',
      'Runs at exactly synchronous speed, with no slip at all',
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
      'What is the typical starting current of a cage induction motor, as a multiple of its full-load current?',
    options: [
      'Same as full load',
      'Two to three times full load',
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
      'A resistor bank switched into the rotor circuit to limit the starting current',
      'A mechanical gearbox that varies the speed of the driven output shaft under load',
      'A tapped transformer that steps the motor supply voltage up and down in fixed stages',
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
      'To keep the motor power factor at unity across the whole speed range',
      'To allow the motor to run continuously above its synchronous speed',
      'To eliminate the need for any overload protection on the motor circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Keeping V/f constant maintains constant magnetic flux in the motor. Reducing frequency without reducing voltage would cause core saturation and overheating.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 141,
    question: 'What is a soft starter?',
    options: [
      'A device that connects the motor straight to full supply voltage',
      'A device that reduces starting current by gradually increasing voltage',
      'A device that varies the running speed by changing the supply frequency',
      'A device that reverses the phase rotation to brake the motor quickly',
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
      'To correct the motor\'s lagging power factor, and that of its supply cabling',
      'To convert the alternating supply to direct current, which the windings need',
      'To provide starting, stopping, protection, and sometimes speed control',
      'To step the supply voltage down, matching it to the motor windings in use',
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
      'Starting in star and then switching over to delta once the motor is near full speed',
      'Gradually ramping the applied voltage up over several seconds with a thyristor starter',
      'Starting through a tapping on a step-down auto-transformer and then switching over',
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
      'To detect earth faults and provide additional protection against shock',
      'To limit the very high inrush current drawn by the motor during starting only',
      'To correct the lagging power factor of the motor and its circuit wiring',
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
      'Overload protects against high fault currents; short circuit protects against sustained moderate overcurrent',
      'Overload protects against moderate sustained overcurrent; short circuit protects against very high fault currents',
      'Overload protects against earth leakage faults; short circuit protects against overvoltage transients on the supply',
      'There is no difference; both devices trip instantly on any current at all above the rated value of the whole circuit',
    ],
    correctAnswer: 1,
    explanation:
      'Overload protection is slow (allows starting current) but trips on sustained moderate overcurrent. Short circuit protection trips instantly on very high fault currents.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 146,
    question: 'What power factor is typical of an induction motor running at full load?',
    options: [
      'Leading, typically 0.8-0.9 at full load',
      'Unity at all loads, because motors are resistive',
      'Lagging, typically 0.8-0.9 at full load',
      'Lagging, but highest when the motor is lightly loaded',
    ],
    correctAnswer: 2,
    explanation:
      "Induction motors have lagging power factor due to magnetising current. At full load, PF is typically 0.8-0.9; at light loads it's much lower.",
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 147,
    question: 'What efficiency is typical of a modern three-phase induction motor?',
    options: [
      '30-50% depending on size and type',
      '50-65% depending on size and type',
      'Always 100% as motors do not dissipate heat',
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
      'Insulation Endurance classes rating winding temperature limits (Class F, H)',
      'Ingress Enclosure classes rating dust and water protection (IP54, IP66)',
      'Inrush Energy classes rating starting current (DOL, star-delta, soft start)',
    ],
    correctAnswer: 0,
    explanation:
      'IE classes define motor efficiency levels: IE1 (Standard), IE2 (High), IE3 (Premium), IE4 (Super Premium), IE5 (Ultra Premium).',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 149,
    question: 'What distinguishes a single-phase induction motor from a three-phase machine?',
    options: [
      'A motor that will run only from a balanced three-phase supply system',
      'A motor designed to run on single-phase supply using starting mechanisms',
      'A motor that runs on direct current using a commutator and a set of brushes',
      'A motor that runs at exactly synchronous speed with no slip at all',
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
      'A three-phase motor with a capacitor connected across each of the windings',
      'A motor that stores the energy needed for starting in a large capacitor bank',
      'A single-phase motor using a capacitor to create phase shift for starting',
      'A motor with power factor correction capacitors fitted inside the frame',
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
      'A motor that runs slightly below synchronous speed due to slip',
      'A motor whose speed varies directly with the mechanical load',
      'A motor that relies on induced rotor currents for torque',
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
      'The voltage dropped across the winding resistance, measured when running under load',
      'The surge produced by the collapsing field, at the instant the motor is switched off',
      'The supply voltage at the motor terminals, measured at the connection block on the frame',
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
      'The power factor is at its very highest during starting, so the current drawn peaks briefly',
      'At standstill, there is no back-EMF to oppose supply, so only winding resistance limits current',
      'The supply voltage is momentarily boosted at the moment of switch-on, by the local supply transformer',
      'The rotor resistance falls away sharply, while the motor is still stationary at switch-on',
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
      'A motor that uses wound electromagnets energised by a separate DC field current',
      'A motor relying entirely on currents induced in a squirrel-cage rotor',
      'A motor using permanent magnets instead of electromagnetic field windings',
      'A motor with magnets that have to be re-magnetised periodically in service',
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
      'A DC motor with a mechanical commutator, running on carbon brushes',
      'An AC induction motor, fitted with a plain squirrel-cage rotor',
      'A motor that runs only from a three-phase supply, never from DC',
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
      'The rotational speed of the motor, measured in RPM',
      'The electrical power consumed by the motor, measured in watts',
      'The mechanical energy delivered by the motor, measured in joules',
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
      'P = T / (2π × n) where n is RPM',
      'P = (2π × n × T) / 60 where n is RPM',
      'P = (T × n) / 60 where n is RPM',
      'P = (60 × T) / (2π × n) where n is RPM',
    ],
    correctAnswer: 1,
    explanation:
      'Power (W) = (2π × n × T) / 60, where n is speed in RPM and T is torque in Nm. Or P = ω × T where ω is rad/s.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 158,
    question: 'What does the IP rating marked on a motor describe?',
    options: [
      'Internal Power - the rated continuous output in kilowatts',
      'Insulation Performance - the winding temperature class limit',
      'Ingress Protection - protection against solid objects and liquids',
      'Inrush Period - the duration of the high current drawn at starting',
    ],
    correctAnswer: 2,
    explanation:
      'IP rating (e.g., IP55) indicates protection against ingress of solids (first digit) and liquids (second digit). Higher numbers mean better protection.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 159,
    question: 'What does a Class F insulation marking on a motor indicate?',
    options: [
      'Maximum temperature rating of 105°C for the motor windings',
      'Maximum temperature rating of 130°C for the whole winding insulation',
      'Maximum temperature rating of 180°C for the winding insulation system',
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
      'Dissipating the kinetic energy as heat in a resistor bank fitted to the drive',
      'Applying a mechanical friction brake to the shaft to bring the motor to rest',
      'Injecting direct current into the stator windings to bring the rotor to rest',
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
    question: 'What does the power factor of an a.c. circuit express?',
    options: [
      'The ratio of reactive power to apparent power (sin φ)',
      'The ratio of true power to apparent power (cos φ)',
      'The ratio of apparent power to true power (S/P)',
      'The ratio of reactive power to true power (Q/P)',
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
      '0 (purely reactive)',
      '0.5 (lagging)',
      '1.0 (unity)',
      '-1.0 (negative unity)',
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
      'It causes the supply voltage to rise, taking equipment above its safe limits',
      'Higher current needed for same power, causing increased losses and charges',
      'It increases the real power actually consumed, for the same useful work done',
      'It raises the supply frequency, pushing it above the nominal 50Hz',
    ],
    correctAnswer: 1,
    explanation:
      'Low PF means higher current for the same real power, causing increased I²R losses, voltage drops, larger cable requirements, and often penalty charges.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 166,
    question: 'A load takes 100 kVA at a power factor of 0.7. What true power does it consume, in kW?',
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
    question: 'How is a lagging power factor normally corrected in an installation?',
    options: [
      'By adding further inductive load in parallel with the circuit',
      'By increasing the supply voltage delivered to the whole load',
      'By raising the supply frequency above the nominal 50Hz',
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
      'Capacitors fitted to smooth the direct current output of a rectifier power supply',
      'Capacitors that store charge so that equipment can ride through brief supply dips',
      'Capacitors that filter high-frequency electrical noise out of the incoming supply',
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
      'A single-phase motor takes 50 A at 230 V with a power factor of 0.75. What capacitive reactive power, in kvar, is needed to correct it to 0.95?',
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
      'At the incoming supply transformer only',
      'On the neutral conductor of the final circuit',
      'As close to the inductive load as possible',
      'As far from the inductive load as possible',
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
      'A fixed capacitor bank permanently connected at the main intake position',
      'A controller that adjusts the supply voltage in order to correct power factor',
      'A relay that disconnects inductive loads whenever the power factor drops',
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
      'It lowers the true power consumed, so the load does less useful work',
      'It causes the supply frequency to drift, falling below 50Hz',
      'It increases the real power losses, within the load itself',
    ],
    correctAnswer: 0,
    explanation:
      'Over-correction causes leading PF, potentially resulting in voltage rise, resonance with system inductance, and damage to capacitors and equipment.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 173,
    question: 'In what unit is reactive power measured?',
    options: [
      'Watts (W)',
      'VAr (volt-amperes reactive)',
      'Volt-amperes (VA)',
      'Joules (J)',
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
      'A meter measuring real energy consumption in kilowatt-hours',
      'A meter measuring instantaneous apparent power in kVA',
      'A meter measuring reactive energy consumption over time',
      'A meter measuring the power factor of the installation',
    ],
    correctAnswer: 2,
    explanation:
      'A kVArh meter measures reactive energy consumption. Some tariffs charge for reactive energy or impose penalties for low power factor.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 175,
    question: 'What charge may a supplier apply where an installation runs at a low power factor?',
    options: [
      'A reduced unit rate for consumption taken during off-peak hours',
      'A lower standing charge on the supply capacity made available',
      'A rebate proportional to the reactive energy drawn each month',
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
    question: 'What minimum power factor do distributors typically require of a large consumer?',
    options: [
      'Typically 0.9 or 0.95 lagging minimum',
      'Typically 0.5 lagging minimum',
      'Typically a leading power factor of 0.8',
      'No minimum is ever specified by utilities',
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
      'Power factor caused solely by the harmonic distortion of the load current',
      'Power factor determined by the phase angle between fundamental voltage and current',
      'The product of the true power factor and the distortion power factor of the load',
      'The ratio of the peak current to the RMS current in the supply waveform',
    ],
    correctAnswer: 1,
    explanation:
      "Displacement power factor is based on the phase displacement between fundamental (50Hz) voltage and current. It's affected by reactive components.",
    section: '3.6',
    difficulty: 'basic',
  },
  {
    id: 178,
    question: 'What is distortion power factor?',
    options: [
      'Power factor caused only by the phase shift at 50Hz',
      'The phase displacement between line and phase voltages',
      'The component of power factor due to current harmonics',
      'The ratio of reactive power to apparent power',
    ],
    correctAnswer: 2,
    explanation:
      'Distortion power factor accounts for the effect of harmonics. True PF = Displacement PF × Distortion PF. High harmonics reduce true power factor.',
    section: '3.6',
    difficulty: 'basic',
  },
  {
    id: 179,
    question: 'What is the effect of harmonics on power factor?',
    options: [
      'Harmonics have no effect on power factor at all, only on cable heating',
      'Harmonics improve true power factor by adding real power to the load',
      'Harmonics affect power factor only on rectified DC supply circuits',
      'Harmonics reduce true power factor even if displacement power factor is good',
    ],
    correctAnswer: 3,
    explanation:
      'Harmonics increase current without increasing real power, reducing true power factor. Harmonic filters may be needed alongside PFC capacitors.',
    section: '3.6',
    difficulty: 'basic',
  },
  {
    id: 180,
    question: 'What is a detuned PFC capacitor bank?',
    options: [
      'Capacitors with series reactors to avoid resonance with system harmonics',
      'Capacitors that are switched in manually rather than automatically',
      'Capacitors deliberately sized below the reactive load requirement',
      'Capacitors connected in delta rather than in star at the board',
    ],
    correctAnswer: 0,
    explanation:
      'Detuned capacitor banks include series reactors that shift the resonant frequency away from common harmonics, preventing dangerous resonance conditions.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 181,
    question: 'Why may the supply voltage rise slightly when power factor correction is switched in?',
    options: [
      'A large voltage drop because capacitors absorb supply voltage',
      'Slight voltage rise due to reduced voltage drop from lower reactive current',
      'No change in voltage as capacitors draw no current',
      'A drop in supply frequency that reduces the voltage',
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
      'To limit the inrush current, drawn when the capacitor bank is switched on',
      'To improve the correction obtained at very light load, when demand is low',
      'To safely discharge stored energy when disconnected, preventing shock hazard',
      'To tune the capacitor bank away from resonance, clear of the harmonics present',
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
      'A lower power factor reduces the kVA that the transformer must supply',
      'Power factor has no effect at all on the loading of the transformer',
      'A higher power factor increases the kVA loading placed on the transformer',
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
      'Instantly, with no residual voltage',
      '1 hour to discharge to <50V',
      '24 hours to discharge to <50V',
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
      'By lowering the resistance of the supply cables, so that less heat is developed in them',
      'By reducing current flow for the same real power, current squared losses decrease',
      'By raising the supply voltage, so that less current is needed for the load',
      'By converting the reactive component into real power, which the load then uses',
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
      'Vd = I × (R sin φ + X cos φ) × L',
      'Vd = I × R × L (reactance ignored)',
      'Vd = I × (R cos φ + X sin φ) × L',
      'Vd = I × (R + X) × L regardless of power factor',
    ],
    correctAnswer: 2,
    explanation:
      'For AC circuits, voltage drop includes both resistive and reactive components: Vd = I × (R cos φ + X sin φ) × L, accounting for power factor.',
    section: '3.7',
    difficulty: 'basic',
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
    question: 'A cable has a tabulated volt drop of 7.3 mV/A/m. What is the volt drop for a design current of 30 A over a 25 m run?',
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
      'It = In / (Ca + Cg + Ci)',
      'It = In / (Ca × Cg × Ci)',
      'It = In × Ca / (Cg × Ci)',
      'It = (Ca × Cg × Ci) / In',
    ],
    correctAnswer: 1,
    explanation:
      'Tabulated current must be ≥ It = In / (Ca × Cg × Ci), where Ca=ambient temp factor, Cg=grouping factor, Ci=thermal insulation factor.',
    section: '3.7',
    difficulty: 'basic',
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
    question: 'What fault current flows in a circuit with an earth fault loop impedance of 0.8 Ω on a 230 V supply?',
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
    question: 'What multiplier is applied to a conductor resistance measured at ambient temperature to give its value at operating temperature?',
    options: [
      'Multiply tabulated values by 1.20 (for 70°C operating) for thermoplastic cables',
      'Divide tabulated values by 1.20 (for 70°C operating) for thermoplastic cables',
      'No correction is needed (conductor resistance is independent of temperature)',
      'Multiply tabulated values by 0.80 (for 70°C operating) for thermoplastic cables',
    ],
    correctAnswer: 0,
    explanation:
      'Cable resistance increases with temperature. For thermoplastic at 70°C, multiply 20°C values by approximately 1.20 for accurate fault calculations.',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 193,
    question: 'What is the formula for prospective fault current at transformer secondary?',
    options: [
      'If = (√3 × V × Z%) / kVA',
      'If = (kVA × 1000 × 100) / (√3 × V × Z%)',
      'If = kVA / (√3 × V × cos φ)',
      'If = V × Z% / (√3 × kVA)',
    ],
    correctAnswer: 1,
    explanation:
      'For a three-phase transformer: If = (kVA × 1000 × 100) / (√3 × V × Z%), where V is line voltage and Z% is the transformer impedance percentage.',
    section: '3.7',
    difficulty: 'basic',
  },
  {
    id: 194,
    question: 'A 500kVA transformer at 400V with 5% impedance has prospective fault current of:',
    options: [
      '25,000A',
      '1,443A',
      '14,430A',
      '7,220A',
    ],
    correctAnswer: 2,
    explanation:
      'If = (500 × 1000 × 100) / (√3 × 400 × 5) = 50,000,000 / 3,464 = 14,434A ≈ 14,430A',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 195,
    question: 'What is diversity in electrical design?',
    options: [
      'A factor increasing the total design load to allow for future expansion',
      'The variety of the different cable types used within an installation',
      'The even spread of the final circuits across all three of the phases',
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
      'Simple sum of every connected load at full rating',
      'The single largest circuit load multiplied by the number of circuits',
      'Total connected load divided by the number of phases',
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
    difficulty: 'basic',
  },
  {
    id: 198,
    question: 'A fault current of 2000 A flows for 0.1 s. Taking k as 115, what is the minimum cross-sectional area of the protective conductor, in mm²?',
    options: [
      '4mm²',
      '2.5mm²',
      '6mm²',
      '10mm²',
    ],
    correctAnswer: 2,
    explanation:
      'S = √(I²t)/k = √(2000² × 0.1)/115 = √400,000/115 = 632.5/115 = 5.5mm². The next standard size up (6mm²) is selected, as the adiabatic result must be rounded up.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 199,
    question: 'What does the thermal equivalent current of an intermittently loaded circuit represent?',
    options: [
      'The highest peak current reached at any point during the load cycle',
      'The arithmetic average of the maximum and minimum currents in the cycle',
      'The total of all the currents drawn over the whole of the load cycle',
      'The steady current producing the same heating effect as the intermittent load',
    ],
    correctAnswer: 3,
    explanation:
      'Thermal equivalent current is the RMS value of varying load current that produces the same heating effect as a steady current.',
    section: '3.7',
    difficulty: 'basic',
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
    difficulty: 'intermediate',
  },
  {
    id: 202,
    question:
      'Aluminium has a resistivity of 2.83 × 10⁻⁸ Ω m. What is the resistance of a 100 m length of 16 mm² aluminium conductor?',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
  },
  {
    id: 204,
    question:
      'Copper has a temperature coefficient of resistance of 0.004 per °C. A conductor measures 1 Ω at 20 °C. What is its resistance at 70 °C?',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
  },
  {
    id: 208,
    question:
      'After how many time constants is a charging capacitor taken to be fully charged?',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
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
      'A single-loop generator rotates in a magnetic field at 50 revolutions per second. What is the frequency of the induced emf, in Hz?',
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
      'What is the average value of a sinusoidal waveform of 400 V peak, taken over one half cycle?',
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
    difficulty: 'intermediate',
  },
  {
    id: 217,
    question:
      "What is the crest factor of a sinusoidal AC waveform?",
    options: [
      '0.637',
      '1.11',
      '0.707',
      '1.414',
    ],
    correctAnswer: 3,
    explanation:
      "Crest factor = peak / RMS = 1 / 0.707 = 1.414 for a sine wave. Do not confuse it with the form factor, which is RMS / average = 0.707 / 0.637 = 1.11.",
    section: '3.8',
    difficulty: 'basic',
  },
  {
    id: 218,
    question:
      'What does total harmonic distortion measure?',
    options: [
      'The phase angle between the supply voltage and current',
      'The peak-to-RMS ratio of the supply waveform',
      'The ratio of the sum of harmonic content to the fundamental',
      'The variation in supply frequency around 50Hz',
    ],
    correctAnswer: 2,
    explanation:
      "THD expresses the contribution of harmonic frequencies relative to the fundamental, usually as a percentage. High THD overheats neutrals and transformers, particularly from third-order triplen harmonics generated by switch-mode power supplies and LED drivers.",
    section: '3.8',
    difficulty: 'basic',
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
      "Third harmonics (and other triplens) from each phase add arithmetically in the neutral instead of cancelling rather than summing to zero. Under BS 7671 (Appendix 4, Section 5.5 / Reg 523.6.3) an increase in neutral cross-sectional area may be required where triplen harmonic content exceeds 33% of the fundamental line current.",
    section: '3.8',
    difficulty: 'basic',
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
      'A balanced three-phase load draws a line current of 30 A at 400 V line voltage with a power factor of 0.85 lagging. What is the true power consumed, in kW?',
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
    difficulty: 'intermediate',
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
    difficulty: 'intermediate',
  },
  {
    id: 224,
    question:
      'A 100 kW load runs at a power factor of 0.7 lagging. Taking tan 45.6° as 1.02 and tan 18.2° as 0.329, what capacitive reactive power, in kvar, is needed to correct it to 0.95 lagging?',
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
    difficulty: 'intermediate',
  },
  {
    id: 225,
    question:
      'A three-phase four-wire supply carries 30 A in L1, 25 A in L2 and 20 A in L3, all loads being resistive. What is the approximate neutral current?',
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
      'It increases the line voltage, giving more volts to each phase',
      'It allows the neutral conductor to be omitted entirely, saving a conductor',
      'It reduces neutral current, voltage imbalance and supply losses',
      'It raises the supply power factor, bringing it towards unity',
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
      'An 11 kV/400 V three-phase distribution transformer has approximately what line-to-line turns ratio?',
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
    difficulty: 'intermediate',
  },
  {
    id: 229,
    question:
      "At what load does a transformer reach maximum efficiency?",
    options: [
      'At no load, when only iron losses are present',
      'When copper losses equal iron losses',
      'At full rated load, where output is greatest',
      'When iron losses are twice the copper losses',
    ],
    correctAnswer: 1,
    explanation:
      "Maximum efficiency occurs when variable copper losses equal fixed iron losses. Distribution transformers are typically designed so this point falls at around 50-75% of rated load to suit average daily loading.",
    section: '3.8',
    difficulty: 'basic',
  },
  {
    id: 230,
    question:
      'What is the synchronous speed of a four-pole, 50 Hz three-phase induction motor, in rev/min?',
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
      'A four-pole, 50 Hz induction motor has a full-load speed of 1440 rev/min. What is the slip as a percentage?',
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
      'An induction motor with a full-load slip of 3 % runs on a 50 Hz supply. What is the frequency of its rotor currents?',
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
    difficulty: 'intermediate',
  },
  {
    id: 233,
    question:
      'How does a variable frequency drive control the speed of an induction motor?',
    options: [
      'Switching rotor resistance in and out (wound-rotor/slip-ring starting)',
      'Varying both the supply frequency and the voltage proportionally (V/f control)',
      'Adjusting the gearing on the output shaft (gearbox/pulley ratio)',
      'Reversing two of the supply phases (L1/L2 swapped)',
    ],
    correctAnswer: 1,
    explanation:
      "VFDs use V/f control to keep magnetic flux constant. Reducing voltage with frequency prevents core saturation. VFDs deliver smooth speed control, soft start, regenerative braking and energy savings on variable-torque loads (pumps, fans).",
    section: '3.8',
    difficulty: 'basic',
  },
  {
    id: 234,
    question:
      'A directional LED luminaire of 4000 cd is aimed vertically down at a workbench 4 m directly below. What is the illuminance at the bench, in lux?',
    options: [
      '62.5 lx',
      '125 lx',
      '250 lx',
      '1,000 lx',
    ],
    correctAnswer: 2,
    explanation:
      "Inverse square law: E = I / d² = 4,000 / 4² = 4,000 / 16 = 250 lx. Doubling the mounting height would quarter the illuminance to 62.5 lx.",
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 235,
    question:
      'A room measuring 8 m × 6 m requires an average illuminance of 500 lx. Taking the utilisation factor as 0.6 and the maintenance factor as 0.8, what total lamp lumen output is required?',
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
      'Which equation gives the illuminance on a surface from a source at an angle to the normal?',
    options: [
      'E = I × cos θ / d²',
      'E = I / d',
      'E = I × sin θ / d',
      'E = I × d² / cos θ',
    ],
    correctAnswer: 0,
    explanation:
      "Cosine law: E = (I × cos θ) / d² where θ is the angle between the light direction and the surface normal. This corrects the inverse square law when the surface is not perpendicular to the light source.",
    section: '3.8',
    difficulty: 'basic',
  },
  {
    id: 237,
    question:
      'How does the luminous efficacy of a typical LED downlight compare with that of a tungsten GLS lamp?',
    options: [
      'LED ≈ 12 lm/W, GLS ≈ 100 lm/W',
      'LED ≈ 100 lm/W, GLS ≈ 12 lm/W',
      'Both ≈ 60 lm/W, LED and GLS alike',
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
      'A 3 kW immersion heater raises 100 litres of water from 15 °C to 65 °C. Taking the specific heat capacity of water as 4186 J/kg·K and ignoring losses, how long does this take, in minutes?',
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
      'An air source heat pump delivers 9 kW of heat with a SCOP of 3.5. How much electrical energy does it use in one hour of operation?',
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
    difficulty: 'intermediate',
  },
  {
    id: 240,
    question:
      'In which direction does a semiconductor diode allow current to flow?',
    options: [
      'One direction only (forward bias)',
      'Both directions equally (like a resistor)',
      'No directions (it is an insulator)',
      'Only at high frequencies (a.c. only)',
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
      'How does a full-wave bridge rectifier convert a.c. into d.c.?',
    options: [
      'Using a single diode that conducts on one half cycle only',
      'Using four diodes that conduct in pairs on each half cycle',
      'Using a transformer to invert the negative half cycle',
      'Using a capacitor alone to block the negative half cycle',
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
      'At what voltages is electricity typically transmitted on the UK transmission system?',
    options: [
      '230 V, 400 V and 690 V',
      '11 kV, 33 kV and 66 kV',
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
      'To make the supply safer to touch where it runs on overhead lines',
      'To allow thinner and cheaper insulation to be used on the line conductors',
      'To increase the supply frequency and so transmit more power per line',
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
      'The thermoelectric effect, where heat alone drives the current',
      'Photovoltaic effect in a semiconductor p-n junction',
      'Electromagnetic induction in a rotating coil',
      'The piezoelectric effect from pressure on a crystal',
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
      'A 100 kVA single-phase transformer has an 11 kV primary. What is its full-load primary current?',
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
    difficulty: 'intermediate',
  },
  {
    id: 247,
    question:
      'In what way does a relay differ from a contactor?',
    options: [
      'A relay is always operated mechanically by hand, whereas a contactor is operated electromagnetically',
      'A relay can switch alternating circuits only, while a contactor switches direct current only',
      'A relay provides overcurrent protection to the load circuit it feeds, whereas a contactor does not',
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
      'Two cables of different cross-sectional area carry the same current. Which has the greater volt drop per metre?',
    options: [
      'The cable with the thicker insulation',
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
      'A 230 V, 3 kW kettle is supplied by 12 m of 1.5 mm² twin and cpc cable with a tabulated volt drop of 29 mV/A/m. What is the approximate volt drop?',
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
  {
    id: 251,
    question: 'A heating element of 46 ohms is connected to a 230 V supply. What current flows?',
    options: [
      '5 A',
      '46 A',
      '0.2 A',
      '10580 A',
    ],
    correctAnswer: 0,
    explanation:
      'I = V / R = 230 / 46 = 5 A. The 0.2 A option comes from inverting the division and working out R / V = 46 / 230, and 10580 A comes from multiplying V x R instead of dividing. Always check the shape of the answer: 5 A through a domestic element is believable, 10580 A is not.',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 252,
    question: 'A current of 10 A flows through a 23 ohm resistive load. What power is dissipated?',
    options: [
      '230 W',
      '2300 W',
      '5290 W',
      '23000 W',
    ],
    correctAnswer: 1,
    explanation:
      'P = I squared x R = 10 x 10 x 23 = 100 x 23 = 2300 W. The 5290 W option is what you get by squaring the resistance instead of the current, 23 x 23 x 10 = 5290. The 230 W option is I x R, which is actually the voltage across the load in volts, not the power.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 253,
    question: 'A 50 m run of 4 mm² copper conductor has a resistivity of 1.78 × 10⁻⁸ Ω m. What is the resistance of one conductor?',
    options: [
      '2.225 ohms',
      '0.445 ohms',
      '0.2225 ohms',
      '0.000000223 ohms',
    ],
    correctAnswer: 2,
    explanation:
      'R = rho x L / A. The area must be in square metres, so 4 mm2 = 4 x 10 to the minus 6 m2. R = (1.78e-8 x 50) / 4e-6 = 8.9e-7 / 4e-6 = 0.2225 ohms. Leaving the area as the number 4 gives the absurd 0.000000223 ohms, which is the classic mm2 versus m2 slip. The 0.445 ohms answer uses the 100 m go and return loop when the question asked for one conductor, and 2.225 ohms is a decimal slip of one place in the area conversion.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 254,
    question: 'A battery supplies a steady 3 A for 20 minutes. How much charge has been delivered?',
    options: [
      '60 C',
      '216000 C',
      '180 C',
      '3600 C',
    ],
    correctAnswer: 3,
    explanation:
      'Q = I x t with t in SECONDS, so t = 20 x 60 = 1200 s and Q = 3 x 1200 = 3600 coulombs. The 60 C option is the mark loser: it leaves the time in minutes, 3 x 20. The 180 C option converts only one minute, 3 x 60, and 216000 C multiplies by 60 twice over.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 255,
    question: 'An oscilloscope shows a sinusoidal supply with a peak value of 325 V. What is the rms value?',
    options: [
      '230 V',
      '207 V',
      '325 V',
      '460 V',
    ],
    correctAnswer: 0,
    explanation:
      'Vrms = Vpeak / 1.414 = 325 / 1.414 = 229.8 V, which is the familiar 230 V. The 460 V option multiplies by 1.414 instead of dividing, which is the direction you use to go from rms UP to peak. The 207 V option applies 0.637, the average value factor, rather than 0.707 for rms.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 256,
    question: 'A coil of inductance 0.12 H is connected to a 50 Hz supply. What is its inductive reactance?',
    options: [
      '6.00 ohms',
      '37.7 ohms',
      '18.8 ohms',
      '0.0265 ohms',
    ],
    correctAnswer: 1,
    explanation:
      'XL = 2 x pi x f x L = 2 x 3.1416 x 50 x 0.12 = 37.7 ohms. The 6.00 ohm option drops 2 pi altogether and just multiplies 50 x 0.12. The 18.8 ohm option keeps pi but forgets the 2. The 0.0265 ohm option uses the capacitive form 1 / (2 pi f L), which is simply the reciprocal of the right answer.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 257,
    question: 'A series circuit has a resistance of 8 ohms and an inductive reactance of 15 ohms. What is the impedance?',
    options: [
      '7 ohms',
      '23 ohms',
      '17 ohms',
      '120 ohms',
    ],
    correctAnswer: 2,
    explanation:
      'R and X are 90 degrees apart, so they combine as the sides of a right triangle: Z = square root of (8 squared + 15 squared) = square root of (64 + 225) = square root of 289 = 17 ohms. The 23 ohm option adds them arithmetically, which is the single most common error here, and 7 ohms subtracts them. The 120 ohm option multiplies. Sanity check: Z must always be larger than either R or X but smaller than their sum.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 258,
    question: 'A series RLC circuit has R = 12 ohms, XL = 25 ohms and XC = 9 ohms. What is the impedance?',
    options: [
      '46 ohms',
      '28 ohms',
      '29.2 ohms',
      '20 ohms',
    ],
    correctAnswer: 3,
    explanation:
      'The two reactances oppose one another, so net X = XL - XC = 25 - 9 = 16 ohms. Then Z = square root of (12 squared + 16 squared) = square root of (144 + 256) = square root of 400 = 20 ohms. The 46 ohm option adds all three values arithmetically. The 28 ohm option finds the net X correctly but then adds 12 + 16 instead of using the triangle. The 29.2 ohm option squares all three separately, which double counts the capacitive reactance instead of cancelling it.',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 259,
    question: 'A 30 microfarad capacitor is connected to a 50 Hz supply. What is its capacitive reactance?',
    options: [
      '106.1 ohms',
      '212.2 ohms',
      '666.7 ohms',
      '0.00943 ohms',
    ],
    correctAnswer: 0,
    explanation:
      'XC = 1 / (2 x pi x f x C) with C in farads, so C = 30 x 10 to the minus 6 F. The bottom line is 2 x 3.1416 x 50 x 0.00003 = 0.009425, and 1 / 0.009425 = 106.1 ohms. The 212.2 ohm option forgets the 2 in 2 pi. The 666.7 ohm option drops 2 pi entirely. The 0.00943 ohm option is the denominator itself, quoted without taking the reciprocal.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 260,
    question: 'A balanced three-phase load draws 25 A per line from a 400 V supply at a power factor of 0.85. What is the true power?',
    options: [
      '8500 W',
      '14722 W',
      '17320 W',
      '25500 W',
    ],
    correctAnswer: 1,
    explanation:
      'P = root 3 x VL x IL x cos(phi) = 1.732 x 400 x 25 x 0.85 = 17320 x 0.85 = 14722 W. The 17320 W option omits the power factor and is therefore the apparent power in VA, which the cable must still carry. The 8500 W option omits root 3. The 25500 W option uses 3 instead of root 3, which overstates the power by about 73 per cent.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 261,
    question: 'A delta-connected load draws a line current of 30 A. What current flows in each phase winding?',
    options: [
      '10.0 A',
      '52.0 A',
      '17.3 A',
      '30.0 A',
    ],
    correctAnswer: 2,
    explanation:
      'In delta the phase voltage equals the line voltage but the line current is root 3 times the phase current, so Iphase = IL / 1.732 = 30 / 1.732 = 17.3 A. The 52.0 A option multiplies by root 3 instead of dividing, which is the star relationship applied to the wrong quantity. The 10.0 A option divides by 3 rather than root 3. The 30.0 A option is the star answer, where line and phase current are equal.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 262,
    question: 'A star-connected heater has three identical 44 Ω elements fed from a three-phase supply of 400 V line voltage. What total power does it dissipate?',
    options: [
      '1212 W',
      '6300 W',
      '10909 W',
      '3638 W',
    ],
    correctAnswer: 3,
    explanation:
      'In star each element sees the PHASE voltage, 400 / 1.732 = 231 V. Iphase = 231 / 44 = 5.25 A, and total P = 3 x Vphase x Iphase = 3 x 231 x 5.25 = 3638 W. The 10909 W option puts the 400 V line voltage across each element, 3 x 400 squared / 44, which triples the true output. The 1212 W option is one element only. The 6300 W option mixes bases by using 3 x line voltage x phase current.',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 263,
    question: 'A three-phase four-wire distribution board supplies a perfectly balanced load. What current flows in the neutral?',
    options: [
      'Zero, the three currents sum to zero',
      'Equal to one line current, in size and in phase',
      'Three times a line current, since all three add',
      'Root three times a line current, as for line voltage',
    ],
    correctAnswer: 0,
    explanation:
      'The three phase currents are equal in size and 120 degrees apart, so their phasor sum at the star point is zero and no current returns in the neutral. The neutral is sized for the UNBALANCE, not for the sum of the three currents, which is why the three times and root three times options are wrong. In practice harmonic currents, especially the third harmonic from electronic loads, add rather than cancel, so a real neutral is rarely at exactly zero.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 264,
    question: 'A single-phase transformer steps 11000 V down to 400 V. The secondary has 200 turns. How many turns are on the primary?',
    options: [
      '7 turns',
      '5500 turns',
      '27 turns',
      '11000 turns',
    ],
    correctAnswer: 1,
    explanation:
      'Turns are in the same ratio as volts: Np = Ns x (Vp / Vs) = 200 x (11000 / 400) = 200 x 27.5 = 5500 turns. The 7 turn option inverts the ratio, 200 x 400 / 11000, and gives fewer turns on the high voltage side, which cannot be right for a step-down transformer. The 27 turn option is the turns ratio itself, not a number of turns, and 11000 turns simply repeats the primary voltage figure.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 265,
    question: 'A 5 kVA single-phase transformer is rated 230 V / 115 V. What is the full-load secondary current?',
    options: [
      '21.7 A',
      '10.9 A',
      '43.5 A',
      '86.9 A',
    ],
    correctAnswer: 2,
    explanation:
      'The kVA rating applies to both windings, so Is = S / Vs = 5000 / 115 = 43.5 A. The 21.7 A option is the PRIMARY current, 5000 / 230, quoted for the secondary; halving the voltage must double the current, so the secondary figure has to be the larger one. The 10.9 A option divides the primary current by the ratio instead of multiplying it, and 86.9 A applies the ratio of 2 twice over.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 266,
    question: 'A transformer delivers 45 kW to its load while dissipating 1.0 kW of iron loss and 1.5 kW of copper loss. What is its efficiency?',
    options: [
      '5.3 per cent',
      '94.4 per cent',
      '105.6 per cent',
      '94.7 per cent',
    ],
    correctAnswer: 3,
    explanation:
      'Efficiency = output / input, and input = output plus losses = 45 + 1.0 + 1.5 = 47.5 kW. So efficiency = 45 / 47.5 = 0.9474, or 94.7 per cent. The 94.4 per cent option subtracts the losses from the output instead of adding them to the input, 42.5 / 45. The 105.6 per cent option inverts the fraction to 47.5 / 45, and any efficiency above 100 per cent should be rejected on sight. The 5.3 per cent figure is the loss fraction, not the efficiency.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 267,
    question: 'A four-pole induction motor runs at 1440 rev/min from a 50 Hz supply. What is its slip as a percentage?',
    options: [
      '4 per cent',
      '4.2 per cent',
      '96 per cent',
      '60 per cent',
    ],
    correctAnswer: 0,
    explanation:
      'Synchronous speed Ns = 120 x f / p = 120 x 50 / 4 = 1500 rev/min. Slip = (Ns - Nr) / Ns = (1500 - 1440) / 1500 = 60 / 1500 = 0.04, so 4 per cent. The 4.2 per cent option divides by the rotor speed 1440 rather than the synchronous speed, which is the usual slip. The 96 per cent option is 1440 / 1500, the fraction of synchronous speed the rotor actually reaches, and 60 is the slip speed in rev/min quoted as if it were a percentage.',
    section: '3.5',
    difficulty: 'advanced',
  },
  {
    id: 268,
    question: 'A 7.5 kW three-phase motor on a 400 V supply has an efficiency of 88 per cent and a power factor of 0.85. What is the full-load line current?',
    options: [
      '12.3 A',
      '14.5 A',
      '12.7 A',
      '25.1 A',
    ],
    correctAnswer: 1,
    explanation:
      'The nameplate 7.5 kW is the mechanical OUTPUT, so first find the electrical input: 7500 / 0.88 = 8523 W. Then IL = P / (root 3 x VL x cos phi) = 8523 / (1.732 x 400 x 0.85) = 8523 / 588.9 = 14.5 A. The 12.7 A option forgets the efficiency and uses 7500 W as the input, which always understates the current. The 12.3 A option leaves out the power factor and 25.1 A leaves out root 3.',
    section: '3.5',
    difficulty: 'advanced',
  },
  {
    id: 269,
    question: 'A DC motor has an armature resistance of 0.5 ohms and draws 20 A from a 230 V supply. What is the back emf?',
    options: [
      '210 V',
      '240 V',
      '220 V',
      '230 V',
    ],
    correctAnswer: 2,
    explanation:
      'The armature volt drop is Ia x Ra = 20 x 0.5 = 10 V, and the back emf opposes the supply, so E = V - Ia x Ra = 230 - 10 = 220 V. The 240 V option adds the drop instead of subtracting it, which would make the back emf larger than the supply and no current could flow. The 210 V option doubles the drop. At the instant of starting the back emf is zero, which is exactly why starting current is so high.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 270,
    question: 'A single-phase load takes 8 A from a 230 V supply and consumes 1472 W. What is the reactive power, in var?',
    options: [
      '368 var',
      '1472 var',
      '3312 var',
      '1104 var',
    ],
    correctAnswer: 3,
    explanation:
      'Apparent power S = V x I = 230 x 8 = 1840 VA. The power triangle gives Q = square root of (S squared minus P squared) = square root of (3385600 - 2166784) = square root of 1218816 = 1104 var. The 368 var option subtracts arithmetically, 1840 - 1472, which ignores that the three powers form a right triangle. The 3312 var option adds S and P. The 1472 var option confuses true power with reactive power.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 271,
    question: 'A 20 kW load runs at a power factor of 0.7 lagging. What capacitor rating, in kvar, is needed to correct it to 0.95 lagging?',
    options: [
      '13.8 kvar',
      '6.6 kvar',
      '20.4 kvar',
      '27.0 kvar',
    ],
    correctAnswer: 0,
    explanation:
      'Work in reactive power. At 0.7 the angle is 45.6 degrees and tan is 1.020, so Q1 = 20 x 1.020 = 20.4 kvar. At 0.95 the angle is 18.2 degrees and tan is 0.329, so Q2 = 20 x 0.329 = 6.6 kvar. The capacitor supplies the DIFFERENCE, 20.4 - 6.6 = 13.8 kvar. The 20.4 kvar option corrects all the way to unity, which overshoots and can leave the load leading. The 6.6 kvar option quotes the reactive power that must remain, and 27.0 kvar adds the two instead of subtracting.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 272,
    question: 'A 15 kW load at 0.75 power factor is corrected to 0.95. What apparent power does the supply now see?',
    options: [
      '11.3 kVA',
      '15.8 kVA',
      '14.3 kVA',
      '20.0 kVA',
    ],
    correctAnswer: 1,
    explanation:
      'S = P / cos(phi). Before correction S = 15 / 0.75 = 20 kVA; after correction S = 15 / 0.95 = 15.8 kVA, a saving of 4.2 kVA on the supply and cabling for the same useful 15 kW. The 14.3 kVA and 11.3 kVA options MULTIPLY by the power factor instead of dividing, which would make the apparent power smaller than the true power, and that is impossible. The 20.0 kVA option is the uncorrected figure.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 273,
    question: 'A series circuit has R = 6 ohms and XL = 8 ohms. What is the power factor?',
    options: [
      '0.75 lagging',
      '0.80 lagging',
      '0.60 lagging',
      '1.33 lagging',
    ],
    correctAnswer: 2,
    explanation:
      'Z = square root of (36 + 64) = 10 ohms, and power factor = cos(phi) = R / Z = 6 / 10 = 0.6 lagging. The 0.80 option uses X / Z, which is the SINE of the angle, not the cosine. The 0.75 option uses R / X, which is the tangent. The 1.33 option is X / R, and a power factor can never exceed 1, so that one should be rejected immediately.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 274,
    question: 'A cable with a tabulated volt drop of 7.3 mV/A/m carries a design current of 32 A over a 28 m run. What is the volt drop, in volts?',
    options: [
      '0.65 V',
      '65.4 V',
      '6541 V',
      '6.54 V',
    ],
    correctAnswer: 3,
    explanation:
      'Volt drop = (mV/A/m x Ib x L) / 1000 = (7.3 x 32 x 28) / 1000 = 6540.8 / 1000 = 6.54 V. The 6541 V option is the classic slip of leaving the answer in millivolts and labelling it volts; the divide by 1000 is not optional. The 65.4 V and 0.65 V options are decimal errors of one place either side of that conversion.',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 275,
    question: 'A cable with a tabulated volt drop of 7.3 mV/A/m carries 32 A on a 230 V supply. What is the longest run that keeps the volt drop within 3 per cent?',
    options: [
      '29.5 m',
      '49.2 m',
      '215 m',
      '0.03 m',
    ],
    correctAnswer: 0,
    explanation:
      'The permitted drop is 3 per cent of 230 = 6.9 V, which is 6900 mV. Rearranging, L = 6900 / (7.3 x 32) = 6900 / 233.6 = 29.5 m. The 49.2 m option uses a 5 per cent limit, rather than the 3 per cent stated in the question. The 215 m option divides by the current only and forgets the mV/A/m figure. The 0.03 m option mixes bases by using 6.9 V against a millivolt denominator.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 276,
    question: 'Resistors of 6 ohms, 12 ohms and 24 ohms are connected in parallel. What is the total resistance?',
    options: [
      '24.0 ohms',
      '3.43 ohms',
      '14.0 ohms',
      '42.0 ohms',
    ],
    correctAnswer: 1,
    explanation:
      '1/RT = 1/6 + 1/12 + 1/24 = 4/24 + 2/24 + 1/24 = 7/24, so RT = 24/7 = 3.43 ohms. The 42.0 ohm option adds them as though they were in series and the 14.0 ohm option averages that total. The 24.0 ohm option quotes the largest branch. The check that catches all three: a parallel total must always be SMALLER than the smallest branch, so anything above 6 ohms is wrong before you even reach for a calculator.',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 277,
    question: 'A 3 kW immersion heater raises 120 litres of water from 15 °C to 60 °C. Taking the specific heat capacity of water as 4187 J/kg·K and ignoring losses, how long does it take, in minutes?',
    options: [
      '2.79 hours',
      '6.28 hours',
      '2.09 hours',
      '125 hours',
    ],
    correctAnswer: 2,
    explanation:
      'Energy = m x c x temperature RISE = 120 x 4187 x (60 - 15) = 120 x 4187 x 45 = 22609800 J. Divide by 3600000 to get 6.28 kWh, then time = 6.28 / 3 = 2.09 hours, about 2 hours 5 minutes. The 2.79 hour option uses the final temperature 60 instead of the 45 degree rise. The 6.28 hour option quotes the energy in kWh as if it were hours. The 125 figure is the answer in minutes with the wrong unit attached.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 278,
    question: 'A 4 ohm and a 6 ohm resistor are connected in series across 230 V. What voltage appears across the 6 ohm resistor?',
    options: [
      '23 V',
      '92 V',
      '230 V',
      '138 V',
    ],
    correctAnswer: 3,
    explanation:
      'Series current is common: I = 230 / (4 + 6) = 23 A. Then V = I x R = 23 x 6 = 138 V, or by proportion 230 x 6/10 = 138 V. The 92 V option is the drop across the 4 ohm resistor instead, and the two must add back to 230 V, which is a quick check. The 23 V option quotes the current value with a volts label, a surprisingly common slip under exam pressure.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 279,
    question: 'A series circuit contains 0.1 H and 25 microfarads. At what frequency does it resonate?',
    options: [
      '100.7 Hz',
      '632.5 Hz',
      '63662 Hz',
      '50.0 Hz',
    ],
    correctAnswer: 0,
    explanation:
      'f = 1 / (2 x pi x square root of (L x C)). L x C = 0.1 x 0.000025 = 2.5 x 10 to the minus 6, whose square root is 0.001581. Then 2 x pi x 0.001581 = 0.009935, and 1 / 0.009935 = 100.7 Hz. The 632.5 Hz option omits the 2 pi and is actually the resonant frequency in radians per second. The 63662 Hz option forgets to take the square root of L x C altogether. At resonance XL equals XC, the circuit looks purely resistive and the current peaks.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 280,
    question: 'A 500 kVA transformer has a 400 V three-phase secondary. What is the full-load secondary line current?',
    options: [
      '416.7 A',
      '721.7 A',
      '1250 A',
      '2165 A',
    ],
    correctAnswer: 1,
    explanation:
      'IL = S / (root 3 x VL) = 500000 / (1.732 x 400) = 500000 / 692.8 = 721.7 A. Note that no power factor appears, because kVA is already the apparent power. The 1250 A option omits root 3 entirely. The 416.7 A option divides by 3 instead of root 3. The 2165 A option multiplies by root 3 when it should divide, and would size the switchgear at three times the true rating.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 281,
    question: 'A resistive load draws 10 A from a 230 V single-phase supply. What power does it consume?',
    options: [
      '23 W',
      '230 W',
      '2300 W',
      '23000 W',
    ],
    correctAnswer: 2,
    explanation:
      'P = V x I = 230 x 10 = 2300 W, or 2.3 kW. Because the load is purely resistive the power factor is 1, so no cos(phi) term is needed. The 230 W option divides instead of multiplying and the 23000 W option slips a decimal place. A 2.3 kW figure is the right order for a domestic appliance on a 13 A plug.',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 282,
    question: 'A 3 kW heater runs for 2 hours 30 minutes. How much energy has it used?',
    options: [
      '1.2 kWh',
      '450 kWh',
      '7500 kWh',
      '7.5 kWh',
    ],
    correctAnswer: 3,
    explanation:
      'Energy in kWh = kW x HOURS = 3 x 2.5 = 7.5 kWh. The 450 kWh option leaves the time in minutes, 3 x 150, which is the same units trap that catches people in Q = I x t. The 7500 kWh option is the answer in watt hours with the kilo prefix left on by mistake, and 1.2 kWh divides rather than multiplies.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 283,
    question: 'A sinusoidal waveform has a peak value of 100 V. What is its average value over a half cycle?',
    options: [
      '63.7 V',
      '70.7 V',
      '141.4 V',
      '100 V',
    ],
    correctAnswer: 0,
    explanation:
      'Average = 0.637 x peak = 0.637 x 100 = 63.7 V. The 70.7 V option uses 0.707, which gives the rms value, not the average; the two factors are easily swapped. The 141.4 V option treats 100 V as an rms figure and multiplies up to peak. Dividing rms by average gives the form factor of 1.11 for a sine wave.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 284,
    question: 'A UK supply has a frequency of 50 Hz. What is the periodic time of one cycle?',
    options: [
      '2 ms',
      '20 ms',
      '50 ms',
      '200 ms',
    ],
    correctAnswer: 1,
    explanation:
      'T = 1 / f = 1 / 50 = 0.02 s, which is 20 milliseconds. The 50 ms option simply repeats the frequency figure with a time unit attached. The 2 ms and 200 ms options are decimal slips. This is worth knowing by heart, because a 40 ms disconnection time is two full cycles of the supply.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 285,
    question: 'A star-connected three-phase system has a phase voltage of 230 V. What is the line voltage?',
    options: [
      '133 V',
      '230 V',
      '398 V',
      '690 V',
    ],
    correctAnswer: 2,
    explanation:
      'In star, VL = root 3 x Vphase = 1.732 x 230 = 398 V, which is the nominal 400 V system. The 133 V option divides by root 3 instead of multiplying, giving a line voltage smaller than the phase voltage, which cannot happen in star. The 690 V option multiplies by 3. The 230 V option is the delta relationship, where line and phase voltage are equal.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 286,
    question: 'A 230 V to 12 V transformer has 1150 turns on the primary. How many secondary turns are there?',
    options: [
      '12 turns',
      '96 turns',
      '22042 turns',
      '60 turns',
    ],
    correctAnswer: 3,
    explanation:
      'Ns = Np x (Vs / Vp) = 1150 x (12 / 230) = 1150 / 19.17 = 60 turns. The 22042 turn option inverts the ratio and multiplies by 230/12, which would put far more turns on the low voltage side of a step-down transformer. The 96 turn option divides the primary turns by 12 rather than by the voltage ratio of 19.17.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 287,
    question: 'A motor produces 5.5 kW of mechanical output at 1440 rev/min. What torque does it develop?',
    options: [
      '36.5 Nm',
      '0.61 Nm',
      '3.82 Nm',
      '229 Nm',
    ],
    correctAnswer: 0,
    explanation:
      'T = P / (2 x pi x n) where n is in revolutions per SECOND. Here n = 1440 / 60 = 24 rev/s, so T = 5500 / (2 x 3.1416 x 24) = 5500 / 150.8 = 36.5 Nm. The 0.61 Nm option leaves the speed in rev/min inside the formula, which is the usual slip and makes the torque 60 times too small. The 229 Nm option drops the 2 pi, and 3.82 Nm is simply power divided by rev/min.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 288,
    question: 'A motor takes a line current of 90 A when started direct on line. What line current flows on the star position of a star-delta starter?',
    options: [
      '52 A',
      '30 A',
      '156 A',
      '270 A',
    ],
    correctAnswer: 1,
    explanation:
      'Starting in star puts only 1 / root 3 of the line voltage across each winding, and since current falls with voltage AND the windings are then in star rather than delta, the line current falls to one THIRD: 90 / 3 = 30 A. The 52 A option divides by root 3 only, which is the reduction in winding voltage rather than in line current. The 156 A and 270 A options multiply instead of divide. Starting torque also drops to one third, which is why star-delta suits light starting loads only.',
    section: '3.5',
    difficulty: 'advanced',
  },
  {
    id: 289,
    question: 'An installation draws 12 kW of true power and 9 kvar of reactive power. What is the apparent power?',
    options: [
      '3 kVA',
      '21 kVA',
      '15 kVA',
      '108 kVA',
    ],
    correctAnswer: 2,
    explanation:
      'The power triangle is a right triangle, so S = square root of (P squared + Q squared) = square root of (144 + 81) = square root of 225 = 15 kVA. The 21 kVA option adds P and Q arithmetically, which ignores the 90 degree phase difference between them. The 3 kVA option subtracts and 108 kVA multiplies. Power factor here is P / S = 12 / 15 = 0.8 lagging.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 290,
    question: 'A 40 m copper conductor of resistivity 1.78 × 10⁻⁸ Ω m must have a resistance no greater than 0.15 Ω. What is its minimum cross-sectional area, in mm²?',
    options: [
      '0.475 mm2',
      '47.5 mm2',
      '475 mm2',
      '4.75 mm2',
    ],
    correctAnswer: 3,
    explanation:
      'Rearranging R = rho x L / A gives A = rho x L / R = (1.78e-8 x 40) / 0.15 = 7.12e-7 / 0.15 = 4.75 x 10 to the minus 6 square metres. Converting back, 1 mm2 = 1 x 10 to the minus 6 m2, so the answer is 4.75 mm2, and in practice you would fit the next size up. The 47.5 mm2 and 0.475 mm2 options are decimal slips in that final m2 to mm2 step, which is where most marks are lost on this calculation.',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 291,
    question: 'Resistors of 4 ohms, 6 ohms and 10 ohms are connected in series. What is the total resistance?',
    options: [
      '20 ohms',
      '2.0 ohms',
      '6.7 ohms',
      '240 ohms',
    ],
    correctAnswer: 0,
    explanation:
      'In series the resistances simply add: RT = 4 + 6 + 10 = 20 ohms. The 6.7 ohm option averages them and the 2.0 ohm option applies the parallel reciprocal method by mistake, which always gives a figure below the smallest branch. The 240 ohm option multiplies. A series total must always be larger than the largest single resistor.',
    section: '3.1',
    difficulty: 'basic',
  },
  {
    id: 292,
    question: 'A 3 kW single-phase load operates at 230 V with unity power factor. What current does it draw?',
    options: [
      '1.3 A',
      '13.0 A',
      '76.7 A',
      '690 A',
    ],
    correctAnswer: 1,
    explanation:
      'I = P / V = 3000 / 230 = 13.04 A, so about 13 A. Note the power must be in watts, not kilowatts: using 3 / 230 gives 0.013 and leads straight to the 1.3 A option. The 76.7 A option inverts the division to 230 / 3, and 690 A multiplies. A 3 kW load sitting right on 13 A is why a standard plug fuse is rated as it is.',
    section: '3.1',
    difficulty: 'intermediate',
  },
  {
    id: 293,
    question: 'A series circuit has a resistance of 6 Ω and an inductive reactance of 8 Ω. What is the phase angle between the supply voltage and the current?',
    options: [
      '36.9 degrees',
      '48.6 degrees',
      '53.1 degrees',
      '126.9 degrees',
    ],
    correctAnswer: 2,
    explanation:
      'tan(phi) = X / R = 8 / 6 = 1.333, so phi = inverse tan of 1.333 = 53.1 degrees. The 36.9 degree option inverts the ratio to R / X, which gives the angle measured from the wrong side of the triangle; note that 36.9 and 53.1 add to 90, which is the giveaway. The 48.6 degree option takes an inverse sine of 6/8 rather than an inverse tangent, and 126.9 degrees is out of range for a single reactive element.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 294,
    question: 'A balanced three-phase resistive load draws 20 A per line from a 400 V line voltage supply. What is the total power, in kW?',
    options: [
      '8000 W',
      '24000 W',
      '41569 W',
      '13856 W',
    ],
    correctAnswer: 3,
    explanation:
      'P = root 3 x VL x IL x cos(phi), and for a purely resistive load cos(phi) = 1, so P = 1.732 x 400 x 20 = 13856 W. The 24000 W option uses 3 instead of root 3, a mistake that overstates the load by 73 per cent and would oversize the supply. The 41569 W option applies both 3 and root 3. The 8000 W option treats the load as single phase and omits root 3 altogether.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 295,
    question: 'Which transformer loss stays essentially constant whatever the load current?',
    options: [
      'Iron losses in the laminated core',
      'Copper losses in the windings',
      'Losses in the load being fed',
      'Brush and friction losses only',
    ],
    correctAnswer: 0,
    explanation:
      'Iron losses, made up of hysteresis and eddy current losses, depend on the alternating flux in the core, which is set by the applied voltage and frequency rather than by the load, so they are present even at no load. Copper losses follow I squared x R and therefore rise sharply with load, quadrupling when current doubles. A transformer is most efficient at the load where the variable copper loss equals the fixed iron loss. A static transformer has no brushes or friction.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 296,
    question: 'What is the synchronous speed of a two-pole induction motor on a 50 Hz supply, in rev/min?',
    options: [
      '1000 rpm',
      '3000 rpm',
      '1500 rpm',
      '6000 rpm',
    ],
    correctAnswer: 1,
    explanation:
      'Ns = 120 x f / p = 120 x 50 / 2 = 3000 rev/min, where p is the number of POLES, not pole pairs. The 1500 rpm option uses four poles, which is the value people quote from memory without checking the machine. The 6000 rpm option treats 2 as a pole pair count and halves the divisor. The rotor always turns slightly slower than this because slip is what generates rotor current.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 297,
    question: 'A 50 kW load operates at a power factor of 0.7 lagging. What apparent power, in kVA, must the supply provide?',
    options: [
      '35.0 kVA',
      '50.0 kVA',
      '71.4 kVA',
      '100 kVA',
    ],
    correctAnswer: 2,
    explanation:
      'S = P / cos(phi) = 50 / 0.7 = 71.4 kVA. That is the figure the transformer, cables and protective devices must all be sized for, even though only 50 kW does useful work. The 35.0 kVA option multiplies by the power factor instead of dividing, and apparent power can never be less than true power. The 100 kVA option divides by 0.5.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 298,
    question: 'A protective conductor must withstand a fault current of 3200 A for 0.1 s. Taking k as 115 for this conductor and insulation combination, what is the minimum cross-sectional area, in mm²?',
    options: [
      '2.78 mm2',
      '27.8 mm2',
      '88.0 mm2',
      '8.80 mm2',
    ],
    correctAnswer: 3,
    explanation:
      'S = square root of (I squared x t) divided by k. I squared x t = 3200 x 3200 x 0.1 = 1024000, whose square root is 1012. Then S = 1012 / 115 = 8.80 mm2, so the next standard size up would be selected. The 27.8 mm2 option omits the time altogether and just divides 3200 by 115, which massively oversizes the conductor. The 88.0 mm2 and 2.78 mm2 options are decimal slips of one place.',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 299,
    question: 'A circuit has a measured Ze of 0.35 Ω and a measured (R1 + R2) of 0.42 Ω at ambient temperature. Applying a temperature multiplier of 1.20 to the circuit conductors, what is the corrected Zs?',
    options: [
      '0.85 ohms',
      '0.77 ohms',
      '0.92 ohms',
      '1.20 ohms',
    ],
    correctAnswer: 0,
    explanation:
      'Zs = Ze + (R1 + R2 corrected). The multiplier applies only to the circuit conductors, so 0.42 x 1.20 = 0.504, and Zs = 0.35 + 0.504 = 0.854, rounded to 0.85 ohms. The 0.77 ohm option adds the two measurements raw and forgets the correction, which flatters the result and can pass a circuit that would actually fail hot. The 0.92 ohm option applies the multiplier to the whole sum, including Ze, which belongs to the supply and is not corrected here.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 300,
    question: 'A measured volt drop of 5.75 V is recorded on a 230 V final circuit. What percentage drop is that?',
    options: [
      '1.25 per cent',
      '2.50 per cent',
      '5.75 per cent',
      '25.0 per cent',
    ],
    correctAnswer: 1,
    explanation:
      'Percentage drop = (volt drop / nominal voltage) x 100 = (5.75 / 230) x 100 = 2.50 per cent. The 5.75 per cent option quotes the volts figure straight through as a percentage, which only works by coincidence on a 100 V system. The 25.0 per cent option slips a decimal place, and 1.25 per cent halves the result. Always divide by the NOMINAL voltage of the system, not by the measured terminal voltage on the day.',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 301,
    question: 'A coil of resistance 30 Ω and inductance 0.15 H is connected to a 230 V, 50 Hz supply. What current flows?',
    options: [
      '4.1 A',
      '3.0 A',
      '4.9 A',
      '7.7 A',
    ],
    correctAnswer: 0,
    explanation: 'XL = 2πfL = 2 x 3.142 x 50 x 0.15 = 47.1 Ω. Z = √(30² + 47.1²) = √(900 + 2219) = 55.9 Ω. I = 230 / 55.9 = 4.1 A. The tempting 3.0 A comes from adding 30 Ω and 47.1 Ω arithmetically to give 77.1 Ω; resistance and reactance are at 90° to one another and must be added by phasor, not by simple addition. 7.7 A ignores the reactance altogether and 4.9 A uses the reactance alone.',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 302,
    question: 'A series circuit of R = 20 Ω, XL = 60 Ω and XC = 25 Ω is connected to a 230 V supply. What true power does it take?',
    options: [
      '139 W',
      '651 W',
      '1140 W',
      '1312 W',
    ],
    correctAnswer: 1,
    explanation: 'Net reactance X = XL − XC = 60 − 25 = 35 Ω. Z = √(20² + 35²) = √(400 + 1225) = 40.3 Ω. I = 230 / 40.3 = 5.71 A. True power P = I²R = 5.71² x 20 = 651 W. 1312 W is the apparent power (230 x 5.71), which is what you get if you use Z instead of R; only the resistance dissipates true power. 1140 W is the reactive power I²X, and 139 W comes from adding XL and XC instead of subtracting them.',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 303,
    question: 'A series circuit contains an inductance of 0.2 H and a capacitance of 20 µF. At what frequency does it resonate?',
    options: [
      '15.9 Hz',
      '159 Hz',
      '79.6 Hz',
      '500 Hz',
    ],
    correctAnswer: 2,
    explanation: 'f0 = 1 / (2π√(LC)). LC = 0.2 x 20 x 10⁻⁶ = 4 x 10⁻⁶, so √(LC) = 2 x 10⁻³. f0 = 1 / (2 x 3.142 x 0.002) = 1 / 0.01257 = 79.6 Hz. 500 Hz is 1/√(LC) with the 2π left out. 15.9 Hz comes from inverting the expression to (1/2π)√(L/C). 159 Hz is twice the correct answer, from dropping the 2 in 2π.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 304,
    question: 'A series RLC circuit is at resonance on a 230 V, 50 Hz supply. The resistance is 15 Ω and the inductance is 0.1 H. What voltage appears across the inductor?',
    options: [
      '208 V',
      '230 V',
      '681 V',
      '482 V',
    ],
    correctAnswer: 3,
    explanation: 'At resonance XL = XC, so the impedance is the resistance alone: Z = 15 Ω. I = 230 / 15 = 15.33 A. XL = 2πfL = 2 x 3.142 x 50 x 0.1 = 31.42 Ω. VL = I x XL = 15.33 x 31.42 = 482 V. It is greater than the supply voltage because the inductor and capacitor voltages are equal and opposite and cancel one another. 230 V assumes the supply voltage simply appears across the coil. 208 V comes from using Z = √(15² + 31.42²) and forgetting that resonance cancels the reactance. 681 V is the peak value of 482 V rms.',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 305,
    question: 'A 100 Ω resistor is connected in series with a 22 µF capacitor across a 230 V, 50 Hz supply. What current flows?',
    options: [
      '1.31 A',
      '0.94 A',
      '1.59 A',
      '2.30 A',
    ],
    correctAnswer: 0,
    explanation: 'XC = 1 / (2πfC) = 1 / (2 x 3.142 x 50 x 22 x 10⁻⁶) = 1 / 0.006912 = 144.7 Ω. Z = √(100² + 144.7²) = √(10000 + 20938) = 175.9 Ω. I = 230 / 175.9 = 1.31 A. 0.94 A comes from adding 100 Ω and 144.7 Ω arithmetically; they are 90° apart and must be added by phasor. 2.30 A uses the resistance only and 1.59 A uses the reactance only.',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 306,
    question: 'What is the capacitive reactance of an 8 µF capacitor on a 50 Hz supply?',
    options: [
      '0.40 Ω',
      '398 Ω',
      '39.8 Ω',
      '3979 Ω',
    ],
    correctAnswer: 1,
    explanation: 'XC = 1 / (2πfC) = 1 / (2 x 3.142 x 50 x 8 x 10⁻⁶) = 1 / 0.002513 = 398 Ω. The three wrong values are all prefix errors: 39.8 Ω is what you get for 80 µF, 3979 Ω is the value for 0.8 µF, and 0.40 Ω is 2πfC itself, without inverting it. Converting microfarads to farads before working out the reactance is the step candidates most often miss.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 307,
    question: 'A coil of resistance 12 Ω and inductive reactance 16 Ω is connected in series with a 30 Ω resistor. What is the total impedance of the circuit?',
    options: [
      '34.0 Ω',
      '50.0 Ω',
      '44.9 Ω',
      '58.0 Ω',
    ],
    correctAnswer: 2,
    explanation: 'Add the resistances first: R = 12 + 30 = 42 Ω. The reactance stays at 16 Ω. Z = √(42² + 16²) = √(1764 + 256) = √2020 = 44.9 Ω. 50.0 Ω is the classic error: working out the coil impedance as √(12² + 16²) = 20 Ω and then adding 30 Ω to it arithmetically, which double counts nothing but adds two quantities that are not in phase. 58.0 Ω adds all three values arithmetically, and 34.0 Ω ignores the coil\'s own resistance.',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 308,
    question: 'A single-phase load takes 6.5 A from a 230 V, 50 Hz supply. Its impedance is 35.4 Ω, of which 18 Ω is resistance. What true power does it take?',
    options: [
      '1495 W',
      '1073 W',
      '1288 W',
      '760 W',
    ],
    correctAnswer: 3,
    explanation: 'True power is dissipated only in the resistance: P = I²R = 6.5² x 18 = 42.25 x 18 = 760 W. As a check, the power factor is R/Z = 18 / 35.4 = 0.508, and P = V x I x pf = 230 x 6.5 x 0.508 = 760 W. 1495 W is the apparent power 230 x 6.5, obtained by using the impedance in place of the resistance. 1288 W is the reactive power I²X, where X = √(35.4² − 18²) = 30.5 Ω. 1073 W comes from using the peak supply voltage of 325 V instead of the rms value.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 309,
    question: 'An oscilloscope shows a sinusoidal supply with a peak-to-peak value of 650 V. What is its rms value?',
    options: [
      '230 V',
      '207 V',
      '325 V',
      '460 V',
    ],
    correctAnswer: 0,
    explanation: 'Peak-to-peak covers both half cycles, so the peak value is 650 / 2 = 325 V. Vrms = Vpk / √2 = 325 / 1.414 = 230 V. 460 V is the error of dividing the peak-to-peak figure by √2 without halving it first. 325 V is the peak value itself, and 207 V is the half-cycle average (0.637 x 325), not the rms value.',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 310,
    question: 'A sinusoidal current has an rms value of 12 A. What is its average value over one half cycle?',
    options: [
      '7.6 A',
      '10.8 A',
      '13.3 A',
      '17.0 A',
    ],
    correctAnswer: 1,
    explanation: 'Work back to peak first: Ipk = 12 x 1.414 = 17.0 A. The half-cycle average is 0.637 x peak = 0.637 x 17.0 = 10.8 A. The same answer follows from the form factor: average = rms / 1.11 = 12 / 1.11 = 10.8 A. 7.6 A applies the 0.637 factor to the rms value instead of the peak value. 13.3 A multiplies by the form factor instead of dividing. 17.0 A is the peak value.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 311,
    question: 'A coil of inductance 0.5 H and resistance 25 Ω is switched onto a 100 V d.c. supply. What current is flowing 20 ms after switch-on?',
    options: [
      '1.47 A',
      '2.00 A',
      '2.53 A',
      '4.00 A',
    ],
    correctAnswer: 2,
    explanation: 'Time constant τ = L / R = 0.5 / 25 = 0.02 s, which is 20 ms, so the question is asking for the current after exactly one time constant. Final steady current = V / R = 100 / 25 = 4 A. During growth the current reaches 63.2 % of its final value in one time constant: 0.632 x 4 = 2.53 A. 4.00 A is the final value, reached after about five time constants, not one. 1.47 A uses 36.8 %, which is the decay figure, not the growth figure. 2.00 A assumes the current is simply half way there.',
    section: '3.2',
    difficulty: 'advanced',
  },
  {
    id: 312,
    question: 'A 200 µF capacitor is charged to 400 V. How much energy is stored in it?',
    options: [
      '0.04 J',
      '16 000 J',
      '32 J',
      '16 J',
    ],
    correctAnswer: 3,
    explanation: 'W = ½CV² = 0.5 x 200 x 10⁻⁶ x 400² = 0.5 x 200 x 10⁻⁶ x 160 000 = 16 J. 32 J omits the ½. 0.04 J uses V rather than V², which is the charge times a half, not the energy. 16 000 J treats the 200 as millifarads instead of microfarads, a factor of a thousand out.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 313,
    question: 'A 47 µF capacitor is charged through a 220 kΩ resistor. How long does it take to be regarded as fully charged?',
    options: [
      '51.7 s',
      '10.3 s',
      '5.2 s',
      '103.4 s',
    ],
    correctAnswer: 0,
    explanation: 'Time constant τ = CR = 47 x 10⁻⁶ x 220 x 10³ = 10.34 s. A capacitor is taken as fully charged after five time constants: 5 x 10.34 = 51.7 s. 10.3 s is one time constant only, at which point the capacitor has reached just 63 % of the supply voltage. 103.4 s is ten time constants and 5.2 s is half a time constant.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 314,
    question: 'A coil has an inductance of 0.25 H. At what supply frequency is its inductive reactance 100 Ω?',
    options: [
      '6.4 Hz',
      '63.7 Hz',
      '400 Hz',
      '2513 Hz',
    ],
    correctAnswer: 1,
    explanation: 'Transpose XL = 2πfL to give f = XL / (2πL) = 100 / (2 x 3.142 x 0.25) = 100 / 1.571 = 63.7 Hz. 400 Hz comes from dividing by L alone and leaving out the 2π. 2513 Hz multiplies by 2π instead of dividing by it. 6.4 Hz is a factor-of-ten slip in the inductance.',
    section: '3.2',
    difficulty: 'intermediate',
  },
  {
    id: 315,
    question: 'In a purely resistive a.c. circuit, what is the phase relationship between the supply voltage and the current?',
    options: [
      'Current leads by 90°',
      'Current lags by 90°',
      'They are in phase',
      'Current lags by 180°',
    ],
    correctAnswer: 2,
    explanation: 'A resistor stores no energy, so the current rises and falls exactly in step with the voltage and the phase angle is zero. This is why the power factor of a purely resistive circuit is unity. A 90° lag belongs to a purely inductive circuit and a 90° lead to a purely capacitive one; a 180° shift would mean the current reversed relative to the voltage, which no passive component produces.',
    section: '3.2',
    difficulty: 'basic',
  },
  {
    id: 316,
    question: 'A three-phase four-wire board carries 30 A in L1, 20 A in L2 and nothing in L3. All the loads are resistive. What is the neutral current?',
    options: [
      '10 A',
      '50 A',
      '36.1 A',
      '26.5 A',
    ],
    correctAnswer: 3,
    explanation: 'The two currents are 120° apart, so IN = √(I1² + I2² − I1I2) = √(30² + 20² − 30 x 20) = √(900 + 400 − 600) = √700 = 26.5 A. 50 A is the arithmetic sum, which would only apply if the currents were in phase. 10 A is the arithmetic difference, which would only apply if they were 180° apart. 36.1 A comes from √(30² + 20²), treating them as 90° apart instead of 120°.',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 317,
    question: 'A three-phase four-wire submain carries 25 A in L1, 18 A in L2 and 12 A in L3, all loads being resistive. What is the neutral current?',
    options: [
      '11.3 A',
      '13.0 A',
      '33.1 A',
      '55.0 A',
    ],
    correctAnswer: 0,
    explanation: 'IN = √(I1² + I2² + I3² − I1I2 − I2I3 − I3I1) = √(625 + 324 + 144 − 450 − 216 − 300) = √(1093 − 966) = √127 = 11.3 A. The neutral carries far less than any line because the three currents partly cancel. 55.0 A is the arithmetic sum, 13.0 A is simply the largest minus the smallest, and 33.1 A is √1093, which stops after the sum of the squares and omits the three cross terms that the 120° displacement introduces.',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 318,
    question: 'A 400 V three-phase star-connected heater has three 50 Ω elements with the star point connected to neutral. One element goes open circuit. What current now flows in the neutral?',
    options: [
      '8.0 A',
      '4.6 A',
      '9.2 A',
      '13.9 A',
    ],
    correctAnswer: 1,
    explanation: 'Phase voltage = 400 / √3 = 231 V, so each healthy element draws 231 / 50 = 4.6 A. Two equal currents 120° apart give a resultant of the same size as either one: IN = √(4.6² + 4.6² − 4.6 x 4.6) = 4.6 A. 9.2 A is the arithmetic sum of the two remaining currents. 8.0 A multiplies 4.6 A by √3, which applies to line and phase quantities, not to this phasor sum. 13.9 A adds all three original currents.',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 319,
    question: 'Three 60 Ω heater elements are connected in delta across a 400 V three-phase supply. What total power do they dissipate?',
    options: [
      '2.67 kW',
      '4.62 kW',
      '8.00 kW',
      '24.0 kW',
    ],
    correctAnswer: 2,
    explanation: 'In delta each element sees the full line voltage of 400 V, so element current = 400 / 60 = 6.67 A and power per element = 400 x 6.67 = 2667 W. Total = 3 x 2667 = 8000 W = 8.00 kW. 2.67 kW is the star value, three times smaller, because in star each element would only see 231 V. 4.62 kW comes from using √3 x V x I with the element current treated as a line current. 24.0 kW multiplies the total by three a second time.',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 320,
    question: 'A delta-connected load has an impedance of 25 Ω in each phase winding and is fed from a 400 V three-phase supply. What line current flows?',
    options: [
      '9.2 A',
      '16.0 A',
      '48.0 A',
      '27.7 A',
    ],
    correctAnswer: 3,
    explanation: 'In delta the phase voltage equals the line voltage, so the winding current is 400 / 25 = 16 A. The line current is √3 times the phase current: 16 x 1.732 = 27.7 A. 16.0 A is the phase current, the value the question does not ask for. 9.2 A divides by √3 instead of multiplying, which is the star relationship applied to a delta load. 48.0 A multiplies by three rather than by √3.',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 321,
    question: 'A star-connected load has an impedance of 30 Ω in each phase and is fed from a 400 V three-phase supply. What line current flows?',
    options: [
      '7.7 A',
      '4.4 A',
      '13.3 A',
      '23.1 A',
    ],
    correctAnswer: 0,
    explanation: 'In star each phase sees 400 / √3 = 231 V, so the phase current is 231 / 30 = 7.7 A. In star the line current equals the phase current, so the answer is 7.7 A. 13.3 A applies the full 400 V across one phase, which is the delta condition. 4.4 A divides the phase current by √3 a second time, and 23.1 A multiplies it by three.',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 322,
    question: 'A three-phase motor delivers 11 kW of mechanical output at 400 V with an efficiency of 89 % and a power factor of 0.86. What line current does it take at full load?',
    options: [
      '17.8 A',
      '20.7 A',
      '18.5 A',
      '35.9 A',
    ],
    correctAnswer: 1,
    explanation: 'Electrical input = output / efficiency = 11 000 / 0.89 = 12 360 W. Then I = P / (√3 x VL x pf) = 12 360 / (1.732 x 400 x 0.86) = 12 360 / 596 = 20.7 A. 18.5 A forgets the efficiency and uses the 11 kW shaft output as the input power. 17.8 A leaves out the power factor. 35.9 A drops the √3, treating a three-phase supply as though it were single-phase, which understates the current by about 42 %.',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 323,
    question: 'A balanced three-phase load draws a line current of 40 A at 400 V line voltage with a power factor of 0.9 lagging. What reactive power does it draw?',
    options: [
      '6.97 kvar',
      '24.9 kvar',
      '12.1 kvar',
      '27.7 kvar',
    ],
    correctAnswer: 2,
    explanation: 'Apparent power S = √3 x VL x IL = 1.732 x 400 x 40 = 27 713 VA = 27.7 kVA. sin φ = √(1 − 0.9²) = √0.19 = 0.436. Q = S x sin φ = 27.7 x 0.436 = 12.1 kvar. 24.9 kvar is the true power S x 0.9, which is what you get by using the power factor where the sine of the angle is needed. 27.7 kvar is the apparent power itself. 6.97 kvar drops the √3.',
    section: '3.3',
    difficulty: 'advanced',
  },
  {
    id: 324,
    question: 'A star-connected three-phase system has a line voltage of 415 V. What is the phase voltage?',
    options: [
      '208 V',
      '719 V',
      '415 V',
      '240 V',
    ],
    correctAnswer: 3,
    explanation: 'In star, VL = √3 x Vph, so Vph = VL / √3 = 415 / 1.732 = 240 V. 719 V multiplies by √3 instead of dividing, which would be the answer if the 415 V had been the phase value. 208 V halves the line voltage, and 415 V would only be right for a delta connection, where phase and line voltages are equal.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 325,
    question: 'A balanced delta-connected load draws a line current of 34.6 A. What current flows in each phase winding?',
    options: [
      '20.0 A',
      '11.5 A',
      '34.6 A',
      '59.9 A',
    ],
    correctAnswer: 0,
    explanation: 'In delta, IL = √3 x Iph, so Iph = IL / √3 = 34.6 / 1.732 = 20.0 A. 11.5 A divides by three instead of by √3. 34.6 A would be correct for a star connection, where the line and phase currents are equal. 59.9 A multiplies by √3 instead of dividing.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 326,
    question: 'Why does a badly unbalanced three-phase four-wire distribution board waste energy?',
    options: [
      'Iron loss in the line conductors increases',
      'I²R loss in the neutral conductor increases',
      'The supply frequency falls under heavy loading',
      'Copper loss falls in the most loaded phase',
    ],
    correctAnswer: 1,
    explanation: 'When the three line currents are unequal they no longer cancel at the star point, so a resultant current flows in the neutral. That current produces I²R heating in a conductor that carries almost nothing when the board is balanced, and it does no useful work. Iron loss occurs in magnetic cores, not in conductors. The supply frequency is set by the generators and does not vary with load in this way. Copper loss rises, not falls, in the most heavily loaded phase.',
    section: '3.3',
    difficulty: 'intermediate',
  },
  {
    id: 327,
    question: 'A single-phase transformer has 800 primary turns and 40 secondary turns. The primary is fed at 230 V and the secondary supplies a 5 Ω resistive load. Assuming no losses, what primary current flows?',
    options: [
      '2.30 A',
      '0.46 A',
      '0.115 A',
      '46.0 A',
    ],
    correctAnswer: 2,
    explanation: 'Secondary voltage V2 = 230 x 40/800 = 11.5 V. Secondary current I2 = 11.5 / 5 = 2.3 A. The current ratio is the inverse of the voltage ratio, so I1 = 2.3 x 40/800 = 0.115 A. Checking by power: 11.5 x 2.3 = 26.5 W, and 26.5 / 230 = 0.115 A. 2.30 A is the secondary current, not the primary. 46.0 A comes from inverting the turns ratio when transferring the current, so the step-down transformer appears to step the current up on the wrong side. 0.46 A comes from reading the ratio as 10:1 rather than 20:1.',
    section: '3.4',
    difficulty: 'advanced',
  },
  {
    id: 328,
    question: 'A 250 kVA transformer has iron losses of 1.2 kW and full-load copper losses of 3.0 kW. What is its efficiency when delivering 200 kW at unity power factor?',
    options: [
      '97.94 %',
      '98.23 %',
      '99.05 %',
      '98.46 %',
    ],
    correctAnswer: 3,
    explanation: 'At unity power factor 200 kW is 200 kVA, so the load fraction is 200/250 = 0.8. Copper loss varies with the square of the load: 3.0 x 0.8² = 1.92 kW. Iron loss is constant at 1.2 kW. Total loss = 3.12 kW, input = 203.12 kW, efficiency = 200 / 203.12 = 98.46 %. 97.94 % uses the full-load copper loss without scaling it. 98.23 % scales the copper loss in direct proportion to load instead of as the square. 99.05 % leaves the iron loss out.',
    section: '3.4',
    difficulty: 'advanced',
  },
  {
    id: 329,
    question: 'An 11 kV/400 V three-phase transformer is rated at 315 kVA. What is its full-load primary line current?',
    options: [
      '16.5 A',
      '9.5 A',
      '28.6 A',
      '454.7 A',
    ],
    correctAnswer: 0,
    explanation: 'I = S / (√3 x VL) = 315 000 / (1.732 x 11 000) = 315 000 / 19 053 = 16.5 A. 28.6 A drops the √3 and treats the primary as single-phase. 9.5 A divides by three instead of by √3. 454.7 A is the secondary current, worked out at 400 V, which is the right sum applied to the wrong winding.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 330,
    question: 'A transformer secondary measures 240 V off load and 228 V at full load. What is its voltage regulation?',
    options: [
      '5.26 %',
      '5.00 %',
      '12.0 %',
      '95.0 %',
    ],
    correctAnswer: 1,
    explanation: 'Regulation = (no-load voltage − full-load voltage) / no-load voltage x 100 = (240 − 228) / 240 x 100 = 12 / 240 x 100 = 5.00 %. 5.26 % uses the full-load voltage as the base, which is the commonest slip in this calculation. 12.0 % quotes the volt difference itself as though it were a percentage, and 95.0 % is the ratio of the two voltages rather than the drop between them.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 331,
    question: 'A 100 kVA transformer supplies a load of 80 kW at a power factor of 0.8 lagging. What percentage of its rating is being used?',
    options: [
      '64 %',
      '80 %',
      '100 %',
      '125 %',
    ],
    correctAnswer: 2,
    explanation: 'A transformer is rated in kVA because its losses depend on current, not on how much of that current does useful work. Apparent power S = P / pf = 80 / 0.8 = 100 kVA, so the transformer is fully loaded at 100 %. 80 % is the trap: comparing 80 kW directly against a 100 kVA rating ignores the reactive current the transformer must also carry. 64 % multiplies by the power factor a second time, and 125 % divides by the square of the power factor.',
    section: '3.4',
    difficulty: 'advanced',
  },
  {
    id: 332,
    question: 'A 1000 kVA transformer with a 400 V three-phase secondary has a percentage impedance of 6 %. What is the prospective short-circuit current at its secondary terminals?',
    options: [
      '87 A',
      '1443 A',
      '41 667 A',
      '24 057 A',
    ],
    correctAnswer: 3,
    explanation: 'Full-load secondary current = 1 000 000 / (1.732 x 400) = 1443 A. The percentage impedance says that 6 % of rated voltage drives full-load current through the transformer, so a full-voltage short circuit drives 100/6 times that: 1443 / 0.06 = 24 057 A. 1443 A is the full-load current itself. 87 A multiplies by 6 % instead of dividing, which gives a fault current smaller than the running current, an impossible result. 41 667 A drops the √3 from the full-load calculation.',
    section: '3.4',
    difficulty: 'advanced',
  },
  {
    id: 333,
    question: 'A transformer with a 230 V primary has 1500 primary turns. What secondary voltage is produced by a winding of 78 turns?',
    options: [
      '12.0 V',
      '24.0 V',
      '120 V',
      '4423 V',
    ],
    correctAnswer: 0,
    explanation: 'V2 = V1 x N2/N1 = 230 x 78/1500 = 230 x 0.052 = 12.0 V. 4423 V comes from inverting the ratio to N1/N2, which would turn a step-down transformer into a step-up one. 120 V is a factor-of-ten slip and 24.0 V comes from doubling the secondary turns.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 334,
    question: 'A 300/5 A current transformer has an ammeter connected to its secondary reading 3.2 A. What primary current is flowing?',
    options: [
      '0.05 A',
      '192 A',
      '60 A',
      '16 A',
    ],
    correctAnswer: 1,
    explanation: 'The ratio is 300/5 = 60:1, so the primary current is 60 times the secondary reading: 3.2 x 60 = 192 A. 16 A multiplies by 5 instead of by the ratio. 60 A quotes the ratio itself as a current. 0.05 A divides by the ratio instead of multiplying, which would make the primary current smaller than the secondary current in a step-down current transformer.',
    section: '3.4',
    difficulty: 'intermediate',
  },
  {
    id: 335,
    question: 'In a step-down transformer, how does the number of secondary turns compare with the number of primary turns?',
    options: [
      'There are exactly as many',
      'There are more of them',
      'There are fewer of them',
      'There are none at all',
    ],
    correctAnswer: 2,
    explanation: 'The voltage ratio follows the turns ratio, so to produce a lower secondary voltage the secondary must have fewer turns than the primary. More turns would step the voltage up. An equal number of turns gives a one-to-one isolating transformer with no change in voltage. A winding with no turns would produce no output at all.',
    section: '3.4',
    difficulty: 'basic',
  },
  {
    id: 336,
    question: 'Which winding arrangement gives a d.c. motor its very high starting torque?',
    options: [
      'Field winding replaced by a squirrel cage',
      'Field winding in parallel with the armature',
      'Field winding fed from a separate source',
      'Field winding in series with the armature',
    ],
    correctAnswer: 3,
    explanation: 'In a series machine the whole armature current also passes through the field winding, so at standstill the heavy starting current produces both a strong field and a strong armature current, and torque depends on the product of the two. This is why series motors are used for traction and cranes. A parallel (shunt) field is fed at constant voltage and gives a nearly constant field, so its starting torque is far lower. A separately excited field behaves in the same way as a shunt field. A squirrel cage belongs to an induction motor, not a d.c. machine.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 337,
    question: 'How does the speed of a d.c. shunt motor behave as mechanical load is added?',
    options: [
      'It falls slightly from no load to full load',
      'It rises steadily as the load torque increases',
      'It falls sharply once the load torque rises',
      'It stays exactly constant at all values of load',
    ],
    correctAnswer: 0,
    explanation: 'The shunt field is fed at constant voltage so the flux barely changes. Adding load increases the armature current, which increases the volt drop across the armature resistance and lowers the back emf, so the speed falls a little, typically by a few per cent between no load and full load. A rise in speed with load happens in no normal motor. A sharp fall is the series motor characteristic. The speed is nearly constant, but not exactly so, because the armature volt drop always grows with load.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 338,
    question: 'Why must a d.c. series motor never be started with no mechanical load connected?',
    options: [
      'Its field current falls to zero and it will stall',
      'Its speed can rise until the armature is damaged',
      'Its armature current rises to the stalled value',
      'Its commutator reverses and it runs backwards',
    ],
    correctAnswer: 1,
    explanation: 'With no load the armature current is very small, so the series field is very weak. Speed varies inversely with flux, so the machine accelerates in an attempt to build enough back emf, and it can run away until centrifugal force damages the windings or commutator. The field current does not fall to zero, it falls to a small value, and a weak field produces overspeed rather than stalling. Armature current falls at light load rather than rising. Direction of rotation is unaffected by load.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 339,
    question: 'A d.c. shunt motor takes an armature current of 25 A from a 220 V supply. The armature resistance is 0.4 Ω. What mechanical power is developed in the armature?',
    options: [
      '250 W',
      '5500 W',
      '5250 W',
      '5750 W',
    ],
    correctAnswer: 2,
    explanation: 'Back emf Eb = V − IaRa = 220 − (25 x 0.4) = 220 − 10 = 210 V. Mechanical power developed = Eb x Ia = 210 x 25 = 5250 W. 5500 W is the electrical input 220 x 25, which includes the 250 W lost as heat in the armature resistance. 250 W is that armature copper loss on its own. 5750 W adds the armature volt drop instead of subtracting it, which is the generator relationship, not the motor one.',
    section: '3.5',
    difficulty: 'advanced',
  },
  {
    id: 340,
    question: 'A three-phase motor delivers 15 kW of mechanical output at a shaft speed of 1455 rev/min. What torque does it develop at the shaft?',
    options: [
      '1.6 N·m',
      '10.3 N·m',
      '95.5 N·m',
      '98.4 N·m',
    ],
    correctAnswer: 3,
    explanation: 'Convert the speed to radians per second: ω = 2πN/60 = 2 x 3.142 x 1455 / 60 = 152.4 rad/s. T = P / ω = 15 000 / 152.4 = 98.4 N·m. 95.5 N·m is the tempting one: it uses the synchronous speed of 1500 rev/min instead of the actual shaft speed, and an induction motor never runs at synchronous speed. 10.3 N·m divides by rev/min without converting to rad/s, and 1.6 N·m leaves out the division by 60.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 341,
    question: 'A six-pole induction motor on a 50 Hz supply runs with a slip of 4 %. What is its shaft speed?',
    options: [
      '960 rev/min',
      '500 rev/min',
      '1040 rev/min',
      '1440 rev/min',
    ],
    correctAnswer: 0,
    explanation: 'Synchronous speed Ns = 120f / p = (120 x 50) / 6 = 1000 rev/min. Shaft speed N = Ns(1 − s) = 1000 x 0.96 = 960 rev/min. 1040 rev/min adds the slip instead of subtracting it, which would put the rotor above synchronous speed and make the machine a generator. 1440 rev/min is the familiar four-pole answer recalled rather than calculated. 500 rev/min uses six as the number of pole pairs rather than the number of poles.',
    section: '3.5',
    difficulty: 'advanced',
  },
  {
    id: 342,
    question: 'An eight-pole induction motor on a 50 Hz supply runs at 720 rev/min. What is the frequency of the rotor currents?',
    options: [
      '0.04 Hz',
      '2.0 Hz',
      '4.0 Hz',
      '48.0 Hz',
    ],
    correctAnswer: 1,
    explanation: 'Synchronous speed = 120 x 50 / 8 = 750 rev/min. Slip s = (750 − 720) / 750 = 30/750 = 0.04, or 4 %. Rotor frequency = s x f = 0.04 x 50 = 2.0 Hz. 48.0 Hz uses (1 − s) x f, which is the wrong part of the relationship. 4.0 Hz reads the slip percentage straight off as a frequency without multiplying by 50. 0.04 Hz quotes the per-unit slip itself.',
    section: '3.5',
    difficulty: 'advanced',
  },
  {
    id: 343,
    question: 'A 400 V cage motor has a full-load current of 32 A and a direct-on-line starting current six times full load. What line current flows on the star position of a star-delta starter?',
    options: [
      '32 A',
      '111 A',
      '64 A',
      '192 A',
    ],
    correctAnswer: 2,
    explanation: 'Direct-on-line starting current = 6 x 32 = 192 A. Connecting the windings in star puts 1/√3 of the line voltage across each winding, which reduces the winding current by √3 and the line current by a further √3, so the line current falls to one third: 192 / 3 = 64 A. 192 A is the direct-on-line figure. 111 A divides by √3 only, which is the winding current reduction rather than the line current reduction. 32 A is the running full-load current.',
    section: '3.5',
    difficulty: 'advanced',
  },
  {
    id: 344,
    question: 'A motor rated 400 V, 50 Hz is driven by a variable frequency drive set to 30 Hz. What stator voltage must the drive apply to hold the flux constant?',
    options: [
      '200 V',
      '533 V',
      '400 V',
      '240 V',
    ],
    correctAnswer: 3,
    explanation: 'Flux is proportional to V/f, so the drive holds that ratio constant. At the rating point V/f = 400/50 = 8 V per Hz. At 30 Hz the voltage must be 8 x 30 = 240 V. Holding 400 V at 30 Hz would raise the flux by a third and saturate the core, drawing heavy magnetising current. 533 V inverts the ratio and would be worse still. 200 V halves the rated voltage without reference to the frequency ratio.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 345,
    question: 'A three-phase motor takes 28 A at 400 V with a power factor of 0.87 and has an efficiency of 90 %. What mechanical output does it deliver?',
    options: [
      '15.2 kW',
      '8.8 kW',
      '16.9 kW',
      '18.8 kW',
    ],
    correctAnswer: 0,
    explanation: 'Apparent power = √3 x 400 x 28 = 19 399 VA. Electrical input = 19 399 x 0.87 = 16 877 W. Mechanical output = input x efficiency = 16 877 x 0.9 = 15 189 W, or 15.2 kW. 16.9 kW is the electrical input, obtained by forgetting the efficiency. 18.8 kW divides by the efficiency instead of multiplying, which would make the shaft output greater than the electrical input. 8.8 kW drops the √3.',
    section: '3.5',
    difficulty: 'advanced',
  },
  {
    id: 346,
    question: 'What limits the use of a star-delta starter on a heavily loaded conveyor?',
    options: [
      'Supply frequency must be reduced during the star step',
      'Starting torque falls to one third of the DOL value',
      'Starting current rises to three times the DOL value',
      'Motor windings must be reconnected into star to run',
    ],
    correctAnswer: 1,
    explanation: 'Torque varies with the square of the applied voltage. In star each winding sees 1/√3 of the line voltage, so the torque falls to one third of the direct-on-line value at the same time as the current does. On a load that already demands high breakaway torque the motor may not accelerate far enough to change over. Starting current falls rather than rises. Frequency is fixed by the supply and a star-delta starter cannot alter it. The windings run in delta, not star, once the changeover has taken place.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 347,
    question: 'Why will a plain single-phase induction motor not start on its own?',
    options: [
      'Its stator field rotates faster than the rotor can',
      'Its rotor bars are open circuited until it moves',
      'Its stator produces no rotating magnetic field',
      'Its supply frequency is too low to induce torque',
    ],
    correctAnswer: 2,
    explanation: 'A single winding fed from one phase produces a field that pulses along one axis rather than rotating, so it exerts equal torque in both directions at standstill and the rotor stays put. Once turning, the motor develops torque, which is why an auxiliary winding or capacitor is used to give the field an initial rotation. The rotor bars are permanently short circuited by the end rings. The supply frequency is the same as that used by three-phase motors. A field rotating faster than the rotor is the normal running condition of every induction motor.',
    section: '3.5',
    difficulty: 'intermediate',
  },
  {
    id: 348,
    question: 'Above what rating does BS 7671 require the control equipment of an electric motor to incorporate overload protection?',
    options: [
      '3.0 kW',
      '0.75 kW',
      '1.5 kW',
      '0.37 kW',
    ],
    correctAnswer: 3,
    explanation: 'Regulation 552.1.2 requires every electric motor having a rating exceeding 0.37 kW to be provided with control equipment incorporating means of protection against overload of the motor. Below that figure the winding is generally able to withstand a stalled condition without the risk of fire. The other values are common motor frame ratings but none of them is the threshold stated in BS 7671.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 349,
    question: 'Which motor type is chosen where the shaft speed must stay exactly locked to the supply frequency?',
    options: [
      'Synchronous motor',
      'Wound-rotor motor',
      'Capacitor-start motor',
      'Shaded-pole motor',
    ],
    correctAnswer: 0,
    explanation: 'A synchronous motor has a rotor excited so that it locks to the rotating stator field, so it turns at synchronous speed with no slip whatever the load, up to the point where it pulls out. Every induction machine, whether wound-rotor, capacitor-start or shaded-pole, must run slower than the field in order to induce rotor current and produce torque, so its speed always falls as load is applied.',
    section: '3.5',
    difficulty: 'basic',
  },
  {
    id: 350,
    question: 'A 30 kW load runs at a power factor of 0.72 lagging. What capacitive reactive power is needed to correct it to 0.96 lagging?',
    options: [
      '8.8 kvar',
      '20.2 kvar',
      '10.4 kvar',
      '28.9 kvar',
    ],
    correctAnswer: 1,
    explanation: 'Work in kvar at each end. At 0.72, φ1 = 43.9° and tan φ1 = 0.964, so Q1 = 30 x 0.964 = 28.9 kvar. At 0.96, φ2 = 16.3° and tan φ2 = 0.292, so Q2 = 30 x 0.292 = 8.75 kvar. The capacitor must supply the difference: 28.9 − 8.75 = 20.2 kvar. 28.9 kvar corrects all the way to unity, which over-corrects. 8.75 kvar is only the reactive power that remains after correction. 10.4 kvar is the difference between the two kVA figures (41.7 − 31.3), and kVA cannot be subtracted like that because the two values lie at different angles.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 351,
    question: 'A single-phase load needs 6 kvar of capacitive correction at 230 V, 50 Hz. What capacitance is required?',
    options: [
      '0.36 µF',
      '36 µF',
      '361 µF',
      '3610 µF',
    ],
    correctAnswer: 2,
    explanation: 'Capacitor current Ic = Q / V = 6000 / 230 = 26.1 A. Capacitive reactance Xc = V / Ic = 230 / 26.1 = 8.82 Ω. C = 1 / (2πfXc) = 1 / (2 x 3.142 x 50 x 8.82) = 1 / 2770 = 3.61 x 10⁻⁴ F, which is 361 µF. The three wrong answers are all prefix slips of a factor of ten or a thousand, which is exactly what happens when farads and microfarads are mixed part way through the working.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 352,
    question: 'A 400 V three-phase load takes 60 A at 0.75 power factor lagging. After correction to 0.95 lagging, what line current does the supply carry?',
    options: [
      '45.0 A',
      '76.0 A',
      '60.0 A',
      '47.4 A',
    ],
    correctAnswer: 3,
    explanation: 'Correction does not change the true power, only the current needed to deliver it. P = √3 x 400 x 60 x 0.75 = 31 177 W. After correction, I = P / (√3 x 400 x 0.95) = 31 177 / 658 = 47.4 A. The short cut is I2 = I1 x pf1 / pf2 = 60 x 0.75 / 0.95 = 47.4 A. 45.0 A multiplies the current by the old power factor and forgets the new one. 76.0 A inverts the ratio, making the current rise. 60.0 A assumes correction changes nothing, but reducing the reactive current is precisely what it does.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 353,
    question: 'A supply meter records 48 kW and 60 kVA on an installation. What reactive power is being drawn?',
    options: [
      '36 kvar',
      '12 kvar',
      '38.4 kvar',
      '76.8 kvar',
    ],
    correctAnswer: 0,
    explanation: 'The power triangle gives S² = P² + Q², so Q = √(S² − P²) = √(60² − 48²) = √(3600 − 2304) = √1296 = 36 kvar. 12 kvar is 60 − 48, the arithmetic difference, which ignores that the three quantities form a right-angled triangle. 76.8 kvar adds the squares instead of subtracting them. 38.4 kvar multiplies the true power by the power factor of 0.8.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 354,
    question: 'A single-phase motor takes 9 A from a 230 V supply and dissipates 1.45 kW. What is its power factor?',
    options: [
      '0.0007',
      '0.70',
      '0.50',
      '1.43',
    ],
    correctAnswer: 1,
    explanation: 'Apparent power S = V x I = 230 x 9 = 2070 VA. Power factor = true power / apparent power = 1450 / 2070 = 0.70. 1.43 inverts the ratio to kVA over kW, and a power factor can never exceed one. 0.50 uses the peak supply voltage of 325 V instead of the rms value. 0.0007 leaves the 1.45 kW in kilowatts while the apparent power is in volt amperes, a factor of a thousand out.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 355,
    question: 'A series circuit has a resistance of 16 Ω and an inductive reactance of 12 Ω. What is its power factor?',
    options: [
      '0.60',
      '0.75',
      '0.80',
      '1.33',
    ],
    correctAnswer: 2,
    explanation: 'Z = √(16² + 12²) = √(256 + 144) = √400 = 20 Ω. Power factor = cos φ = R / Z = 16 / 20 = 0.80 lagging. 0.60 uses X/Z, which is the sine of the angle, not the cosine. 0.75 uses R/X, which is the tangent of the angle inverted. 1.33 is X/R the other way up, and no power factor can be greater than unity.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 356,
    question: 'An LED driver takes 4 A rms from a 230 V supply and consumes 690 W, but its current waveform is far from sinusoidal. What is its total power factor?',
    options: [
      '0.53',
      '0.66',
      '1.33',
      '0.75',
    ],
    correctAnswer: 3,
    explanation: 'Total power factor is always true power divided by apparent power, whatever the waveform shape: 690 / (230 x 4) = 690 / 920 = 0.75. This is lower than the displacement power factor the driver would show on a phase-angle meter, because the harmonic current adds to the rms value without adding any true power. 1.33 inverts the ratio. 0.66 is √(1 − 0.75²), which is the sine of the angle, not the power factor. 0.53 uses the peak voltage of 325 V in place of the rms value.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 357,
    question: 'A three-phase installation draws 45 kVA at 0.82 power factor lagging from a 400 V supply. How much capacitive reactive power is needed to raise its power factor to unity?',
    options: [
      '25.8 kvar',
      '8.1 kvar',
      '36.9 kvar',
      '45.0 kvar',
    ],
    correctAnswer: 0,
    explanation: 'True power P = S x pf = 45 x 0.82 = 36.9 kW. sin φ = √(1 − 0.82²) = √0.3276 = 0.572, so Q = S x sin φ = 45 x 0.572 = 25.8 kvar. To reach unity the capacitors must cancel all of it, so 25.8 kvar is required. 36.9 kvar is the true power, quoted in the wrong unit. 45.0 kvar is the apparent power. 8.1 kvar is 45 − 36.9, which subtracts two sides of a right-angled triangle as though they were in line.',
    section: '3.6',
    difficulty: 'advanced',
  },
  {
    id: 358,
    question: 'How is the power factor of a large induction motor most commonly corrected?',
    options: [
      'A choke connected in series with the supply',
      'A capacitor connected across its terminals',
      'A resistor bank connected across its terminals',
      'An extra winding added to the rotor circuit',
    ],
    correctAnswer: 1,
    explanation: 'The motor draws a lagging magnetising current. A capacitor draws a leading current, so connecting one across the terminals supplies that magnetising current locally and the supply cable no longer has to carry it. A choke is itself inductive and would make the lag worse. A resistor draws current in phase with the voltage and adds real load without cancelling any reactive current. Rotor windings affect the machine\'s torque and slip characteristics, not the power factor seen at the terminals.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 359,
    question: 'What can an automatic power factor correction panel do that a fixed capacitor bank cannot?',
    options: [
      'Raise the supply frequency at times of low load',
      'Convert reactive power into useful true power',
      'Switch capacitor steps as the load varies',
      'Store energy overnight for use at peak times',
    ],
    correctAnswer: 2,
    explanation: 'An automatic panel measures the power factor continuously and contactors switch capacitor stages in and out to match the reactive demand, so the site stays near target through the working day and avoids over-correction at night. A fixed bank supplies the same kvar whatever the load. No capacitor converts reactive power into true power; reactive power does no work. Capacitors do not alter the supply frequency, and a correction panel is not an energy store.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 360,
    question: 'Why must compensation capacitors above 0.5 µF be fitted with discharge resistors?',
    options: [
      'They lose capacitance while left energised',
      'They draw excessive current at switch-on',
      'They shift the supply frequency when isolated',
      'They hold a dangerous charge after isolation',
    ],
    correctAnswer: 3,
    explanation: 'BS 7671 requires compensation capacitors having a total capacitance exceeding 0.5 µF to be used only in conjunction with discharge resistors. A capacitor keeps its charge after the supply is removed, so terminals that have been isolated and proved dead at one moment can still deliver a severe shock. The resistor bleeds the charge away to a safe value. Inrush current at switch-on is a real effect but a permanently connected bleed resistor does nothing about it. Capacitors do not change the supply frequency and do not lose capacitance simply through being energised.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 361,
    question: 'A factory improves its power factor from 0.7 to 0.95 with no change in the kW drawn. What happens to the losses in its supply cables?',
    options: [
      'They fall, because the current drawn is lower',
      'They rise, because the current drawn is higher',
      'They stay the same, since the kW is unchanged',
      'They fall, because the supply voltage is raised',
    ],
    correctAnswer: 0,
    explanation: 'For the same true power, current is inversely proportional to power factor, so the current falls to 0.7/0.95 = 74 % of its former value. Cable loss is I²R, so it falls to 0.74² = 55 % of what it was, a saving of about 45 %. The current falls rather than rises. It does not stay the same, because the kW is only part of what the cable carries; it also carries the reactive current. Any small voltage rise is a consequence of the reduced volt drop, not the reason the losses fall.',
    section: '3.6',
    difficulty: 'intermediate',
  },
  {
    id: 362,
    question: 'In what unit is apparent power measured?',
    options: [
      'Watt hour',
      'Volt ampere',
      'Var hour',
      'Joule per second',
    ],
    correctAnswer: 1,
    explanation: 'Apparent power is the product of rms voltage and rms current with no regard to phase angle, so it is given in volt amperes, usually kilovolt amperes on an installation. The watt hour and the var hour are units of energy, not power. The joule per second is the watt, which measures true power, the part of the supply that does useful work.',
    section: '3.6',
    difficulty: 'basic',
  },
  {
    id: 363,
    question: 'A three-phase circuit uses a cable with a tabulated volt drop of 2.5 mV/A/m and carries a design current of 45 A over a run of 60 m. What is the volt drop?',
    options: [
      '3.9 V',
      '11.7 V',
      '6.75 V',
      '13.5 V',
    ],
    correctAnswer: 2,
    explanation: 'Volt drop = (mV/A/m x Ib x L) / 1000 = (2.5 x 45 x 60) / 1000 = 6750 / 1000 = 6.75 V. 11.7 V multiplies the answer by √3, but a tabulated three-phase mV/A/m figure already accounts for the three-phase relationship, so applying √3 again double counts it. 3.9 V divides by √3 for the same mistaken reason. 13.5 V doubles the answer as though the go and return conductors had to be counted separately, which the tabulated figure already does.',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 364,
    question: 'A 230 V lighting circuit must be kept within a 3 % volt drop. The cable has a tabulated volt drop of 18 mV/A/m and the design current is 6 A. What is the longest permitted run?',
    options: [
      '6.4 m',
      '21.3 m',
      '106.5 m',
      '63.9 m',
    ],
    correctAnswer: 3,
    explanation: 'Permitted drop = 3 % of 230 = 6.9 V. Transposing, L = (Vd x 1000) / (mV/A/m x Ib) = (6.9 x 1000) / (18 x 6) = 6900 / 108 = 63.9 m. 106.5 m applies the 5 % limit that belongs to power circuits rather than the 3 % stated in the question. 21.3 m works to a 1 % limit. 6.4 m is a factor-of-ten slip in the millivolt conversion.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 365,
    question: 'A protective conductor must carry a fault current of 4600 A for 0.2 s. Taking k as 143, what is its minimum cross-sectional area?',
    options: [
      '14.4 mm²',
      '6.4 mm²',
      '32.2 mm²',
      '72.0 mm²',
    ],
    correctAnswer: 0,
    explanation: 'The adiabatic equation is S = √(I²t) / k. I²t = 4600² x 0.2 = 21 160 000 x 0.2 = 4 232 000. √4 232 000 = 2057. S = 2057 / 143 = 14.4 mm². 32.2 mm² omits the time altogether and uses I/k. 6.4 mm² multiplies by t rather than by √t. 72.0 mm² divides by √t instead of multiplying by it, so a shorter disconnection time appears to demand a larger conductor, which is the wrong way round.',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 366,
    question: 'A circuit has a measured Ze of 0.28 Ω and a measured (R1 + R2) of 0.55 Ω at ambient temperature. Applying a factor of 1.20 to the circuit conductors for operating temperature, what fault current would flow at 230 V?',
    options: [
      '231 A',
      '245 A',
      '260 A',
      '277 A',
    ],
    correctAnswer: 1,
    explanation: 'The temperature multiplier applies only to the circuit conductors, not to the supply side. Zs = Ze + 1.20(R1 + R2) = 0.28 + (0.55 x 1.20) = 0.28 + 0.66 = 0.94 Ω. If = 230 / 0.94 = 245 A. 231 A applies the multiplier to the whole loop including Ze, which is not measured at ambient in the same way. 277 A applies no correction at all and overstates the fault current. 260 A applies the multiplier to Ze only, which is the correction put on the wrong term.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 367,
    question: 'A 230 V cooker circuit supplies an 11.5 kW cooker with a 13 A socket in the control unit. Allowing the first 10 A of the cooker current in full, 30 % of the remainder, and 5 A for the socket, what is the design current?',
    options: [
      '20 A',
      '22 A',
      '27 A',
      '35 A',
    ],
    correctAnswer: 2,
    explanation: 'Full cooker current = 11 500 / 230 = 50 A. First 10 A in full = 10 A. Remainder = 50 − 10 = 40 A, of which 30 % = 12 A. Socket allowance = 5 A. Design current = 10 + 12 + 5 = 27 A. 22 A leaves out the socket allowance. 20 A takes 30 % of the whole 50 A instead of only the remainder above 10 A. 35 A adds the full 13 A rating of the socket rather than the 5 A allowance the question specifies.',
    section: '3.7',
    difficulty: 'advanced',
  },
  {
    id: 368,
    question: 'A 400 V three-phase circuit shows a volt drop of 14 V. What percentage of the nominal voltage is that?',
    options: [
      '1.75 %',
      '28.6 %',
      '6.09 %',
      '3.50 %',
    ],
    correctAnswer: 3,
    explanation: 'Percentage drop = (volt drop / nominal voltage) x 100 = (14 / 400) x 100 = 3.50 %. 6.09 % uses 230 V, the phase voltage, when the circuit is a three-phase one referenced to 400 V. 28.6 % divides the nominal voltage by the drop instead of the other way round. 1.75 % halves the correct answer, as though only one conductor of the pair contributed.',
    section: '3.7',
    difficulty: 'intermediate',
  },
  {
    id: 369,
    question: 'A luminaire of 2500 cd is mounted 3 m above a floor. What is the illuminance at a point 4 m horizontally from the point directly beneath it?',
    options: [
      '60 lx',
      '100 lx',
      '156 lx',
      '278 lx',
    ],
    correctAnswer: 0,
    explanation: 'The slant distance is √(3² + 4²) = 5 m, and cos θ = mounting height / slant distance = 3/5 = 0.6. Combining the inverse square law with the cosine law, E = I cos θ / d² = 2500 x 0.6 / 25 = 60 lx. 100 lx uses the correct 5 m distance but leaves out the cosine, so it assumes the light strikes the floor square on. 278 lx uses the 3 m mounting height as the distance, which only applies directly beneath the fitting. 156 lx uses the 4 m horizontal offset as the distance.',
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 370,
    question: 'Directly below a downlight the illuminance measures 200 lx. The luminaire is then raised so that its distance from the working plane doubles. What illuminance results?',
    options: [
      '100 lx',
      '50 lx',
      '400 lx',
      '800 lx',
    ],
    correctAnswer: 1,
    explanation: 'Illuminance obeys the inverse square law, so doubling the distance divides the illuminance by 2² = 4: 200 / 4 = 50 lx. 100 lx halves it, treating the relationship as inversely proportional to distance rather than to distance squared. 400 lx and 800 lx have the relationship the wrong way round; moving a source further away can never increase the illuminance on the surface.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 371,
    question: 'An office measuring 12 m x 9 m requires 400 lx. The utilisation factor is 0.55 and the maintenance factor is 0.8. What total lamp lumen output is required?',
    options: [
      '19 008 lm',
      '43 200 lm',
      '98 182 lm',
      '78 545 lm',
    ],
    correctAnswer: 2,
    explanation: 'The lumen method gives total lumens = (E x A) / (UF x MF). Area = 12 x 9 = 108 m². E x A = 400 x 108 = 43 200 lm of useful light on the working plane. Dividing by 0.55 x 0.8 = 0.44 gives 43 200 / 0.44 = 98 182 lm. 43 200 lm is the value before the two factors are applied and would leave the room badly under-lit. 19 008 lm multiplies by the factors instead of dividing, which is the commonest error in this calculation. 78 545 lm applies the utilisation factor but forgets maintenance.',
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 372,
    question: 'A 12 W LED lamp produces 1320 lm. What is its luminous efficacy?',
    options: [
      '0.009 lm/W',
      '11 lm/W',
      '15 840 lm/W',
      '110 lm/W',
    ],
    correctAnswer: 3,
    explanation: 'Luminous efficacy = luminous flux / power = 1320 / 12 = 110 lm/W. 0.009 lm/W inverts the division. 15 840 lm/W multiplies the two figures instead of dividing, giving a value hundreds of times beyond what any lamp can achieve. 11 lm/W is a factor-of-ten slip and would be typical of a tungsten filament lamp rather than an LED.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 373,
    question: 'Which expression gives the illuminance on a surface from a source at an angle θ to the normal?',
    options: [
      'E = I cos θ / d²',
      'E = I sin θ / d²',
      'E = I cos θ / d',
      'E = I x d² / cos θ',
    ],
    correctAnswer: 0,
    explanation: 'The cosine law modifies the inverse square law: the luminous intensity I is divided by the square of the distance d from the source to the point, and multiplied by the cosine of the angle between the light path and the normal to the surface. Using the sine would give zero illuminance directly beneath a fitting, which is plainly wrong. Dividing by d rather than d² abandons the inverse square law. The last expression puts distance on the wrong side of the division, so illuminance would rise as the fitting was raised.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 374,
    question: 'Why is a high-pressure sodium lamp unsuitable for a colour-critical inspection bay?',
    options: [
      'Its light output rises steadily as the lamp ages',
      'Its light is narrow band and distorts colours',
      'Its warm-up time exceeds thirty minutes',
      'Its output falls sharply below 20 °C ambient',
    ],
    correctAnswer: 1,
    explanation: 'A high-pressure sodium discharge emits over a restricted part of the spectrum, giving a strong orange cast and a low colour rendering index, so surfaces do not appear their true colour. Low-temperature output loss is a fluorescent characteristic, not a sodium one. Warm-up takes a few minutes rather than half an hour. Lamp output falls with age through lumen depreciation, it does not rise.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 375,
    question: 'A warehouse has 60 luminaires of 150 W each, in use for 3500 hours a year. If they are replaced with 60 W LED units, how much energy is saved each year?',
    options: [
      '315 kWh',
      '12 600 kWh',
      '18 900 kWh',
      '31 500 kWh',
    ],
    correctAnswer: 2,
    explanation: 'Saving per luminaire = 150 − 60 = 90 W. Total saving = 60 x 90 = 5400 W = 5.4 kW. Annual saving = 5.4 x 3500 = 18 900 kWh. 31 500 kWh is the old annual consumption (9 kW x 3500 h) and 12 600 kWh is the new one; the saving is the difference between them. 315 kWh is a factor-of-sixty slip from leaving out the number of luminaires.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 376,
    question: 'A 3 kW immersion heater raises 90 litres of water from 12 °C to 60 °C. Taking the specific heat capacity of water as 4186 J/kg·K and ignoring losses, how long does it take?',
    options: [
      '50 min',
      '201 min',
      '126 min',
      '100 min',
    ],
    correctAnswer: 3,
    explanation: 'One litre of water has a mass of 1 kg. Heat required = m x c x Δθ = 90 x 4186 x (60 − 12) = 90 x 4186 x 48 = 18 083 520 J. Time = energy / power = 18 083 520 / 3000 = 6028 s = 100 min. 126 min uses 60 °C as the temperature rise instead of the 48 K difference, which is the commonest error in heating calculations. 50 min uses half the rise and 201 min uses double it.',
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 377,
    question: 'A heat pump with a SCOP of 3.8 delivers 12 kW of heat. Electricity costs 26 p/kWh. What does one hour of operation cost?',
    options: [
      '82 p',
      '22 p',
      '312 p',
      '1186 p',
    ],
    correctAnswer: 0,
    explanation: 'SCOP is heat delivered divided by electrical energy taken in, so electrical input = 12 / 3.8 = 3.16 kW. In one hour that is 3.16 kWh, costing 3.16 x 26 = 82 p. 312 p ignores the SCOP entirely and charges for 12 kWh, which is what a direct electric heater of the same output would cost. 1186 p multiplies by the SCOP instead of dividing. 22 p divides by the SCOP twice over.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 378,
    question: 'A 3.4 kW storage heater charges for 7 hours on a night rate of 12 p/kWh. What does one night\'s charge cost?',
    options: [
      '£0.41',
      '£2.86',
      '£9.79',
      '£28.56',
    ],
    correctAnswer: 1,
    explanation: 'Energy = power x time = 3.4 x 7 = 23.8 kWh. Cost = 23.8 x 12 p = 285.6 p = £2.86. £0.41 costs only one hour of charging. £9.79 charges for a full 24 hours, but the heater only draws current during the off-peak charging period. £28.56 is a factor-of-ten slip in converting pence to pounds.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 379,
    question: 'How does an electric storage heater deliver heat during the day?',
    options: [
      'A heat pump extracts warmth from outdoor air',
      'A resistance element runs on the daytime tariff',
      'Stored heat leaves the core through the casing',
      'A fan draws warm air from the loft space above',
    ],
    correctAnswer: 2,
    explanation: 'The elements heat a dense refractory core overnight on the off-peak rate. Through the day the element is off and the stored heat passes out through the insulation and casing by conduction, convection and radiation, with a damper or fan controlling how quickly it is released. Running the element on the day tariff would defeat the whole point of the appliance. Storage heaters contain no refrigeration circuit and take no air from the loft.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 380,
    question: 'What distinguishes an instantaneous water heater from a storage cylinder?',
    options: [
      'It heats a full vessel overnight on cheap rate',
      'It relies on a thermostat rather than a cut-out',
      'It uses a heat exchanger fed from a boiler',
      'It heats water only as it is drawn off',
    ],
    correctAnswer: 3,
    explanation: 'An instantaneous heater has no reservoir; a flow switch energises a high-rated element as soon as a tap is opened and the water is heated on its way through, which is why these appliances have large current demands but no standing heat loss. Heating a full vessel overnight describes a storage cylinder. A heat exchanger fed from a boiler describes an indirect cylinder. Both types of appliance use a thermostat and a thermal cut-out.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 381,
    question: 'To what maximum temperature must the protective device limit a floor or ceiling heating unit under BS 7671?',
    options: [
      '80 °C',
      '70 °C',
      '50 °C',
      '100 °C',
    ],
    correctAnswer: 0,
    explanation: 'BS 7671 states that the protective devices required for floor and ceiling heating units are intended to limit the temperature of those units to a maximum of 80 °C. That may be achieved by a thermostat, a thermal cut-out or overtemperature protection built into the heating element or its control system. The limit protects the floor finish and any cable insulation in contact with the heating element.',
    section: '3.8',
    difficulty: 'basic',
  },
  {
    id: 382,
    question: 'What is the purpose of the non-self-resetting thermal cut-out fitted to an immersion heater?',
    options: [
      'It maintains the water at the chosen set temperature',
      'It isolates the element if the thermostat fails',
      'It switches the element to a lower rating',
      'It bleeds air from the top of the cylinder',
    ],
    correctAnswer: 1,
    explanation: 'The thermostat is the working control; the cut-out is the safety back-up. If the thermostat sticks closed the water temperature keeps rising, and the cut-out opens the supply and stays open until it is reset by hand, so the fault has to be investigated rather than being allowed to cycle. Maintaining the set temperature is the thermostat\'s job. The cut-out does not alter the element rating, and venting air is done by a separate vent or expansion arrangement.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 383,
    question: 'What happens to a light-dependent resistor as the light falling on it increases?',
    options: [
      'Its inductance rises',
      'Its resistance rises',
      'Its resistance falls',
      'Its capacitance falls',
    ],
    correctAnswer: 2,
    explanation: 'Light striking the semiconductor material frees additional charge carriers, so the material conducts more readily and its resistance falls, often from hundreds of kilohms in darkness to a few hundred ohms in bright light. That change is what a photocell control circuit senses. The resistance falls rather than rises. A light-dependent resistor has no significant capacitance or inductance to change.',
    section: '3.8',
    difficulty: 'basic',
  },
  {
    id: 384,
    question: 'How does a negative temperature coefficient thermistor behave as its temperature rises?',
    options: [
      'Its resistance becomes negative',
      'Its resistance rises markedly',
      'Its resistance stays constant',
      'Its resistance falls markedly',
    ],
    correctAnswer: 3,
    explanation: 'The negative coefficient means resistance and temperature move in opposite directions, so a rise in temperature produces a marked fall in resistance. The change is far larger than in an ordinary conductor, which is why these devices make sensitive temperature sensors and inrush limiters. A rise in resistance describes a positive coefficient device. Constant resistance would make the device useless as a sensor, and no passive resistance can be negative.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 385,
    question: 'A full-wave bridge rectifier is fed from a 24 V rms sinusoidal secondary. Ignoring diode volt drops, what is the mean d.c. output voltage?',
    options: [
      '21.6 V',
      '10.8 V',
      '24.0 V',
      '33.9 V',
    ],
    correctAnswer: 0,
    explanation: 'Find the peak first: Vpk = 24 x 1.414 = 33.9 V. A full-wave bridge inverts both half cycles, so the mean output is 0.637 x peak = 0.637 x 33.9 = 21.6 V. 33.9 V is the peak value, which is what an unloaded smoothing capacitor would charge to, not the mean of the unsmoothed waveform. 24.0 V is the a.c. rms input. 10.8 V is the mean of a half-wave rectifier, which throws away one half cycle.',
    section: '3.8',
    difficulty: 'advanced',
  },
  {
    id: 386,
    question: 'What does a capacitor do in a d.c. circuit once it is fully charged?',
    options: [
      'It passes a steady current',
      'It blocks any further current',
      'It reverses the supply polarity',
      'It behaves as a low resistance',
    ],
    correctAnswer: 1,
    explanation: 'Current only flows into a capacitor while its plates are charging. Once the plate voltage equals the supply voltage there is no potential difference left to drive charge, so current ceases and the capacitor behaves as an open circuit to steady d.c. Passing a steady current or behaving as a low resistance describes the initial charging instant, not the settled condition. A capacitor does not reverse the polarity of the supply feeding it.',
    section: '3.8',
    difficulty: 'basic',
  },
  {
    id: 387,
    question: 'What does an inductor oppose in a circuit?',
    options: [
      'A steady direct current',
      'A change in voltage',
      'A change in current',
      'A rise in temperature',
    ],
    correctAnswer: 2,
    explanation: 'A changing current changes the flux linking the coil, which induces an emf that acts against the change, so the inductor resists any rise or fall in current. That is why inductive reactance grows with frequency and why a coil produces a large voltage spike when its circuit is broken. Opposing a change in voltage describes a capacitor. A coil offers only its winding resistance to a steady direct current, and it does not oppose temperature change.',
    section: '3.8',
    difficulty: 'basic',
  },
  {
    id: 388,
    question: 'Which device gives a small voltage output proportional to a temperature difference?',
    options: [
      'Photodiode array',
      'Thermistor',
      'Piezo sensor',
      'Thermocouple',
    ],
    correctAnswer: 3,
    explanation: 'Two dissimilar metals joined at a measuring junction produce a small emf that depends on the temperature difference between that junction and the reference end. This is the Seebeck effect, and it is how thermocouple probes and flame failure devices work. A thermistor changes resistance with temperature but generates no voltage of its own. A piezo sensor responds to mechanical stress and a photodiode array to light.',
    section: '3.8',
    difficulty: 'basic',
  },
  {
    id: 389,
    question: 'Two capacitors of 40 µF and 60 µF are connected in series. What is the total capacitance?',
    options: [
      '24 µF',
      '50 µF',
      '100 µF',
      '2400 µF',
    ],
    correctAnswer: 0,
    explanation: 'Capacitors in series combine like resistors in parallel: CT = (C1 x C2) / (C1 + C2) = (40 x 60) / 100 = 2400 / 100 = 24 µF. The total is always smaller than the smaller of the two, because the plate separation is effectively increased. 100 µF is the parallel result, obtained by simply adding them. 50 µF is the average of the two values, and 2400 µF is the product with the division left out.',
    section: '3.8',
    difficulty: 'intermediate',
  },
  {
    id: 390,
    question: 'Two capacitors of 40 µF and 60 µF are connected in series across a 230 V supply. What voltage appears across the 40 µF capacitor?',
    options: [
      '92 V',
      '138 V',
      '115 V',
      '153 V',
    ],
    correctAnswer: 1,
    explanation: 'In series both capacitors carry the same charge. CT = (40 x 60)/100 = 24 µF, so Q = CT x V = 24 x 10⁻⁶ x 230 = 5.52 mC. V across the 40 µF unit = Q / C = 5.52 x 10⁻³ / 40 x 10⁻⁶ = 138 V. Checking, the 60 µF unit takes 5.52 x 10⁻³ / 60 x 10⁻⁶ = 92 V, and 138 + 92 = 230 V. 92 V is the voltage across the other capacitor: the smaller capacitance takes the larger share, which is the opposite of the way resistors in series behave. 115 V splits the supply equally and 153 V uses the ratio of the two capacitances directly.',
    section: '3.8',
    difficulty: 'advanced',
  },
];

// Helper function to get random questions for mock exams
/**
 * Draws a paper honouring the difficulty tags.
 *
 * Previously this was a flat `sort(() => Math.random() - 0.5)` slice, which
 * ignored `difficulty` entirely — the tags were decorative and a paper's
 * difficulty was pure luck — and used the broken sort-shuffle idiom, which is
 * not a uniform permutation. See src/utils/apprenticeQuestionDraw.ts.
 */
export const getRandomQuestions = (
  count: number,
  weights: DifficultyWeights = LEVEL3_WEIGHTS
): Question[] => drawWeighted(module3Questions, count, weights);

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

/**
 * Section number → readable topic, taken from the section headers above.
 * Questions here carry only `section: '3.4'` and no `topic`, so without this
 * the results screen's "what to study next" lists bare outline numbers.
 */
export const M3_SECTION_TOPIC: Record<string, string> = {
  '3.1': "Ohm's Law & Power",
  '3.2': 'AC Theory',
  '3.3': 'Three-Phase Systems',
  '3.4': 'Transformers',
  '3.5': 'Motors & Generators',
  '3.6': 'Power Factor',
  '3.7': 'Advanced Calculations',
  '3.8': 'Science Principles in Depth',
};

export default module3Questions;
